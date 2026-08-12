import type { SearchResponse } from "../../../types/searchspring";

import {
  SEARCHSPRING_API_URL,
} from "./config";

import {
  buildSearchParams,
  type SearchProductsParams,
} from "./params";

import {
  getSearchspringHeaders,
} from "./tracking";

export type {
  SearchProductsParams,
} from "./params";

export async function searchProducts(
  params: SearchProductsParams = {},
): Promise<SearchResponse> {
  const searchParams =
    buildSearchParams(params);

  const url =
    `${SEARCHSPRING_API_URL}?${searchParams.toString()}`;

  const response = await fetch(
    url,
    {
      method: "GET",
      headers: getSearchspringHeaders(),
    },
  );

  if (!response.ok) {
    const errorBody =
      await response.text();

    console.error(
      "Searchspring API error:",
      {
        status: response.status,
        statusText: response.statusText,
        url,
        body: errorBody,
      },
    );

    throw new Error(
      `Searchspring API failed: ${response.status}`,
    );
  }

  return response.json();
}