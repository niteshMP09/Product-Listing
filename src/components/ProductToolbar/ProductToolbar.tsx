import Button from "../common/Button/Button";

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
    <div className="mb-6 flex items-center justify-between lg:hidden">
      <span className="text-sm text-gray-500">
        {totalResults.toLocaleString()} products
      </span>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={onFilterClick}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          Filter
        </Button>

        <Button
          type="button"
          onClick={onSortClick}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          Sort
        </Button>
      </div>
    </div>
  );
}

export default ProductToolbar;