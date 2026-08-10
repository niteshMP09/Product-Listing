function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          Searchspring Store
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 text-sm md:flex"
        >
          <a
            href="#"
            className="text-gray-600 transition hover:text-gray-900"
          >
            New Arrivals
          </a>

          <a
            href="#"
            className="text-gray-600 transition hover:text-gray-900"
          >
            Women
          </a>

          <a
            href="#"
            className="text-gray-600 transition hover:text-gray-900"
          >
            Accessories
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;