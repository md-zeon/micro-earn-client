import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const SHOW_THRESHOLD = 400;

const getScrollTarget = (container) => {
  if (!container || container === window) return window;
  return container;
};

const ScrollToTopButton = ({ offset = 0, container }) => {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollTarget = getScrollTarget(container);

  useEffect(() => {
    const getScroll = () =>
      scrollTarget === window
        ? window.scrollY
        : scrollTarget?.scrollTop ?? 0;

    const onScroll = () => setVisible(getScroll() > SHOW_THRESHOLD);
    onScroll();
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollTarget.removeEventListener("scroll", onScroll);
  }, [scrollTarget]);

  const scrollToTop = () => {
    const current =
      scrollTarget === window
        ? window.scrollY
        : scrollTarget?.scrollTop ?? 0;
    const to = { value: current };

    if (prefersReducedMotion) {
      scrollTarget.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    gsap.to(to, {
      value: 0,
      duration: 0.6,
      ease: "power3.out",
      onUpdate() {
        scrollTarget.scrollTo({ top: to.value, behavior: "auto" });
      },
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          className="fixed right-5 bottom-5 z-50 flex size-11 items-center justify-center rounded-full bg-gradient text-white shadow-lg shadow-emerald-500/30"
          style={{ marginBottom: offset }}
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
