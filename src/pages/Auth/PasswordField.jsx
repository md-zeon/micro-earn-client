import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import AuthInput from "./AuthInput";

const PasswordField = React.forwardRef(function PasswordField(
  {
    id = "password",
    label = "Password",
    autoComplete = "current-password",
    className,
    ...props
  },
  ref,
) {
  const [visible, setVisible] = React.useState(false);

  return (
    <AuthInput
      ref={ref}
      id={id}
      label={label}
      autoComplete={autoComplete}
      type={visible ? "text" : "password"}
      placeholder="Enter your password"
      className={className}
      rightElement={
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-1.5 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </Button>
      }
      {...props}
    />
  );
});

export { PasswordField };
