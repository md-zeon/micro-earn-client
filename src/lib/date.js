const formatter = (options) => new Intl.DateTimeFormat("en-US", options);

export const formatDate = (
  date,
  options = { month: "short", day: "numeric", year: "numeric" },
) => {
  if (!date) return "—";
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? "—" : formatter(options).format(d);
};

export const formatDateTime = (date) =>
  formatDate(date, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

export const timeAgo = (date) => {
  if (!date) return "—";
  const then = new Date(date).getTime();
  if (Number.isNaN(then)) return "—";
  const seconds = Math.round((then - Date.now()) / 1000);
  const abs = Math.abs(seconds);
  if (abs < 60) return rtf.format(seconds, "second");
  if (abs < 3600) return rtf.format(Math.round(seconds / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(seconds / 3600), "hour");
  if (abs < 86400 * 30) return rtf.format(Math.round(seconds / 86400), "day");
  if (abs < 86400 * 365)
    return rtf.format(Math.round(seconds / (86400 * 30)), "month");
  return rtf.format(Math.round(seconds / (86400 * 365)), "year");
};

export const getDeadlineInfo = (deadline) => {
  const due = new Date(deadline);
  if (Number.isNaN(due.getTime()))
    return { days: NaN, label: "", className: "", endingSoon: false };
  const days = Math.ceil((due.getTime() - Date.now()) / 86400000);
  if (days < 0)
    return { days, label: "Expired", className: "text-muted-foreground", endingSoon: false };
  if (days <= 2)
    return {
      days,
      label: days === 1 ? "1 day left" : `${days} days left`,
      className: "text-rose-500",
      endingSoon: true,
    };
  if (days <= 7)
    return { days, label: `${days} days left`, className: "text-amber-500", endingSoon: false };
  return {
    days,
    label: `${days} days left`,
    className: "text-emerald-600 dark:text-emerald-400",
    endingSoon: false,
  };
};
