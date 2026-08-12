const USER_ID_COOKIE = "ssUserId";
const SESSION_ID_COOKIE = "ssSessionId";

function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((item) =>
    item.startsWith(`${name}=`),
  );

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(
    cookie.substring(name.length + 1),
  );
}

function setCookie(
  name: string,
  value: string,
  maxAge?: number,
): void {
  const maxAgePart = maxAge
    ? `; max-age=${maxAge}`
    : "";

  document.cookie =
    `${name}=${encodeURIComponent(value)}` +
    `${maxAgePart}; path=/; SameSite=Lax`;
}

function getOrCreateUserId(): string {
  const existingUserId =
    getCookie(USER_ID_COOKIE);

  if (existingUserId) {
    return existingUserId;
  }

  const userId = crypto.randomUUID();

  setCookie(
    USER_ID_COOKIE,
    userId,
    60 * 60 * 24 * 365,
  );

  return userId;
}

function getOrCreateSessionId(): string {
  const existingSessionId =
    getCookie(SESSION_ID_COOKIE);

  if (existingSessionId) {
    return existingSessionId;
  }

  const sessionId = crypto.randomUUID();

  setCookie(
    SESSION_ID_COOKIE,
    sessionId,
  );

  return sessionId;
}

function createPageLoadId(): string {
  return crypto.randomUUID();
}

export function getSearchspringHeaders() {
  return {
    "searchspring-session-id":
      getOrCreateSessionId(),

    "searchspring-user-id":
      getOrCreateUserId(),

    "searchspring-page-load-id":
      createPageLoadId(),
  };
}