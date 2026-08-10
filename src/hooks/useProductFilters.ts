import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import type { SelectedFilters } from "../types/searchspring";

function useProductFilters() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const selectedFilters =
    useMemo<SelectedFilters>(() => {
      const filters: SelectedFilters = {};

      searchParams.forEach((value, key) => {
        if (!key.startsWith("filter.")) {
          return;
        }

        const field = key.replace(
          "filter.",
          "",
        );

        if (!filters[field]) {
          filters[field] = [];
        }

        filters[field].push(value);
      });

      return filters;
    }, [searchParams]);

  const handleFacetSelect = (
    field: string,
    value: string,
  ) => {
    const params = new URLSearchParams(
      searchParams,
    );

    const filterKey = `filter.${field}`;

    const currentValues =
      params.getAll(filterKey);

    const valueExists =
      currentValues.includes(value);

    if (valueExists) {
      params.delete(filterKey);

      currentValues
        .filter(
          (currentValue) =>
            currentValue !== value,
        )
        .forEach((currentValue) => {
          params.append(
            filterKey,
            currentValue,
          );
        });
    } else {
      params.append(filterKey, value);
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  const handleRemoveFilter = (
    field: string,
    value: string,
  ) => {
    const params = new URLSearchParams(
      searchParams,
    );

    const filterKey = `filter.${field}`;

    const remainingValues = params
      .getAll(filterKey)
      .filter(
        (currentValue) =>
          currentValue !== value,
      );

    params.delete(filterKey);

    remainingValues.forEach(
      (currentValue) => {
        params.append(
          filterKey,
          currentValue,
        );
      },
    );

    params.set("page", "1");

    setSearchParams(params);
  };

  const handleClearAllFilters = () => {
    const params = new URLSearchParams(
      searchParams,
    );

    Array.from(params.keys()).forEach(
      (key) => {
        if (key.startsWith("filter.")) {
          params.delete(key);
        }
      },
    );

    params.set("page", "1");

    setSearchParams(params);
  };

  return {
    selectedFilters,
    handleFacetSelect,
    handleRemoveFilter,
    handleClearAllFilters,
  };
}

export default useProductFilters;