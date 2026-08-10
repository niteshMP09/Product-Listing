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
    <aside className="hidden lg:block">
      <div className="sticky top-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>

        <div>
          {facets.map((facet) => (
            <FilterSection
              key={facet.field}
              facet={facet}
              selectedValues={selectedFilters[facet.field] ?? []}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
