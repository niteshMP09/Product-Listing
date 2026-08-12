import { useState } from "react";
import { Link } from "react-router-dom";

import type { Product } from "../../types/searchspring";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

interface ProductDetailsProps {
  product: Product;
}

function ProductDetails({
  product,
}: ProductDetailsProps) {
  const [imageError, setImageError] =
    useState(false);

  return (
    <main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-8"
      >
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              to="/"
              className="text-gray-500 transition hover:text-gray-900"
            >
              Products
            </Link>
          </li>

          <li
            aria-hidden="true"
            className="text-gray-300"
          >
            /
          </li>

          <li
            className="max-w-xs truncate font-medium text-gray-900"
            aria-current="page"
          >
            {product.name}
          </li>
        </ol>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(380px,1fr)] lg:gap-16">
        <ProductImage
          product={product}
          imageError={imageError}
          onImageError={() =>
            setImageError(true)
          }
        />

        <ProductInfo product={product} />
      </div>
    </main>
  );
}

export default ProductDetails;