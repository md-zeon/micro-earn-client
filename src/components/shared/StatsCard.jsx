import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const toneStyles = {
  emerald:
    "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400",
  sky: "bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/20 dark:text-sky-400",
  amber:
    "bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400",
  violet:
    "bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-400",
  rose: "bg-rose-500/10 text-rose-600 ring-1 ring-rose-500/20 dark:text-rose-400",
  teal: "bg-teal-500/10 text-teal-600 ring-1 ring-teal-500/20 dark:text-teal-400",
};

const formatValue = (value) => {
  if (value === null || value === undefined) return "0";
  if (typeof value === "number") return value.toLocaleString();
  return value;
};

/**
 * Metric card used across dashboards.
 *
 * Keeps the legacy prop surface (`label`, `value`, `suffix`, `Icon`,
 * `subtitle`, `color`) so existing callers keep working, and adds
 * optional `tone`, `trend` / `trendUp` and `footer` for rich KPIs.
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
  tone = "emerald",
  footer,
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
                "flex size-9 shrink-0 items-center justify-center rounded-full [&>svg]:size-4",
                toneStyles[tone] ?? toneStyles.emerald,
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
            {formatValue(value)}
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
                  trendUp
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400",
                )}
              >
                {trendUp ? (
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                ) : (
                  <ArrowDownRight className="size-3.5" aria-hidden="true" />
                )}
                {trend}
              </span>
            )}
          </div>
        )}

        {footer && <div className="pt-1">{footer}</div>}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
