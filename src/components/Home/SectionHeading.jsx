import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
