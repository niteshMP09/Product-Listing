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
  sort?: string;
  filters?: Record<string, string[]>;
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

  if (params.sort) {
    const [field, direction] = params.sort.split(":");

    if (field && direction) {
      searchParams.set(
        `sort.${field}`,
        direction,
      );
    }
  }

  if (params.filters) {
    Object.entries(params.filters).forEach(
      ([field, values]) => {
        values.forEach((value) => {
          searchParams.append(
            `filter.${field}`,
            value,
          );
        });
      },
    );
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