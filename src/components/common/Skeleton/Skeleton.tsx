interface SkeletonProps {
  className?: string;
}

function Skeleton({
  className = "",
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-gray-200 ${className}`}
    />
  );
}

export default Skeleton;