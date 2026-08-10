import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [cartCount] = useState(0);
  const [wishlistCount] = useState(0);
  const navigationItems = [
    {
      label: "New Arrivals",
      filterField: "ss_category_hierarchy",
      filterValue: "What's New",
    },
    {
      label: "Women",
      filterField: "ss_category_hierarchy",
      filterValue: "Gifts for Her",
    },
    {
      label: "Accessories",
      filterField: "ss_category_hierarchy",
      filterValue: "All Accessories",
    },
  ];
  const createFilterUrl = (field: string, value: string) => {
    const params = new URLSearchParams();

    params.set(`filter.${field}`, value);
    params.set("page", "1");

    return `/?${params.toString()}`;
  };
  const isCategoryActive = (value: string) => {
    return searchParams.get("filter.ss_category_hierarchy") === value;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-lg font-bold tracking-tight text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          aria-label="Searchspring Store home"
        >
          Searchspring Store
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              to={createFilterUrl(item.filterField, item.filterValue)}
              className={`text-sm font-medium transition ${
                isCategoryActive(item.filterValue)
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
              wishlistCount ? `, ${wishlistCount} items` : ""
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
              cartCount ? `, ${cartCount} items` : ""
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

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((previous) => !previous)}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 md:hidden"
          >
            {isMobileMenuOpen ? (
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

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-gray-200 bg-white md:hidden"
        >
          <div className="mx-auto max-w-[1440px] px-4 py-3 sm:px-6">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={createFilterUrl(item.filterField, item.filterValue)}
                className={`text-sm font-medium transition ${
                  isCategoryActive(item.filterValue)
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
