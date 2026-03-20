/**
 * Central place for environment-driven app settings (Vite: VITE_* only).
 */
export function getApiBaseUrl(): string {
  const base = import.meta.env.VITE_API_BASE_URL;
  return typeof base === 'string' ? base.replace(/\/$/, '') : '';
}

export function isDev(): boolean {
  return import.meta.env.DEV;
}
