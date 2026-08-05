import { Skeleton } from "@/components/ui/skeleton";

const DashboardLayoutSkeleton = () => {
  return (
    <div className="flex min-h-svh w-full">
      <div className="hidden w-64 shrink-0 animate-pulse border-r bg-muted/40 p-4 md:block">
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-md" />
          ))}
        </div>
      </div>

      <div className="flex min-h-svh w-full flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="hidden h-5 w-32 sm:block" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="hidden h-6 w-20 rounded-md sm:block" />
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="size-8 rounded-full" />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-2 h-4 w-72" />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3 rounded-xl border p-5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-3 w-36" />
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutSkeleton;
