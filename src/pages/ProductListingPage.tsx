import { useSearchParams } from "react-router-dom";

import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import SortDropdown from "../components/SortDropdown/SortDropdown";
import Pagination from "../components/Pagination/Pagination";

import { useProducts } from "../hooks/useProducts";

function ProductListingPage() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const query =
    searchParams.get("q") ?? "";

  const page = Number(
    searchParams.get("page") ?? "1",
  );

  const {
    data,
    isLoading,
    isError,
    error,
  } = useProducts({
    q: query,
    page,
  });

  const handleSearch = (newQuery: string) => {
    const params = new URLSearchParams();

    if (newQuery) {
      params.set("q", newQuery);
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(
      searchParams,
    );

    params.set("page", String(newPage));

    setSearchParams(params);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(
      searchParams,
    );

    params.set("sort", value);
    params.set("page", "1");

    setSearchParams(params);
  };

  const handleFacetSelect = (
    field: string,
    value: string,
  ) => {
    console.log("Facet selected:", {
      field,
      value,
    });

    // We'll connect this to the API next.
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <main className="mx-auto max-w-[1440px] px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold">
            Something went wrong
          </h1>

          <p className="mt-2 text-gray-500">
            {error instanceof Error
              ? error.message
              : "Unable to load products."}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white"
          >
            Retry
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mx-auto mb-8 max-w-2xl">
          <SearchBar
            initialValue={query}
            onSearch={handleSearch}
          />
        </div>

        {/* Page heading */}
        <div className="mb-6">
          <p className="mb-2 text-sm text-gray-500">
            Home / Products
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {query
                  ? `Search results for "${query}"`
                  : "All Products"}
              </h1>

              {data && (
                <p className="mt-1 text-sm text-gray-500">
                  {data.pagination.totalResults.toLocaleString()}{" "}
                  products
                </p>
              )}
            </div>

            {data && (
              <SortDropdown
                options={data.sorting.options}
                value={
                  searchParams.get("sort") ??
                  `${data.sorting.options[0]?.field}:${data.sorting.options[0]?.direction}`
                }
                onChange={handleSortChange}
              />
            )}
          </div>
        </div>

        {/* Main PLP */}
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Filters */}
          {data && (
            <FilterSidebar
              facets={data.facets}
              onSelect={handleFacetSelect}
            />
          )}

          {/* Products */}
          <section className="min-w-0">
            {data && (
              <div className="mb-6">
                <Pagination
                  pagination={data.pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {isLoading ? (
              <div className="py-20 text-center text-gray-500">
                Loading products...
              </div>
            ) : data?.results.length ? (
              <ProductGrid
                products={data.results}
              />
            ) : (
              <div className="py-20 text-center">
                <h2 className="text-xl font-semibold">
                  No products found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Try another search.
                </p>
              </div>
            )}

            {data && (
              <div className="mt-10">
                <Pagination
                  pagination={data.pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default ProductListingPage;