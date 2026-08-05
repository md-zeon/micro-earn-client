import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(function Checkbox(
  { className, ...props },
  ref,
) {
  return (
    <span className="relative inline-flex shrink-0">
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "peer size-4 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-input bg-transparent transition-all duration-200 outline-none checked:border-emerald-500 checked:bg-emerald-500 hover:border-emerald-500/60 focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <Check
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 size-4 scale-75 p-0.5 text-white opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
      />
    </span>
  );
});

export { Checkbox };
