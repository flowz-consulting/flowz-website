export const CONSENT_COOKIE = "flowz_consent";
export const CONSENT_EVENT = "flowz:consent";
export const OPEN_COOKIES_EVENT = "flowz:open-cookies";

export type ConsentChoice = "necessary" | "analytics";

const YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export function readConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const entry = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  if (!entry) return null;
  const value = decodeURIComponent(entry.slice(CONSENT_COOKIE.length + 1));
  return value === "analytics" || value === "necessary" ? value : null;
}

export function writeConsent(choice: ConsentChoice) {
  const previous = readConsent();
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; Path=/; Max-Age=${YEAR_IN_SECONDS}; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));

  if (choice === "necessary" && previous === "analytics") {
    clearAnalyticsCookies();
    window.location.reload();
  }
}

function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const names = document.cookie
    .split("; ")
    .map((part) => part.split("=")[0])
    .filter((name) => name === "_ga" || name === "_gid" || name.startsWith("_ga_"));

  for (const name of names) {
    document.cookie = `${name}=; Path=/; Max-Age=0`;
    document.cookie = `${name}=; Path=/; Max-Age=0; Domain=${host}`;
  }
}
