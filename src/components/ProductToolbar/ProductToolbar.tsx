interface ProductToolbarProps {
  totalResults: number;
  onFilterClick: () => void;
  onSortClick: () => void;
}

function ProductToolbar({
  totalResults,
  onFilterClick,
  onSortClick,
}: ProductToolbarProps) {
  return (
    <div className="mb-6 flex items-center justify-between border-y border-gray-200 py-3 lg:hidden">
      <span className="text-sm text-gray-500">
        {totalResults.toLocaleString()} products
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onFilterClick}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          Filter
        </button>

        <button
          type="button"
          onClick={onSortClick}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          Sort
        </button>
      </div>
    </div>
  );
}

export default ProductToolbar;