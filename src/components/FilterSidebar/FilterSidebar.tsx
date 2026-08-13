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
    <aside className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="shrink-0 border-b border-gray-200 px-5 py-5">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
        {facets.map((facet) => (
          <FilterSection
            key={facet.field}
            facet={facet}
            selectedValues={selectedFilters[facet.field] ?? []}
            onSelect={onSelect}
          />
        ))}
      </div>
    </aside>
  );
}
export default FilterSidebar;
