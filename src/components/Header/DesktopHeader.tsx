import { Link, useSearchParams } from "react-router-dom";

import {
  createFilterUrl,
  navigationItems,
} from "./navigation";

interface DesktopHeaderProps {
  cartCount: number;
  wishlistCount: number;
}

function DesktopHeader({
  cartCount,
  wishlistCount,
}: DesktopHeaderProps) {
  const [searchParams] = useSearchParams();

  const isCategoryActive = (
    value: string,
  ) => {
    return (
      searchParams.get(
        "filter.ss_category_hierarchy",
      ) === value
    );
  };

  return (
    <div className="hidden h-16 items-center justify-between md:flex">
      {/* Logo */}
      <Link
        to="/"
        className="shrink-0 text-lg font-bold tracking-tight text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        aria-label="Product Store home"
      >
       Product Store
      </Link>

      {/* Navigation */}
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-6"
      >
        {navigationItems.map((item) => (
          <Link
            key={item.label}
            to={createFilterUrl(
              item.filterField,
              item.filterValue,
            )}
            className={`text-sm font-medium transition ${
              isCategoryActive(
                item.filterValue,
              )
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Wishlist */}
        <button
          type="button"
          aria-label={`Wishlist${
            wishlistCount
              ? `, ${wishlistCount} items`
              : ""
          }`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>

          {wishlistCount > 0 && (
            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold text-white">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          type="button"
          aria-label={`Shopping cart${
            cartCount
              ? `, ${cartCount} items`
              : ""
          }`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-1.5 1.5A1 1 0 0 0 6.2 16H18M9 19.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
            />
          </svg>

          {cartCount > 0 && (
            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default DesktopHeader;