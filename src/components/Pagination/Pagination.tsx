import type { Pagination as PaginationData } from "../../types/searchspring";

interface PaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
}

function Pagination({
  pagination,
  onPageChange,
}: PaginationProps) {
  const {
    currentPage,
    totalPages,
    previousPage,
    nextPage,
  } = pagination;

  const pages = [];

  const start = Math.max(
    1,
    currentPage - 2,
  );

  const end = Math.min(
    totalPages,
    currentPage + 2,
  );

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  return (
    <nav
      aria-label="Product pagination"
      className="flex items-center justify-center gap-2"
    >
      <button
        type="button"
        disabled={!previousPage}
        onClick={() =>
          previousPage &&
          onPageChange(previousPage)
        }
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-40"
      >
        Previous
      </button>

      {start > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            1
          </button>

          <span className="px-1 text-gray-400">
            ...
          </span>
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={
            page === currentPage
              ? "page"
              : undefined
          }
          onClick={() => onPageChange(page)}
          className={`min-w-10 rounded-lg border px-3 py-2 text-sm ${
            page === currentPage
              ? "border-gray-900 bg-gray-900 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          <span className="px-1 text-gray-400">
            ...
          </span>

          <button
            type="button"
            onClick={() =>
              onPageChange(totalPages)
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        disabled={!nextPage}
        onClick={() =>
          nextPage &&
          onPageChange(nextPage)
        }
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;