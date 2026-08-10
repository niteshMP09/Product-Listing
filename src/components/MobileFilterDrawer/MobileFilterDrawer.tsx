import { useEffect } from "react";
import type { Facet } from "../../types/searchspring";
import FilterSection from "../FilterSidebar/FilterSection";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  facets: Facet[];
  selectedFilters: Record<string, string[]>;
  onSelect: (field: string, value: string) => void;
  onClose: () => void;
  onClearAll: () => void;
}

function MobileFilterDrawer({
  isOpen,
  facets,
  selectedFilters,
  onSelect,
  onClose,
  onClearAll,
}: MobileFilterDrawerProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );

      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-filter-title"
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 flex h-full w-[min(90%,400px)] flex-col bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2
            id="mobile-filter-title"
            className="text-lg font-semibold text-gray-900"
          >
            Filters
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex-1 overflow-y-auto px-5">
          {facets.map((facet) => (
            <FilterSection
              key={facet.field}
              facet={facet}
              selectedValues={
                selectedFilters[
                  facet.field
                ] ?? []
              }
              onSelect={onSelect}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClearAll}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              Clear all
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Apply filters
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default MobileFilterDrawer;