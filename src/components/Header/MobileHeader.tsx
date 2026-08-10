import { Link, useSearchParams } from "react-router-dom";
import { CartIcon, CloseIcon, HeartIcon, MenuIcon } from "../Icons";
import { createFilterUrl, navigationItems } from "./navigation";
import NavigationLink from "../common/AppLink/AppLink";
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

  const isCategoryActive = (value: string) => {
    return searchParams.get("filter.ss_category_hierarchy") === value;
  };

  return (
    <>
      <div className="flex h-16 items-center justify-between md:hidden">
        <Link
          to="/"
          onClick={onNavigation}
          className="text-base font-bold tracking-tight text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          aria-label="Product Store home"
        >
          Product Store
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={`Wishlist${
              wishlistCount ? `, ${wishlistCount} items` : ""
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

          <button
            type="button"
            aria-label={`Shopping cart${
              cartCount ? `, ${cartCount} items` : ""
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

          <button
            type="button"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            onClick={onMenuToggle}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-gray-200 py-3 md:hidden"
        >
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavigationLink
                key={item.label}
                to={createFilterUrl(item.filterField, item.filterValue)}
                onClick={onNavigation}
                isActive={isCategoryActive(item.filterValue)}
                mobile
              >
                {item.label}
              </NavigationLink>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}

export default MobileHeader;
