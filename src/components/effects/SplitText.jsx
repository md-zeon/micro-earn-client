import { Fragment, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const SplitText = ({
  segments,
  text,
  splitBy = "words",
  delay = 0,
  duration = 0.9,
  stagger = 0.12,
  className,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  const items = segments
    ? segments
    : text.split(splitBy === "words" ? " " : "").map((t) => ({ text: t }));

  useEffect(() => {
    if (prefersReducedMotion) return;
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {items.map((item, i) => (
          <Fragment key={i}>
            <span className={cn("inline-block pb-1 align-bottom", item.className)}>
              {item.text}
            </span>
            {i < items.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className={cn("inline-block", item.className)}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{
                duration,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {item.text}
            </motion.span>
          </span>
          {i < items.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
};

export default SplitText;
