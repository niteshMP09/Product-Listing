import Skeleton from "../common/Skeleton/Skeleton";

function FilterSidebarSkeleton() {
  return (
    <aside
      aria-hidden="true"
      className="space-y-6"
    >
      <Skeleton className="h-6 w-24" />

      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="border-b border-gray-200 pb-5"
        >
          <Skeleton className="mb-4 h-4 w-28" />

          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      ))}
    </aside>
  );
}

export default FilterSidebarSkeleton;