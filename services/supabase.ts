import { createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';

<<<<<<< HEAD
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
=======
const resolveSupabaseUrl = () => {
    if (typeof window !== 'undefined') {
        const candidate = import.meta.env.VITE_SUPABASE_URL || '';
        if (candidate && !candidate.includes('placeholder')) {
            return candidate;
        }

        const host = window.location.hostname;
        const isLocalhost =
            host === 'localhost' ||
            host === '127.0.0.1' ||
            host === '0.0.0.0' ||
            host.endsWith('.local');

        const proxyUrl = `${window.location.origin}/_supabase`;
        if (isLocalhost) {
            console.log('[Supabase] Using same-origin proxy:', proxyUrl);
            return proxyUrl;
        }

        console.warn('[Supabase] VITE_SUPABASE_URL missing in browser build. This will break on static hosts (e.g., Netlify).');
        return proxyUrl;
    }
    
    const candidate = import.meta.env.VITE_SUPABASE_URL || '';
    if (candidate && !candidate.includes('placeholder')) return candidate;
    return candidate || 'https://placeholder.supabase.co';
};

const resolveAnonKey = () => {
    const candidate = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    if (candidate && !candidate.includes('placeholder')) return candidate;
    return 'public-anon';
};

let supabaseClient: SupabaseClient | null = null;
const DEFAULT_AUTH_TIMEOUT_MS = 8000;
const AUTH_STORAGE_KEYS = ['proresumelab-session-v1', 'proresumelab-auth-token', 'supabase.auth.token'];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
    return await new Promise<T>((resolve, reject) => {
        const id = setTimeout(() => {
            reject(new Error('Supabase auth timeout'));
        }, timeoutMs);

        promise.then(
            (value) => {
                clearTimeout(id);
                resolve(value);
            },
            (err) => {
                clearTimeout(id);
                reject(err);
            }
        );
    });
};

const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
};

const isRetriableAuthError = (error: unknown) => {
    const message = getErrorMessage(error).toLowerCase();
    return message.includes('timeout') || message.includes('fetch') || message.includes('network');
};

export const clearLocalAuthStorage = () => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.removeItem('user');
        AUTH_STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
        const keys = Object.keys(localStorage);
        keys.forEach((k) => {
            const lower = k.toLowerCase();
            const shouldRemove =
                lower.startsWith('sb-') ||
                lower.includes('supabase') ||
                lower.includes('auth-token') ||
                lower.includes('proresumelab-session') ||
                lower.includes('proresumelab-auth');
            if (shouldRemove) {
                localStorage.removeItem(k);
            }
        });
    } catch {
    }
};

export const getSupabase = () => {
    if (!supabaseClient) {
        const url = resolveSupabaseUrl();
        const key = resolveAnonKey();

        console.log(`[Supabase] Initializing with URL: ${url.substring(0, 30)}...`);

        if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
            console.warn('Supabase URL missing in build env; falling back to same-origin proxy.');
        }
        if (!import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY.includes('placeholder')) {
            console.warn('Supabase anon key missing in build env; using proxy-injected key.');
        }
        
        supabaseClient = createClient(url, key, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
                flowType: 'pkce',
                storageKey: 'proresumelab-session-v1',
                storage: typeof window !== 'undefined' ? window.localStorage : undefined
            }
        });
    }
    return supabaseClient;
};

export const getAuthSession = async (
    maxRetries = 1,
    retryDelayMs = 300,
    timeoutMs = DEFAULT_AUTH_TIMEOUT_MS
): Promise<Session | null> => {
    const supabase = getSupabase();
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
        try {
            const { data: { session }, error } = await withTimeout(supabase.auth.getSession(), timeoutMs);
            if (error) throw error;
            return session ?? null;
        } catch (error) {
            lastError = error;
            console.warn(`Auth session fetch attempt ${attempt} failed:`, error);

            if (attempt >= maxRetries || !isRetriableAuthError(error)) {
                throw error;
            }

            await wait(retryDelayMs * (attempt + 1));
        }
    }

    throw lastError instanceof Error ? lastError : new Error('Failed to fetch auth session');
};

export const getAuthenticatedUser = async (
    maxRetries = 1,
    retryDelayMs = 300,
    timeoutMs = DEFAULT_AUTH_TIMEOUT_MS
): Promise<User | null> => {
    const supabase = getSupabase();
    const session = await getAuthSession(maxRetries, retryDelayMs, timeoutMs);
    if (!session) return null;

    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
        try {
            const { data: { user }, error } = await withTimeout(supabase.auth.getUser(), timeoutMs);
            if (error) throw error;
            return user ?? session.user ?? null;
        } catch (error) {
            lastError = error;
            const message = getErrorMessage(error).toLowerCase();
            const looksLikeInvalidSession =
                message.includes('jwt') ||
                message.includes('invalid') ||
                message.includes('unauthorized') ||
                message.includes('forbidden') ||
                message.includes('401') ||
                message.includes('403');

            if (looksLikeInvalidSession) {
                try {
                    const refreshed = await withTimeout(supabase.auth.refreshSession(), timeoutMs);
                    if (refreshed.error) throw refreshed.error;
                } catch {
                    try {
                        await supabase.auth.signOut();
                    } catch {
                    }
                    clearLocalAuthStorage();
                    return null;
                }
                await wait(Math.min(250, retryDelayMs));
                continue;
            }

            if (attempt < maxRetries && isRetriableAuthError(error)) {
                await wait(retryDelayMs * (attempt + 1));
                continue;
            }

            throw error;
        }
    }

    throw lastError instanceof Error ? lastError : new Error('Failed to validate authenticated user');
};

export const supabase = getSupabase();
>>>>>>> 1bb8a577d0f5e33703f7cd6abae11848554b39b0
