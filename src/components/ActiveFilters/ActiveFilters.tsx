import type { Facet } from "../../types/searchspring";
import Button from "../common/Button/Button";

interface ActiveFiltersProps {
  facets: Facet[];
  onRemove: (field: string, value: string) => void;
  onClearAll: () => void;
}

function ActiveFilters({
  facets,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) {
  const activeFilters = facets.flatMap(
    (facet) =>
      facet.values
        .filter((value) => value.active)
        .map((value) => ({
          field: facet.field,
          fieldLabel: facet.label,
          value:
            value.value ??
            `${value.low ?? ""}-${value.high ?? ""}`,
          label: value.label,
        })),
  );

  if (!activeFilters.length) {
    return null;
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-medium text-gray-500">
        Filters:
      </span>

      {activeFilters.map((filter) => (
        <Button
          key={`${filter.field}-${filter.value}`}
          type="button"
          onClick={() =>
            onRemove(
              filter.field,
              filter.value,
            )
          }
          className="inline-flex rounded-full border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
          aria-label={`Remove ${filter.fieldLabel}: ${filter.label}`}
        >
          <span>
            {filter.fieldLabel}: {filter.label}
          </span>

          <span
            aria-hidden="true"
            className="ml-2 text-gray-500"
          >
            ×
          </span>
        </Button>
      ))}

      <Button
        type="button"
        onClick={onClearAll}
        className="ml-1 px-2 py-1 text-xs font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600"
      >
        Clear all
      </Button>
    </div>
  );
}

export default ActiveFilters;