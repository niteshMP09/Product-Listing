import appendFilters from "./filters";
import { SEARCHSPRING_RESULTS_FORMAT, SEARCHSPRING_SITE_ID } from "./config";

export interface SearchProductsParams {
  q?: string;
  page?: number;
  sort?: string;
  filters?: Record<string, string[]>;
}

function appendSearchQuery(
  searchParams: URLSearchParams,
  query?: string,
): void {
  if (!query?.trim()) {
    return;
  }

  searchParams.set("q", query.trim());
}

function appendPagination(searchParams: URLSearchParams, page?: number): void {
  searchParams.set("page", String(page ?? 1));
}

function appendSorting(searchParams: URLSearchParams, sort?: string): void {
  if (!sort) {
    return;
  }

  const [field, direction] = sort.split(":");

  if (!field || !direction) {
    return;
  }

  searchParams.set(`sort.${field}`, direction);
}

export function buildSearchParams(
  params: SearchProductsParams = {},
): URLSearchParams {
  if (!SEARCHSPRING_SITE_ID) {
    throw new Error("Missing VITE_SEARCHSPRING_SITE_ID environment variable.");
  }

  if (!SEARCHSPRING_RESULTS_FORMAT) {
    throw new Error(
      "Missing VITE_SEARCHSPRING_RESULTS_FORMAT environment variable.",
    );
  }

  const searchParams = new URLSearchParams();

  searchParams.set("siteId", SEARCHSPRING_SITE_ID);

  searchParams.set("resultsFormat", SEARCHSPRING_RESULTS_FORMAT);

  appendPagination(searchParams, params.page);

  appendSearchQuery(searchParams, params.q);

  appendSorting(searchParams, params.sort);

  if (params.filters) {
    appendFilters(searchParams, params.filters);
  }

  return searchParams;
}
