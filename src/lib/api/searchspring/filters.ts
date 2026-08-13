function appendRangeFilter(
  searchParams: URLSearchParams,
  field: string,
  value: string,
): void {
  const [low, high] = value.split("-");

  if (low) {
    searchParams.set(`filter.${field}.low`, low);
  }

  if (high) {
    searchParams.set(`filter.${field}.high`, high);
  }
}

function appendFilters(
  searchParams: URLSearchParams,
  filters: Record<string, string[]>,
): void {
  Object.entries(filters).forEach(([field, values]) => {
    values.forEach((value) => {
      if (field === "price" && value.includes("-")) {
        appendRangeFilter(searchParams, field, value);

        return;
      }

      searchParams.append(`filter.${field}`, value);
    });
  });
}

export default appendFilters;
