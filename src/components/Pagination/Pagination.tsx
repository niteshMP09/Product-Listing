import type { Pagination as PaginationData } from "../../types/searchspring";
import Button from "../common/Button/Button";

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

  const pages: number[] = [];

  const start = Math.max(
    1,
    currentPage - 2,
  );

  const end = Math.min(
    totalPages,
    currentPage + 2,
  );

  for (
    let page = start;
    page <= end;
    page += 1
  ) {
    pages.push(page);
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {/* Previous */}
      <Button
        type="button"
        disabled={!previousPage}
        onClick={() => {
          if (previousPage) {
            onPageChange(previousPage);
          }
        }}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40"
      >
        Previous
      </Button>

      {/* First page */}
      {start > 1 && (
        <>
          <Button
            type="button"
            onClick={() => onPageChange(1)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            1
          </Button>

          <span
            className="px-1 text-gray-400"
            aria-hidden="true"
          >
            ...
          </span>
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => {
        const isCurrentPage =
          page === currentPage;

        return (
          <Button
            key={page}
            type="button"
            aria-current={
              isCurrentPage
                ? "page"
                : undefined
            }
            onClick={() =>
              onPageChange(page)
            }
            className={`min-w-10 rounded-lg border px-3 py-2 text-sm ${
              isCurrentPage
                ? "border-gray-900 bg-gray-900 text-white hover:bg-gray-900"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </Button>
        );
      })}

      {/* Last page */}
      {end < totalPages && (
        <>
          <span
            className="px-1 text-gray-400"
            aria-hidden="true"
          >
            ...
          </span>

          <Button
            type="button"
            onClick={() =>
              onPageChange(totalPages)
            }
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next */}
      <Button
        type="button"
        disabled={!nextPage}
        onClick={() => {
          if (nextPage) {
            onPageChange(nextPage);
          }
        }}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40"
      >
        Next
      </Button>
    </nav>
  );
}

export default Pagination;