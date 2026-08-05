import { useMemo, useSyncExternalStore } from "react";

const CSS_VARS = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"];

function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  window.addEventListener("storage", callback);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Reads the chart color tokens from the active CSS theme so Recharts
 * automatically follows light/dark mode (also reacts to class changes
 * on <html> via MutationObserver).
 */
export function useChartTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "light");

  return useMemo(() => {
    const styles = getComputedStyle(document.documentElement);
    const colors = CSS_VARS.map((v) => styles.getPropertyValue(v).trim());
    const isDark = theme === "dark";

    return {
      theme,
      colors,
      axis: isDark ? "oklch(0.72 0.008 200)" : "oklch(0.55 0.012 200)",
      grid: isDark ? "oklch(1 0 0 / 0.08)" : "oklch(0.92 0.005 200)",
      tooltipBg: isDark ? "oklch(0.2 0.007 200)" : "oklch(1 0 0)",
      tooltipBorder: isDark ? "oklch(1 0 0 / 12%)" : "oklch(0.92 0.005 200)",
      tooltipText: isDark ? "oklch(0.96 0.004 200)" : "oklch(0.21 0.01 200)",
    };
  }, [theme]);
}
