import type { Facet } from "../../types/searchspring";

interface FilterSectionProps {
  facet: Facet;
  onSelect: (
    field: string,
    value: string,
  ) => void;
}

function FilterSection({
  facet,
  onSelect,
}: FilterSectionProps) {
  return (
    <section className="border-b border-gray-200 py-5">
      <h3 className="mb-3 text-sm font-semibold text-gray-900">
        {facet.label}
      </h3>

      <div className="space-y-3">
        {facet.values.map((facetValue) => {
          const inputId = `${facet.field}-${facetValue.label}`;

          return (
            <label
              key={`${facet.field}-${facetValue.label}`}
              htmlFor={inputId}
              className="flex cursor-pointer items-start gap-3 text-sm"
            >
              <input
                id={inputId}
                type="checkbox"
                checked={facetValue.active}
                onChange={() =>
                  onSelect(
                    facet.field,
                    facetValue.value ??
                      `${facetValue.low}-${facetValue.high}`,
                  )
                }
                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-gray-900"
              />

              <span className="flex-1 text-gray-600">
                {facetValue.label}
              </span>

              <span className="text-xs text-gray-400">
                {facetValue.count}
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

export default FilterSection;