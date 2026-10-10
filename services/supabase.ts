import { createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://sdbwfxhxdruwhomelvdz.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseClient: SupabaseClient | null = null;

export const getSupabase = () => {
  if (!supabaseClient) {
    console.log('[Supabase] Initializing with URL:', SUPABASE_URL);

    if (!SUPABASE_URL || SUPABASE_URL.includes('placeholder')) {
      console.error('[Supabase] VITE_SUPABASE_URL missing!');
    }
    if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.includes('placeholder')) {
      console.error('[Supabase] VITE_SUPABASE_ANON_KEY missing!');
    }

    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
        storageKey: 'proresumelab-session-v1',
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      },
      // Har Supabase request pe ek hard timeout lagao. Warna network/auth
      // deadlock hone par request kabhi settle nahi hoti aur UI hamesha
      // "Fetching..." pe atka rehta hai. Timeout hone pe request reject hoti
      // hai, jisse page error state (Retry button) dikha deta hai.
      global: {
        fetch: (input: RequestInfo | URL, init?: RequestInit) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000);
          const external = init?.signal;
          if (external) {
            if (external.aborted) controller.abort();
            else external.addEventListener('abort', () => controller.abort(), { once: true });
          }
          return fetch(input, { ...init, signal: controller.signal }).finally(() =>
            clearTimeout(timeoutId)
          );
        },
      },
    });
  }
  return supabaseClient;
};

export const clearLocalAuthStorage = () => {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove = [
      'user',
      'proresumelab-session-v1',
      'proresumelab-auth-token',
      'supabase.auth.token',
    ];

    keysToRemove.forEach((k) => localStorage.removeItem(k));

    Object.keys(localStorage).forEach((k) => {
      const lower = k.toLowerCase();
      if (
        lower.startsWith('sb-') ||
        lower.includes('supabase') ||
        lower.includes('auth-token') ||
        lower.includes('proresumelab') ||
        lower.includes('session')
      ) {
        localStorage.removeItem(k);
      }
    });

    console.log('[Auth] Local storage fully cleared');
  } catch (e) {
    console.warn('[Auth] Failed to clear storage', e);
  }
};

export const getAuthSession = async (): Promise<Session | null> => {
  const supabase = getSupabase();
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.warn('[getAuthSession] error:', error.message);
      return null;
    }
    return session;
  } catch (err) {
    console.warn('[getAuthSession] failed:', err);
    return null;
  }
};

// ---------------------------------------------------------------------------
// Auth-ready gate
// ---------------------------------------------------------------------------
// On a hard refresh the very first DB query can fire *before* the Supabase
// client has finished restoring the persisted session from localStorage.
// Because `resumes` / `profiles` are protected by RLS, such a query goes out
// with only the anon key, gets denied, and comes back empty -- which looks like
// "refresh ke baad data load nahi hota". Awaiting this once guarantees the auth
// token is attached before any protected query runs.
let authReadyPromise: Promise<void> | null = null;

export const ensureAuthReady = (timeoutMs = 4000): Promise<void> => {
  if (authReadyPromise) return authReadyPromise;
  const supabase = getSupabase();
  authReadyPromise = (async () => {
    try {
      await Promise.race([
        supabase.auth.getSession(),
        new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
      ]);
    } catch (err) {
      console.warn('[Auth] ensureAuthReady failed:', err);
    }
  })();
  return authReadyPromise;
};

export const getAuthenticatedUser = async (
  _maxRetries = 1,
  _retryDelayMs = 300,
  _timeoutMs = 8000
): Promise<User | null> => {
  const supabase = getSupabase();
  try {
    // Session restore hone tak wait karo (refresh-safe)
    await ensureAuthReady(_timeoutMs);

    // 1. Pehle session se try karo (fast)
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      return session.user;
    }

    // 2. Phir getUser try karo
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.warn('[getAuthenticatedUser] error:', error.message);
      return null;
    }
    return user ?? null;
  } catch (err) {
    console.warn('[getAuthenticatedUser] failed:', err);
    return null; // timeout / network pe null, throw mat karo
  }
};

export const supabase = getSupabase();