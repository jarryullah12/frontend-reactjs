export const normalizeEmail = (email: string): string => {
  const trimmed = (email || '').trim().toLowerCase();
  const parts = trimmed.split('@');
  if (parts.length !== 2) return trimmed;

  let [local, domain] = parts;

  if (domain === 'googlemail.com') {
    domain = 'gmail.com';
  }

  // Gmail treats dots and +tags as aliases, so normalize them to one identity.
  if (domain === 'gmail.com') {
    local = local.replace(/\./g, '');
    const plusIndex = local.indexOf('+');
    if (plusIndex !== -1) {
      local = local.slice(0, plusIndex);
    }
  }

  return `${local}@${domain}`;
};
