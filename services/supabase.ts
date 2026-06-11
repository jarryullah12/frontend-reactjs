import { createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';

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
