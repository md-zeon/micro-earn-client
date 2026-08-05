import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const DataFreshness = ({ className }) => {
  const time = new Date().toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
        className,
      )}
    >
      <RefreshCw className="size-3.5" aria-hidden="true" />
      Updated {time}
    </span>
  );
};

export default DataFreshness;
