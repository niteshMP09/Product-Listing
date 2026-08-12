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

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(newPage));

    setSearchParams(params);

    window.scrollTo({
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
      <div className="min-h-screen bg-white text-gray-900">
        <Header />

        <ProductErrorState error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="mx-auto max-w-360 px-4 py-6 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mx-auto mb-8 max-w-2xl">
          <SearchBar initialValue={query} onSearch={handleSearch} />
        </div>

        {/* Page heading */}
        <div className="mb-6">
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
              <div className="hidden sm:block">
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
          <ProductToolbar
            totalResults={data.pagination.totalResults}
            onFilterClick={() => setIsFilterDrawerOpen(true)}
            onSortClick={() => setIsMobileSortOpen((previous) => !previous)}
          />
        )}

        {data && isMobileSortOpen && (
          <MobileSort
            options={data.sorting.options}
            value={sort}
            onChange={handleMobileSortChange}
          />
        )}
        <ActiveFilters
          facets={data?.facets ?? []}
          onRemove={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            {data ? (
              <FilterSidebar
                facets={data.facets}
                selectedFilters={selectedFilters}
                onSelect={handleFacetSelect}
              />
            ) : (
              <FilterSidebarSkeleton />
            )}
          </aside>
          <section className="min-w-0" aria-live="polite">
            {isFetching && !isLoading && (
              <div
                role="status"
                className="mb-4 flex items-center justify-end gap-2 text-xs text-gray-500"
              >
                <span
                  aria-hidden="true"
                  className="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
                />
                Updating products...
              </div>
            )}

            {isLoading ? (
              <ProductGridSkeleton count={20} />
            ) : data?.results.length ? (
              <ProductGrid products={data.results} />
            ) : (
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

            {/* Bottom pagination */}
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
