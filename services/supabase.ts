import { createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';

const resolveSupabaseUrl = () => {
    const candidate = import.meta.env.VITE_SUPABASE_URL || '';
    if (candidate && !candidate.includes('placeholder')) return candidate;
    if (typeof window !== 'undefined') return `${window.location.origin}/_supabase`;
    return candidate || 'https://placeholder.supabase.co';
};

const resolveAnonKey = () => {
    const candidate = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    if (candidate && !candidate.includes('placeholder')) return candidate;
    return 'public-anon';
};

let supabaseClient: SupabaseClient | null = null;
const DEFAULT_AUTH_TIMEOUT_MS = 4000;

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

export const getSupabase = () => {
    if (!supabaseClient) {
        const url = resolveSupabaseUrl();
        const key = resolveAnonKey();

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
                detectSessionInUrl: false,
                flowType: 'pkce'
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
    const session = await getAuthSession(maxRetries, retryDelayMs, timeoutMs);
    return session?.user || null;
};

export const supabase = getSupabase();
