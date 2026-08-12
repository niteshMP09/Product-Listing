import { useState } from "react";
import type { Product } from "../../types/searchspring";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const price = Number(product.price);
  const msrp = Number(product.msrp);

  const hasDiscount =
    Number.isFinite(msrp) && Number.isFinite(price) && msrp > price;

  return (
    <article className="group  min-w-0">
      <a
        href={product.url}
        className="relative block overflow-hidden bg-gray-100"
      >
        <div className="aspect-3/4">
          {imageError ? (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 px-4 text-center text-sm text-gray-400">
              Image unavailable
            </div>
          ) : (
            <img
              src={product.thumbnailImageUrl}
              alt={product.name}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          )}
        </div>

        {product.badges?.length ? (
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badges.slice(0, 2).map((badge) => (
              <span
                key={`${badge.tag}-${badge.value}`}
                className="bg-white px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-gray-900 shadow-sm"
              >
                {badge.value}
              </span>
            ))}
          </div>
        ) : null}
      </a>

      <div className="pt-3">
        <p className="mb-1 text-xs text-gray-500">{product.brand}</p>

        <h2 className="line-clamp-2 text-sm font-medium text-gray-900">
          {product.name}
        </h2>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            ${price.toFixed(2)}
          </span>

          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ${msrp.toFixed(2)}
            </span>
          )}
        </div>

        {product.rating && (
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
            <span aria-hidden="true">★</span>

            <span>
              {product.rating}

              {product.ratingCount ? ` (${product.ratingCount})` : ""}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
