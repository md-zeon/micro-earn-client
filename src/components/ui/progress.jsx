import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value = 0,
  ...props
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-value={value}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}>
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        style={{ width: `${value}%` }}
        className="h-full bg-primary transition-all duration-500 ease-out" />
    </ProgressPrimitive.Root>
  );
}

export { Progress }
