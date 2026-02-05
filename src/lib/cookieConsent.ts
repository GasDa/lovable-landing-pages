export type CookieConsent = "all" | "essential";

const CONSENT_COOKIE_NAME = "cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

const getCookieValue = (name: string) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const getCookieConsent = (): CookieConsent | null => {
  const value = getCookieValue(CONSENT_COOKIE_NAME);
  if (value === "all" || value === "essential") {
    return value;
  }
  return null;
};

export const setCookieConsent = (value: CookieConsent) => {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(value)}; path=/; max-age=${CONSENT_MAX_AGE}; samesite=lax`;
};

export const canUseNonEssentialCookies = () => getCookieConsent() === "all";
