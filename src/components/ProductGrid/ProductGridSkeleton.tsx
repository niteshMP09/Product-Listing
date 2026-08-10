import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";

interface ProductGridSkeletonProps {
  count?: number;
}

function ProductGridSkeleton({
  count = 8,
}: ProductGridSkeletonProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-x-5
        gap-y-8
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
      aria-label="Loading products"
      role="status"
    >
      {Array.from({ length: count }).map(
        (_, index) => (
          <ProductCardSkeleton
            key={index}
          />
        ),
      )}

      <span className="sr-only">
        Loading products...
      </span>
    </div>
  );
}

export default ProductGridSkeleton;