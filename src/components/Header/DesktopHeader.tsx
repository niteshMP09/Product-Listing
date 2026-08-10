import { Link, useSearchParams } from "react-router-dom";
import {
  CartIcon,
  HeartIcon,
} from "../Icons";
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
  const [searchParams] =
    useSearchParams();

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
      <Link
        to="/"
        className="shrink-0 text-lg font-bold tracking-tight text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        aria-label="Product Store home"
      >
        Product Store
      </Link>
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
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={`Wishlist${
            wishlistCount
              ? `, ${wishlistCount} items`
              : ""
          }`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          <HeartIcon />

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
          <CartIcon />
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