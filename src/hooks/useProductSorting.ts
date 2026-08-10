import { useSearchParams } from "react-router-dom";

function useProductSorting() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const sort = searchParams.get("sort") ?? "";

  const handleSortChange = (
    newSort: string,
  ) => {
    const params = new URLSearchParams(
      searchParams,
    );

    if (newSort) {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }

    // Sorting should always start from page 1.
    params.set("page", "1");

    setSearchParams(params);
  };

  return {
    sort,
    handleSortChange,
  };
}

export default useProductSorting;