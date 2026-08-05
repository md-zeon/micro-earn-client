import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TaskDetailsSkeleton = () => {
  return (
    <div className="mx-auto max-w-360 px-4 py-10 md:py-14">
      <div className="flex items-center gap-1.5">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-3" />
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-4 w-3" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <Skeleton className="aspect-[16/9] w-full rounded-2xl" />

          <div className="mt-6 flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="mt-5 h-9 w-3/4" />

          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-3/4" />
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
              <Skeleton className="h-6 w-44" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <Card className="overflow-hidden p-0">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-6">
              <Skeleton className="h-3 w-24 bg-white/40" />
              <Skeleton className="mt-2 h-10 w-40 bg-white/40" />
            </div>
            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-14" />
                </div>
                <Skeleton className="mt-2 h-2 w-full rounded-full" />
              </div>
              <div className="border-t border-border/60 pt-5">
                <Skeleton className="h-11 w-full rounded-full" />
              </div>
            </div>
          </Card>
        </aside>
      </div>

      <div className="mt-16">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-3 h-8 w-48" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden p-0">
              <Skeleton className="aspect-[16/9] w-full rounded-none" />
              <div className="p-5">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-2/3" />
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsSkeleton;
