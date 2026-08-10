import { useQuery } from "@tanstack/react-query";
import {
  searchProducts,
  type SearchProductsParams,
} from "../lib/api/searchspring";

export function useProducts(params: SearchProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => searchProducts(params),
    placeholderData: (previousData) => previousData,
  });
}