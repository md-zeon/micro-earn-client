import { Skeleton } from "@/components/ui/skeleton";
import EmptyState from "@/components/shared/EmptyState";

export const ChartLoading = () => (
  <div className="flex h-72 items-center justify-center">
    <Skeleton className="size-8 rounded-full" />
  </div>
);

export const ChartEmpty = ({ message }) => (
  <div className="flex h-72 items-center justify-center px-6">
    <EmptyState
      title="No data yet"
      description={message}
      className="w-full border-0 py-8"
    />
  </div>
);
