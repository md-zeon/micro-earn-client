import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const FormField = ({
  label,
  id,
  error,
  hint,
  success,
  required,
  trailing,
  className,
  labelClassName,
  errorClassName,
  children,
}) => {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const input = React.Children.only(children);
  const field = React.isValidElement(input)
    ? React.cloneElement(input, {
        ...input.props,
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })
    : input;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className={labelClassName}>
        {label}
        {required && (
          <span className="text-destructive" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </Label>
      {trailing ? (
        <div className="relative">
          {field}
          {trailing}
        </div>
      ) : (
        field
      )}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn("text-sm font-medium text-destructive", errorClassName)}
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
};

export default FormField;
