import { useEffect, useRef } from "react";
import type { Facet } from "../../types/searchspring";
import FilterSection from "../FilterSidebar/FilterSection";
import Button from "../common/Button/Button";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  facets: Facet[];
  selectedFilters: Record<string, string[]>;
  onSelect: (
    field: string,
    value: string,
  ) => void;
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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

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
      className="fixed inset-0 z-50 bg-black/40"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-filter-title"
        className="absolute right-0 top-0 flex h-full w-[min(90%,400px)] flex-col bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2
            id="mobile-filter-title"
            className="text-lg font-semibold text-gray-900"
          >
            Filters
          </h2>
          <Button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close filters"
            className="h-9 w-9 rounded-full p-0 text-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <span aria-hidden="true">
              ×
            </span>
          </Button>
        </div>
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
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={onClearAll}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Clear all
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Apply filters
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default MobileFilterDrawer;