import Skeleton from "../common/Skeleton/Skeleton";

function ProductCardSkeleton() {
  return (
    <article className="group min-w-0">
      <div className="relative w-full overflow-hidden bg-gray-100">
        <div className="aspect-3/4 w-full">
          <Skeleton className="h-full w-full rounded-none" />
        </div>
      </div>
      <div className="pt-3">
        <Skeleton className="mb-2 h-3 w-20" />
        <Skeleton className="h-4 w-4/5" />

        <Skeleton className="mt-2 h-4 w-24" />
        <Skeleton className="mt-2 h-3 w-16" />
      </div>
    </article>
  );
}

export default ProductCardSkeleton;
