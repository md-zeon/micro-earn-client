import { cn } from "@/lib/utils";

/**
 * Consistent page header for dashboard pages.
 * Renders an optional eyebrow, title, description and action slot
 * with proper heading semantics and responsive layout.
 */
const PageHeader = ({
  eyebrow,
  title,
  description,
  actions,
  className,
  as = "h1",
  id,
}) => {
  const HeadingTag = as;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="space-y-1.5">
        {eyebrow && (
          <p className="text-xs font-semibold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
            {eyebrow}
          </p>
        )}
        <HeadingTag
          id={id}
          className="scroll-m-20 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {title}
        </HeadingTag>
        {description && (
          <p className="text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  );
};

export default PageHeader;
