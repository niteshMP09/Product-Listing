import type { SearchResponse } from "../../../types/searchspring";

const SEARCHSPRING_SITE_ID = import.meta.env.VITE_SEARCHSPRING_SITE_ID;

const SEARCHSPRING_RESULTS_FORMAT = import.meta.env
  .VITE_SEARCHSPRING_RESULTS_FORMAT;

const SEARCHSPRING_API_URL =
  "https://scmq7n.a.searchspring.io/api/search/search.json";

const USER_ID_COOKIE = "ssUserId";
const SESSION_ID_COOKIE = "ssSessionIdNamespace";

export interface SearchProductsParams {
  q?: string;
  page?: number;
  sort?: string;
  filters?: Record<string, string[]>;
}

/**
 * Read a cookie by name.
 */
function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((item) => item.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.substring(name.length + 1));
}

/**
 * Create a cookie.
 */
function setCookie(name: string, value: string, maxAge?: number) {
  const maxAgePart = maxAge ? `; max-age=${maxAge}` : "";

  document.cookie =
    `${name}=${encodeURIComponent(value)}` +
    `${maxAgePart}; path=/; SameSite=Lax`;
}

/**
 * Searchspring user ID.
 *
 * This should remain persistent for the user.
 */
function getUserId(): string {
  const existingUserId = getCookie(USER_ID_COOKIE);

  if (existingUserId) {
    return existingUserId;
  }

  const userId = crypto.randomUUID();

  // Keep the user ID for approximately one year.
  setCookie(USER_ID_COOKIE, userId, 60 * 60 * 24 * 365);

  return userId;
}

/**
 * Searchspring session ID.
 *
 * No max-age means it behaves as a session cookie.
 */
function getSessionId(): string {
  const existingSessionId = getCookie(SESSION_ID_COOKIE);

  if (existingSessionId) {
    return existingSessionId;
  }

  const sessionId = crypto.randomUUID();

  setCookie(SESSION_ID_COOKIE, sessionId);

  return sessionId;
}

/**
 * Searchspring requires a new page-load ID
 * for each page load.
 */
function createPageLoadId(): string {
  return crypto.randomUUID();
}

/**
 * Build Searchspring filters.
 */
function appendFilters(
  searchParams: URLSearchParams,
  filters: Record<string, string[]>,
) {
  Object.entries(filters).forEach(([field, values]) => {
    values.forEach((value) => {
      /**
       * Searchspring range filters must use:
       *
       * filter.price.low
       * filter.price.high
       *
       * instead of:
       *
       * filter.price=30-40
       */
      if (field === "price" && value.includes("-")) {
        const [low, high] = value.split("-");

        if (low) {
          searchParams.set(`filter.${field}.low`, low);
        }

        if (high) {
          searchParams.set(`filter.${field}.high`, high);
        }

        return;
      }

      searchParams.append(`filter.${field}`, value);
    });
  });
}

export async function searchProducts(
  params: SearchProductsParams = {},
): Promise<SearchResponse> {
  if (!SEARCHSPRING_SITE_ID) {
    throw new Error("Missing VITE_SEARCHSPRING_SITE_ID environment variable.");
  }

  if (!SEARCHSPRING_RESULTS_FORMAT) {
    throw new Error(
      "Missing VITE_SEARCHSPRING_RESULTS_FORMAT environment variable.",
    );
  }

  const searchParams = new URLSearchParams();

  /**
   * Required Searchspring parameters.
   */
  searchParams.set("siteId", SEARCHSPRING_SITE_ID);

  searchParams.set("resultsFormat", SEARCHSPRING_RESULTS_FORMAT);

  searchParams.set("page", String(params.page ?? 1));

  /**
   * Search query.
   */
  if (params.q?.trim()) {
    searchParams.set("q", params.q.trim());
  }

  /**
   * Sorting.
   *
   * Example:
   * price:asc
   * price:desc
   */
  if (params.sort) {
    const [field, direction] = params.sort.split(":");

    if (field && direction) {
      searchParams.set(`sort.${field}`, direction);
    }
  }

  /**
   * Filters.
   */
  if (params.filters) {
    appendFilters(searchParams, params.filters);
  }

  /**
   * Searchspring tracking headers.
   *
   * Searchspring documents these headers
   * for client-side integrations.
   */
  const headers = {
    "searchspring-session-id": getSessionId(),

    "searchspring-user-id": getUserId(),

    "searchspring-page-load-id": createPageLoadId(),
  };

  const url = `${SEARCHSPRING_API_URL}?${searchParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  /**
   * Keep the Searchspring response body
   * when debugging API failures.
   */
  if (!response.ok) {
    const errorBody = await response.text();

    console.error("Searchspring API error:", {
      status: response.status,
      statusText: response.statusText,
      url,
      body: errorBody,
    });

    throw new Error(`Searchspring API failed: ${response.status}`);
  }

  return response.json();
}
