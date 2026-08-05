import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const CountUp = ({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2.2,
  className,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  const format = (n) => {
    const formatted = Number(n).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${prefix}${formatted}${suffix}`;
  };

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, prefersReducedMotion, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(prefersReducedMotion ? value : display)}
    </span>
  );
};

export default CountUp;
