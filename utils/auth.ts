import { normalizeEmail } from './email';

const DEFAULT_ADMIN_EMAIL = 'jarryullah46@gmail.com';
const adminEmailSet = new Set(
  (import.meta.env.VITE_ADMIN_EMAILS || DEFAULT_ADMIN_EMAIL)
    .split(',')
    .map((email) => normalizeEmail(email))
    .filter(Boolean)
);

export const isAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return adminEmailSet.has(normalizeEmail(email));
};

export const resolveUserRole = (
  profileRole?: string | null,
  email?: string | null
): 'admin' | 'pro' | 'user' => {
  if (profileRole === 'admin' || isAdminEmail(email)) {
    return 'admin';
  }
  if (profileRole === 'pro') {
    return 'pro';
  }
  return 'user';
};
