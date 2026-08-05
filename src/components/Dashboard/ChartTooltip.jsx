const ChartTooltip = ({ active, payload, label, chart, colors }) => {
  if (!active || !payload?.length) return null;

  const palette = colors ?? chart?.colors ?? [];

  return (
    <div
      className="rounded-lg border px-3 py-2 text-sm shadow-md"
      style={{
        background: chart?.tooltipBg ?? "hsl(var(--popover))",
        borderColor: chart?.tooltipBorder ?? "hsl(var(--border))",
        color: chart?.tooltipText ?? "hsl(var(--popover-foreground))",
      }}
    >
      {label && <p className="mb-1 font-medium">{label}</p>}
      {payload.map((entry, index) => (
        <div key={entry.dataKey ?? entry.name} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-2 rounded-full"
            style={{
              background:
                entry.color ?? entry.payload?.fill ?? palette[index % palette.length],
            }}
          />
          <span className="opacity-70 capitalize">
            {entry.name ?? entry.dataKey}:
          </span>
          <span className="font-semibold tabular-nums">
            {typeof entry.value === "number"
              ? entry.value.toLocaleString()
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChartTooltip;
