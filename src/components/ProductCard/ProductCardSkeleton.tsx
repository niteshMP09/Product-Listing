import Skeleton from "../common/Skeleton";

function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <Skeleton className="aspect-3/4 w-full rounded-lg" />

      <div className="pt-3">
        <Skeleton className="mb-2 h-3 w-20 rounded" />

        <Skeleton className="h-4 w-4/5 rounded" />

        <Skeleton className="mt-2 h-4 w-24 rounded" />

        <Skeleton className="mt-2 h-3 w-16 rounded" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;