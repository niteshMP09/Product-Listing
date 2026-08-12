import Button from "../common/Button/Button";

interface SortOption {
  field: string;
  direction: string;
  label: string;
}

interface MobileSortProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

function MobileSort({
  options,
  value,
  onChange,
}: MobileSortProps) {
  return (
    <div
      role="group"
      aria-label="Sort options"
      className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:hidden"
    >
      <div className="mb-3 text-sm font-medium text-gray-900">
        Sort by
      </div>

      <div className="space-y-2">
        {options.map((option) => {
          const optionValue = `${option.field}:${option.direction}`;

          const isSelected =
            value === optionValue;

          return (
            <Button
              key={optionValue}
              type="button"
              aria-pressed={isSelected}
              onClick={() =>
                onChange(optionValue)
              }
              className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${
                isSelected
                  ? "bg-gray-900 text-white hover:bg-gray-900"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{option.label}</span>

              {isSelected && (
                <span aria-hidden="true">
                  ✓
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default MobileSort;