import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type { Product } from "../types/searchspring";

export function useProduct(
  productId: string,
) {
  const queryClient =
    useQueryClient();

  return useQuery<Product>({
    queryKey: [
      "product",
      productId,
    ],

    queryFn: async () => {
      throw new Error(
        "Product is not available in cache.",
      );
    },

    initialData: () => {
      const queries =
        queryClient.getQueriesData<{
          results: Product[];
        }>({
          queryKey: ["products"],
        });

      for (const [, data] of queries) {
        const product =
          data?.results?.find(
            (item) =>
              item.id ===
              productId,
          );

        if (product) {
          return product;
        }
      }

      return undefined;
    },

    enabled: Boolean(productId),

    staleTime: 1000 * 60 * 5,
  });
}