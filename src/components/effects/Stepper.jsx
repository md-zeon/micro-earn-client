import { LuCheck } from "react-icons/lu";
import { cn } from "@/lib/utils";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const Stepper = ({ steps = [], currentStep = 1, onStepChange }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const total = steps.length;
  const progress =
    total <= 1 ? 100 : ((Math.min(currentStep, total) - 1) / (total - 1)) * 100;

  const handleKeyDown = (e) => {
    if (!onStepChange) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = e.key === "ArrowRight" ? currentStep + 1 : currentStep - 1;
      if (next >= 1 && next <= total) onStepChange(next);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <ol
        onKeyDown={handleKeyDown}
        className="flex items-center justify-between px-2 relative sm:px-0"
      >
        <div
          aria-hidden="true"
          className="absolute top-5 left-0 right-0 h-1 rounded-full bg-border"
        />
        <div
          aria-hidden="true"
          className={cn(
            "absolute top-5 left-0 h-1 rounded-full bg-gradient",
            !prefersReducedMotion &&
              "transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          )}
          style={{ width: `${progress}%` }}
        />

        {steps.map((s, i) => {
          const stepNumber = i + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;
          const interactive = Boolean(onStepChange);

          return (
            <li
              key={s.id ?? s.label}
              className="relative z-10 flex w-full flex-col items-center text-center"
            >
              <button
                type="button"
                onClick={interactive ? () => onStepChange(stepNumber) : undefined}
                aria-current={isActive ? "step" : undefined}
                aria-label={s.label}
                tabIndex={interactive ? 0 : -1}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border-2 text-lg",
                  interactive && "cursor-pointer",
                  isActive
                    ? "border-transparent bg-gradient text-white shadow-md"
                    : isCompleted
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-border bg-card text-muted-foreground",
                )}
              >
                {isCompleted ? (
                  <LuCheck aria-hidden="true" className="size-5" />
                ) : (
                  stepNumber
                )}
              </button>
              <span
                className={cn(
                  "mt-2 hidden text-xs font-medium sm:block",
                  isActive
                    ? "text-foreground"
                    : isCompleted
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Stepper;
