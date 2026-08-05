import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const SpotlightCard = ({
  children,
  className,
  spotlightClassName,
  spotlightColor = "rgba(16, 185, 129, 0.16)",
}) => {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [finePointer, setFinePointer] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(hover: hover) and (pointer: fine)").matches,
  );
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleChange = () => setFinePointer(mediaQuery.matches);
    mediaQuery.addEventListener?.("change", handleChange);
    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, []);

  const enabled = finePointer && !prefersReducedMotion;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      onMouseMove={enabled ? handleMouseMove : undefined}
      onMouseEnter={enabled ? () => setOpacity(0.6) : undefined}
      onMouseLeave={enabled ? () => setOpacity(0) : undefined}
    >
      {children}
      {enabled && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0",
            spotlightClassName,
          )}
          style={{
            opacity,
            transition: "opacity 500ms cubic-bezier(0.22, 1, 0.36, 1)",
            background: `radial-gradient(480px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
};

export default SpotlightCard;
