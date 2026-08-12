import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Header,
} from "../components";

import Button from "../components/common/Button";
import Skeleton from "../components/common/Skeleton/Skeleton";

import { useProduct } from "../hooks";

function ProductDetailsPage() {
  const { productId } = useParams<{
    productId: string;
  }>();

  const [imageError, setImageError] =
    useState(false);

  const [quantity, setQuantity] =
    useState(1);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProduct(productId ?? "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Header />

        <main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb skeleton */}
          <Skeleton className="mb-8 h-4 w-32 rounded" />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(380px,1fr)] lg:gap-16">
            {/* Image skeleton */}
            <div className="mx-auto w-full max-w-xl">
              <Skeleton className="aspect-4/5 w-full rounded-2xl" />
            </div>

            {/* Content skeleton */}
            <div className="flex flex-col justify-center lg:py-6">
              <Skeleton className="h-4 w-24 rounded" />

              <Skeleton className="mt-4 h-10 w-3/4 rounded" />

              <Skeleton className="mt-5 h-5 w-36 rounded" />

              <Skeleton className="mt-5 h-8 w-32 rounded" />

              <Skeleton className="mt-8 h-px w-full rounded" />

              <Skeleton className="mt-8 h-4 w-20 rounded" />

              <Skeleton className="mt-3 h-11 w-32 rounded-lg" />

              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                <Skeleton className="h-12 w-full rounded-lg" />

                <Skeleton className="h-12 w-16 rounded-lg" />
              </div>

              <Skeleton className="mt-6 h-4 w-40 self-center rounded" />

              <Skeleton className="mt-8 h-28 w-full rounded-xl" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Header />

        <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <span
              aria-hidden="true"
              className="text-2xl"
            >
              !
            </span>
          </div>

          <h1 className="mt-6 text-2xl font-semibold">
            Product not found
          </h1>

          <p className="mt-2 max-w-md text-sm text-gray-500">
            {error instanceof Error
              ? error.message
              : "This product is not available."}
          </p>

          <Link
            to="/"
            className="mt-6"
          >
            <Button type="button">
              Back to products
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const price = Number(product.price);
  const msrp = Number(product.msrp);

  const hasDiscount =
    Number.isFinite(msrp) &&
    Number.isFinite(price) &&
    msrp > price;

  const discountPercentage =
    hasDiscount
      ? Math.round(
          ((msrp - price) / msrp) * 100,
        )
      : 0;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
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
          {/* Product image */}
          <div className="mx-auto w-full max-w-xl">
            <div className="relative overflow-hidden rounded-2xl bg-gray-100">
              <div className="aspect-4/5">
                {imageError ? (
                  <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                    Image unavailable
                  </div>
                ) : (
                  <img
                    src={
                      product.thumbnailImageUrl
                    }
                    alt={product.name}
                    onError={() =>
                      setImageError(true)
                    }
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              {/* Badges */}
              {product.badges?.length ? (
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {product.badges
                    .slice(0, 3)
                    .map((badge) => (
                      <span
                        key={`${badge.tag}-${badge.value}`}
                        className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-900 shadow-sm"
                      >
                        {badge.value}
                      </span>
                    ))}
                </div>
              ) : null}

              {/* Discount */}
              {hasDiscount && (
                <span className="absolute right-4 top-4 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Product information */}
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

            {/* Price */}
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

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-900"
              >
                Quantity
              </label>

              <div className="mt-3 flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity === 1}
                  onClick={() =>
                    setQuantity(
                      (previous) =>
                        Math.max(
                          1,
                          previous - 1,
                        ),
                    )
                  }
                  className="flex h-11 w-11 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  −
                </button>

                <span
                  id="quantity"
                  className="flex h-11 w-12 items-center justify-center border-x border-gray-300 text-sm font-medium"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity(
                      (previous) =>
                        previous + 1,
                    )
                  }
                  className="flex h-11 w-11 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
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

            {/* Product benefits */}
            <div className="mt-8 rounded-xl bg-gray-50 p-5">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="text-lg"
                  >
                    ✓
                  </span>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Secure checkout
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Safe and secure payment processing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="text-lg"
                  >
                    ↻
                  </span>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Easy returns
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Hassle-free returns on eligible products.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetailsPage;