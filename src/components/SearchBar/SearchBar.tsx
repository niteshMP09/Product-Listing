import { FormEvent, useState } from "react";

interface SearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
}

function SearchBar({
  initialValue = "",
  onSearch,
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSearch(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="w-full"
    >
      <div className="flex w-full">
        <label
          htmlFor="product-search"
          className="sr-only"
        >
          Search products
        </label>

        <input
          id="product-search"
          type="search"
          value={value}
          onChange={(event) =>
            setValue(event.target.value)
          }
          placeholder="Search products..."
          className="h-11 min-w-0 flex-1 rounded-l-lg border border-r-0 border-gray-300 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
        />

        <button
          type="submit"
          className="h-11 rounded-r-lg bg-gray-900 px-5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;