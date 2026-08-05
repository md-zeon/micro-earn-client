import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>

      <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <Skeleton className="h-28 rounded-none sm:h-32" />
        <div className="flex items-end gap-4 px-5 pb-5 pt-0">
          <Skeleton className="-mt-10 size-20 rounded-full sm:-mt-12 sm:size-24" />
          <div className="flex-1 space-y-2 pb-2">
            <Skeleton className="h-6 w-40 max-w-full" />
            <Skeleton className="h-4 w-56 max-w-full" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-xl ring-1 ring-foreground/10 p-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="size-9 rounded-full" />
            </div>
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </div>

      <div className="space-y-4 rounded-xl ring-1 ring-foreground/10 p-5">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-3 w-64" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="size-8 rounded-lg" />
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
