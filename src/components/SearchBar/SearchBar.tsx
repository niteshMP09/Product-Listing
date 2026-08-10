import { useEffect, useRef, useState } from "react";
import type { SubmitEvent } from "react";
import Button from "../common/Button/Button";
import useDebounce from "../../hooks/useDebounce";

interface SearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
}

function SearchBar({ initialValue = "", onSearch }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const debouncedValue = useDebounce(value, 500);

  const lastSubmittedValue = useRef(initialValue);

  useEffect(() => {
    const query = debouncedValue.trim();

    if (query === lastSubmittedValue.current) {
      return;
    }

    lastSubmittedValue.current = query;

    onSearch(query);
  }, [debouncedValue, onSearch]);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const query = value.trim();

    lastSubmittedValue.current = query;

    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Product search"
      className="flex w-full"
    >
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>

      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search products..."
        autoComplete="off"
        className="h-11 min-w-0 flex-1 rounded-l-lg border border-r-0 border-gray-300 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
      />

      <Button
        type="submit"
        className="h-11 rounded-r-lg bg-gray-900 px-5 text-sm font-medium text-white  hover:text-white hover:bg-gray-800"
      >
        Search
      </Button>
    </form>
  );
}

export default SearchBar;
