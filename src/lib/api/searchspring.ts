import type { SearchResponse } from "../../types/searchspring";

const SEARCHSPRING_SITE_ID =
  import.meta.env.VITE_SEARCHSPRING_SITE_ID;

const SEARCHSPRING_RESULTS_FORMAT =
  import.meta.env.VITE_SEARCHSPRING_RESULTS_FORMAT;

const SEARCHSPRING_API_URL =
  "https://scmq7n.a.searchspring.io/api/search/search.json";

export interface SearchProductsParams {
  q?: string;
  page?: number;
}

export async function searchProducts(
  params: SearchProductsParams = {},
): Promise<SearchResponse> {
  const searchParams = new URLSearchParams({
    siteId: SEARCHSPRING_SITE_ID,
    resultsFormat: SEARCHSPRING_RESULTS_FORMAT,
    page: String(params.page ?? 1),
  });

  if (params.q?.trim()) {
    searchParams.set("q", params.q.trim());
  }

  const response = await fetch(
    `${SEARCHSPRING_API_URL}?${searchParams.toString()}`,
  );

  if (!response.ok) {
    throw new Error(
      `Searchspring API failed: ${response.status}`,
    );
  }

  return response.json();
}