import { useState } from "react";

import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  /*
   * Temporary values.
   *
   * Later these can come from Zustand/cart state.
   */
  const cartCount = 0;
  const wishlistCount = 0;

  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <DesktopHeader
          cartCount={cartCount}
          wishlistCount={wishlistCount}
        />

        <MobileHeader
          isOpen={isMobileMenuOpen}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          onMenuToggle={() =>
            setIsMobileMenuOpen(
              (previous) => !previous,
            )
          }
          onNavigation={handleNavigation}
        />
      </div>
    </header>
  );
}

export default Header;