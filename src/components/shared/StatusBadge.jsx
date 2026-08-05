import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  CircleDashed,
  Clock,
  XCircle,
  Circle,
} from "lucide-react";

const STATUS_STYLES = {
  active: "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400",
  completed: "bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/20 dark:text-sky-400",
  pending: "bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400",
  approved: "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400",
  rejected: "bg-red-500/10 text-red-600 ring-1 ring-red-500/20 dark:text-red-400",
  paid: "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400",
};

const STATUS_ICONS = {
  active: CircleDashed,
  completed: CheckCircle2,
  pending: Clock,
  approved: CheckCircle2,
  rejected: XCircle,
  paid: CheckCircle2,
};

const STATUS_LABELS = {
  active: "Active",
  completed: "Completed",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  paid: "Paid",
};

/**
 * Theme-aware status badge. `status` is lowercased before matching so
 * inconsistent API casing never breaks the visual state.
 */
const StatusBadge = ({
  status,
  className,
  icon: showIcon = true,
  labels = STATUS_LABELS,
}) => {
  const key = String(status || "").toLowerCase();
  const Icon = STATUS_ICONS[key] || Circle;
  const label = labels[key] || String(status || "Unknown");

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-6 gap-1 rounded-full px-2.5 font-medium capitalize",
        STATUS_STYLES[key] || "bg-muted text-muted-foreground ring-1 ring-border",
        className,
      )}
    >
      {showIcon && <Icon className="size-3" aria-hidden="true" />}
      {label}
    </Badge>
  );
};

export default StatusBadge;
