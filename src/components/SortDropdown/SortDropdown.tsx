import type { SortOption } from "../../types/searchspring";

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

function SortDropdown({ options, value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-products"
        className="whitespace-nowrap text-sm text-gray-500"
      >
        Sort by
      </label>

      <select
        id="sort-products"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
      >
        {options.map((option) => {
          const optionValue = `${option.field}:${option.direction}`;

          return (
            <option key={optionValue} value={optionValue}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SortDropdown;
