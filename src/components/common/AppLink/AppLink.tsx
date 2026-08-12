import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface NavigationLinkProps {
  to: string;
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  mobile?: boolean;
}

function NavigationLink({
  to,
  children,
  isActive = false,
  onClick,
  mobile = false,
}: NavigationLinkProps) {
  const className = mobile
    ? `block rounded-lg px-3 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`
    : `text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 ${
        isActive
          ? "text-gray-900"
          : "text-gray-600 hover:text-gray-900"
      }`;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={className}
    >
      {children}
    </Link>
  );
}

export default NavigationLink;