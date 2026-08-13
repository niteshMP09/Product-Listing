import type { Product } from "../../types/searchspring";

interface ProductImageProps {
  product: Product;
  imageError: boolean;
  onImageError: () => void;
}

function ProductImage({
  product,
  imageError,
  onImageError,
}: ProductImageProps) {
  const price = Number(product.price);
  const msrp = Number(product.msrp);

  const hasDiscount =
    Number.isFinite(msrp) && Number.isFinite(price) && msrp > price;

  const discountPercentage = hasDiscount
    ? Math.round(((msrp - price) / msrp) * 100)
    : 0;

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100">
        <div className="aspect-4/5">
          {imageError ? (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
              Image unavailable
            </div>
          ) : (
            <img
              src={product.thumbnailImageUrl}
              alt={product.name}
              onError={onImageError}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {product.badges?.length ? (
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {product.badges.slice(0, 3).map((badge) => (
              <span
                key={`${badge.tag}-${badge.value}`}
                className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-900 shadow-sm"
              >
                {badge.value}
              </span>
            ))}
          </div>
        ) : null}

        {hasDiscount && (
          <span className="absolute right-4 top-4 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">
            {discountPercentage}% OFF
          </span>
        )}
      </div>
    </div>
  );
}

export default ProductImage;
