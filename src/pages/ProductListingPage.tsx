import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useProductFilters, useProducts, useProductSorting } from "../hooks";

import {
  ActiveFilters,
  FilterSidebar,
  FilterSidebarSkeleton,
  Header,
  MobileFilterDrawer,
  MobileSort,
  Pagination,
  ProductErrorState,
  ProductGrid,
  ProductGridSkeleton,
  ProductToolbar,
  SearchBar,
  SortDropdown,
} from "../components";

function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);

  const query = searchParams.get("q") ?? "";

  const page = Number(searchParams.get("page") ?? "1");

  const {
    selectedFilters,
    handleFacetSelect,
    handleRemoveFilter,
    handleClearAllFilters,
  } = useProductFilters();

  const { sort, handleSortChange } = useProductSorting();

  const { data, isLoading, isFetching, isError, error, refetch } = useProducts({
    q: query,
    page,
    sort,
    filters: selectedFilters,
  });

  /**
   * Search
   */
  const handleSearch = (newQuery: string) => {
    const params = new URLSearchParams(searchParams);

    if (newQuery) {
      params.set("q", newQuery);
    } else {
      params.delete("q");
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  /**
   * Pagination
   */
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(newPage));

    setSearchParams(params);
    const productContainer = document.getElementById("product-results");

    productContainer?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 
  const handleMobileSortChange = (value: string) => {
    handleSortChange(value);
    setIsMobileSortOpen(false);
  };

  if (isError) {
    return (
      <div className="flex h-screen flex-col overflow-hidden bg-white text-gray-900">
        <Header />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <ProductErrorState error={error} onRetry={refetch} />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-gray-900">
      {/* Header */}
      <Header />

      <main className="mx-auto flex min-h-0 w-full max-w-360 flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mx-auto mb-8 w-full max-w-2xl shrink-0">
          <SearchBar initialValue={query} onSearch={handleSearch} />
        </div>

        {/* Page heading */}
        <div className="mb-6 shrink-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {query ? `Search results for "${query}"` : "All Products"}
              </h1>

              {data && (
                <p className="mt-1 text-sm text-gray-500">
                  {data.pagination.totalResults.toLocaleString()} products
                </p>
              )}
            </div>

            {/* Desktop sorting */}
            {data && (
              <div className="hidden shrink-0 sm:block">
                <SortDropdown
                  options={data.sorting.options}
                  value={sort}
                  onChange={handleSortChange}
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile toolbar */}
        {data && (
          <div className="shrink-0">
            <ProductToolbar
              totalResults={data.pagination.totalResults}
              onFilterClick={() => setIsFilterDrawerOpen(true)}
              onSortClick={() => setIsMobileSortOpen((previous) => !previous)}
            />
          </div>
        )}

        {/* Mobile sort */}
        {data && isMobileSortOpen && (
          <div className="shrink-0">
            <MobileSort
              options={data.sorting.options}
              value={sort}
              onChange={handleMobileSortChange}
            />
          </div>
        )}

        {/* Active filters */}
        <div className="shrink-0">
          <ActiveFilters
            facets={data?.facets ?? []}
            onRemove={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />
        </div>

        <div className="grid min-h-0 flex-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Desktop filter sidebar */}
          <aside className="hidden min-h-0 lg:block">
            <div className="h-full overflow-y-auto pr-2">
              {data ? (
                <FilterSidebar
                  facets={data.facets}
                  selectedFilters={selectedFilters}
                  onSelect={handleFacetSelect}
                />
              ) : (
                <FilterSidebarSkeleton />
              )}
            </div>
          </aside>

          {/* Product results */}
          <section
            id="product-results"
            className="min-h-0 min-w-0 overflow-y-auto pr-1"
            aria-live="polite"
          >
            {/* Updating indicator */}
            {isFetching && !isLoading && (
              <div
                role="status"
                className="mb-4 flex items-center justify-end gap-2 text-xs text-gray-500"
              >
                <span
                  aria-hidden="true"
                  className="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
                />

                <span>Updating products...</span>
              </div>
            )}

            {/* Loading */}
            {isLoading ? (
              <ProductGridSkeleton count={20} />
            ) : data?.results.length ? (
              <>
                <ProductGrid products={data.results} />

                {/* Bottom pagination */}
                <div className="mt-10 pb-6">
                  <Pagination
                    pagination={data.pagination}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              /* Empty state */
              <div className="flex min-h-100 flex-col items-center justify-center px-4 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <span aria-hidden="true" className="text-2xl">
                    🔍
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                  No products found
                </h2>

                <p className="mt-2 max-w-md text-sm text-gray-500">
                  We couldn't find any products matching your search. Try a
                  different search or remove some filters.
                </p>

                {query && (
                  <button
                    type="button"
                    onClick={() => handleSearch("")}
                    className="mt-5 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Mobile filter drawer */}
      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        facets={data?.facets ?? []}
        selectedFilters={selectedFilters}
        onSelect={handleFacetSelect}
        onClose={() => setIsFilterDrawerOpen(false)}
        onClearAll={handleClearAllFilters}
      />
    </div>
  );
}

export default ProductListingPage;
