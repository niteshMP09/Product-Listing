import type { Facet } from "../../types/searchspring";
import FilterSection from "./FilterSection";

interface FilterSidebarProps {
  facets: Facet[];
  selectedFilters: Record<string, string[]>;
  onSelect: (field: string, value: string) => void;
}

function FilterSidebar({
  facets,
  selectedFilters,
  onSelect,
}: FilterSidebarProps) {
  return (
    <aside
      aria-label="Product filters"
      className="hidden lg:block"
    >
      <div className="sticky top-6">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-4 py-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Filters
            </h2>
          </div>

          <div className="max-h-[calc(90vh-10rem)] overflow-y-auto p-4">
            <div>
              {facets.map((facet) => (
                <FilterSection
                  key={facet.field}
                  facet={facet}
                  selectedValues={
                    selectedFilters[facet.field] ?? []
                  }
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;