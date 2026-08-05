import { CheckCircle2, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const evaluate = (password = "") => {
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
};

const LEVELS = [
  { label: "Weak", bar: "bg-red-500", text: "text-red-500", segments: 1 },
  { label: "Fair", bar: "bg-amber-500", text: "text-amber-500", segments: 2 },
  { label: "Good", bar: "bg-emerald-500", text: "text-emerald-500", segments: 3 },
  { label: "Strong", bar: "bg-teal-500", text: "text-teal-500", segments: 4 },
];

const REQUISITES = (password = "") => [
  {
    label: "At least 6 characters",
    met: password.length >= 6,
  },
  {
    label: "Uppercase & lowercase letters",
    met: /[a-z]/.test(password) && /[A-Z]/.test(password),
  },
  {
    label: "At least 1 number",
    met: /\d/.test(password),
  },
  {
    label: "At least 1 symbol",
    met: /[^A-Za-z0-9]/.test(password),
  },
];

const PasswordStrength = ({ password = "", show }) => {
  const score = evaluate(password);
  const level = score >= 5 ? 3 : score >= 4 ? 2 : score >= 2 ? 1 : 0;
  const config = LEVELS[level];

  if (!show || !password) return null;

  return (
    <div className="space-y-3 rounded-xl border border-border/70 bg-muted/40 p-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                i < config.segments
                  ? config.bar
                  : "bg-foreground/10",
              )}
            />
          ))}
        </div>
        <span
          className={cn(
            "text-xs font-semibold",
            config.text,
          )}
        >
          {config.label}
        </span>
      </div>

      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {REQUISITES(password).map((req) => (
          <li
            key={req.label}
            className="flex items-center gap-1.5 text-xs"
          >
            {req.met ? (
              <CheckCircle2
                aria-hidden="true"
                className="size-3.5 shrink-0 text-emerald-500"
              />
            ) : (
              <Circle
                aria-hidden="true"
                className="size-3.5 shrink-0 text-muted-foreground/50"
              />
            )}
            <span
              className={cn(
                "font-medium transition-colors",
                req.met ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrength;
