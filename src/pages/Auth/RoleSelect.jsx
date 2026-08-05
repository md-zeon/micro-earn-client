import { BadgeCheck, Briefcase, ListTodo } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const ROLES = [
  {
    value: "worker",
    icon: ListTodo,
    title: "Worker",
    description: "Earn coins by completing simple micro-tasks.",
    chip: "Earn & withdraw",
  },
  {
    value: "buyer",
    icon: Briefcase,
    title: "Buyer",
    description: "Post tasks, hire workers and grow your business.",
    chip: "Post & pay",
  },
];

const RoleSelect = ({ value, onChange, error }) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        Select Role
        <span className="text-destructive" aria-hidden="true">
          {" "}
          *
        </span>
      </Label>
      <div
        className="grid grid-cols-2 gap-3"
        role="radiogroup"
        aria-label="Account role"
        aria-invalid={error ? true : undefined}
      >
        {ROLES.map((role) => {
          const selected = value === role.value;
          return (
            <button
              key={role.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(role.value)}
              className={cn(
                "group relative flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-emerald-500/40",
                selected
                  ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                  : "border-border hover:border-emerald-500/50 hover:bg-muted/50",
              )}
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-xl transition-all duration-200",
                  selected
                    ? "bg-gradient text-white shadow-md shadow-emerald-500/25"
                    : "bg-muted text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/15",
                )}
              >
                <role.icon className="size-5" />
              </span>
              <span className="text-sm font-semibold">{role.title}</span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                {role.description}
              </span>
              <span
                className={cn(
                  "mt-0.5 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  selected
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {role.chip}
              </span>
              {selected && (
                <BadgeCheck
                  aria-hidden="true"
                  className="absolute right-2.5 top-2.5 size-5 text-emerald-500"
                />
              )}
            </button>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};

export default RoleSelect;
