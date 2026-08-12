import { useState } from "react";

import type { Product } from "../../types/searchspring";

import Button from "../common/Button";
import ProductQuantity from "./ProductQuantity";
import ProductBenefits from "./ProductBenefits";



interface ProductInfoProps {
  product: Product;
}

function ProductInfo({
  product,
}: ProductInfoProps) {
  const [quantity, setQuantity] =
    useState(1);

  const price = Number(product.price);
  const msrp = Number(product.msrp);

  const hasDiscount =
    Number.isFinite(msrp) &&
    Number.isFinite(price) &&
    msrp > price;

  return (
    <div className="flex flex-col justify-center lg:py-6">
      {product.brand && (
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
          {product.brand}
        </p>
      )}

      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
        {product.name}
      </h1>

      {product.rating && (
        <div className="mt-5 flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span
              aria-hidden="true"
              className="text-base"
            >
              ★
            </span>

            <span className="text-sm font-medium text-gray-900">
              {product.rating}
            </span>
          </div>

          {product.ratingCount ? (
            <>
              <span className="text-gray-300">
                |
              </span>

              <span className="text-sm text-gray-500">
                {product.ratingCount} reviews
              </span>
            </>
          ) : null}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-3xl font-semibold text-gray-900">
          ${price.toFixed(2)}
        </span>

        {hasDiscount && (
          <>
            <span className="text-lg text-gray-400 line-through">
              ${msrp.toFixed(2)}
            </span>

            <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
              Save $
              {(msrp - price).toFixed(2)}
            </span>
          </>
        )}
      </div>

      <div className="my-8 h-px bg-gray-200" />

      <ProductQuantity
        quantity={quantity}
        onQuantityChange={setQuantity}
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <Button
          type="button"
          className="w-full px-6 py-3.5"
        >
          Add to cart
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="px-6 py-3.5"
          aria-label="Add to wishlist"
        >
          ♡
        </Button>
      </div>

      {product.url && (
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-center text-sm font-medium text-gray-600 underline underline-offset-4 transition hover:text-gray-900"
        >
          View product on store
        </a>
      )}

      <ProductBenefits />
    </div>
  );
}

export default ProductInfo;