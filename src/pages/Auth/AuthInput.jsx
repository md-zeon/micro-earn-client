import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AuthInput = React.forwardRef(function AuthInput(
  {
    id,
    label,
    required,
    error,
    hint,
    success,
    rightElement,
    className,
    ...props
  },
  ref,
) {
  const describedBy = error
    ? `${id}-error`
    : hint
      ? `${id}-hint`
      : undefined;

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && (
            <span className="text-destructive" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </Label>
      )}
      <div className="relative">
        <Input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn("h-10", rightElement && "pr-10")}
          {...props}
        />
        {rightElement}
      </div>
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-sm font-medium text-destructive"
        >
          {error}
        </p>
      ) : success ? (
        <p
          id={`${id}-success`}
          className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400"
        >
          <CheckCircle2 className="size-3.5" aria-hidden="true" />
          {success}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default AuthInput;
