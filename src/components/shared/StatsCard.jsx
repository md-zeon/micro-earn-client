import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Metric card used across dashboards.
 *
 * Keeps the legacy prop surface (`label`, `value`, `suffix`, `Icon`,
 * `subtitle`, `color`) so existing callers keep working, and adds
 * optional `trend` / `trendUp` for deltas.
 */
const StatsCard = ({
  label,
  value,
  color = "text-foreground",
  suffix = "",
  Icon,
  subtitle,
  trend,
  trendUp = true,
  className,
  "aria-label": ariaLabel,
}) => {
  return (
    <Card
      className={cn(
        "group/card h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30",
        className,
      )}
      aria-label={ariaLabel || (label ? `${label}: ${value}` : undefined)}
    >
      <CardContent className="flex flex-col gap-3 px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
          {Icon && (
            <span
              aria-hidden="true"
              className={cn(
                "flex size-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors group-hover/card:bg-primary/10 group-hover/card:text-primary [&>svg]:size-4",
              )}
            >
              <Icon />
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-baseline gap-x-2">
          <span
            className={cn(
              "text-2xl font-bold tracking-tight tabular-nums sm:text-3xl",
              color,
            )}
          >
            {value ?? 0}
          </span>
          {suffix && (
            <span className="text-sm font-semibold text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>

        {(subtitle || trend !== undefined) && (
          <div className="flex items-center gap-2 text-xs">
            {subtitle && (
              <span className="text-muted-foreground">{subtitle}</span>
            )}
            {trend !== undefined && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-medium",
                  trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400",
                )}
              >
                {trendUp ? "▲" : "▼"} {trend}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
