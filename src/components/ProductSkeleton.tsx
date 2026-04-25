import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-card shadow-md">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
      </div>
    </div>
  );
}
