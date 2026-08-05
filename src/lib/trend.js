const computeTrend = (series, key) => {
  if (!Array.isArray(series) || series.length < 2) return undefined;
  const withData = series.filter((d) => Number(d?.[key] || 0) > 0);
  if (withData.length < 2) return undefined;
  const current = Number(withData[withData.length - 1]?.[key] || 0);
  const previous = Number(withData[withData.length - 2]?.[key] || 0);
  if (previous === 0) return undefined;
  const pct = Math.round(((current - previous) / previous) * 100);
  return { pct: Math.abs(pct), up: pct >= 0 };
};

export default computeTrend;
