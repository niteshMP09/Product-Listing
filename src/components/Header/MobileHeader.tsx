import { useSearchParams, Link } from "react-router-dom";

import {
  createFilterUrl,
  navigationItems,
} from "./navigation";

interface MobileHeaderProps {
  isOpen: boolean;
  cartCount: number;
  wishlistCount: number;
  onMenuToggle: () => void;
  onNavigation: () => void;
}

function MobileHeader({
  isOpen,
  cartCount,
  wishlistCount,
  onMenuToggle,
  onNavigation,
}: MobileHeaderProps) {
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
    <>
      <div className="flex h-16 items-center justify-between md:hidden">
        {/* Logo */}
        <Link
          to="/"
          onClick={onNavigation}
          className="text-base font-bold tracking-tight text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          aria-label="Product Store home"
        >
          Product Store
        </Link>

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
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
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
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
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

          {/* Menu */}
          <button
            type="button"
            aria-label={
              isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isOpen}
            onClick={onMenuToggle}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            {isOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6 6 18"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-gray-200 py-3 md:hidden"
        >
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={createFilterUrl(
                  item.filterField,
                  item.filterValue,
                )}
                onClick={onNavigation}
                className={`block rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isCategoryActive(
                    item.filterValue,
                  )
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}

export default MobileHeader;