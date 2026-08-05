import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FileText, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useChartTheme } from "../../hooks/useChartTheme";
import useAdminCharts from "../../hooks/useAdminCharts";

const DEFAULT_USER_COLORS = ["#10b981", "#38bdf8"];

const ChartTooltip = ({ active, payload, label, colors }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-foreground">
        {label ?? payload[0]?.name}
      </p>
      {payload.map((entry, index) => (
        <div key={entry.dataKey ?? entry.name} className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-2 rounded-full"
            style={{ background: entry.color ?? colors[index % colors.length] }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-semibold tabular-nums text-foreground">
            {entry.value?.toLocaleString?.() ?? entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const OverviewChartSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-5 w-40" />
    </CardHeader>
    <CardContent className="h-72">
      <Skeleton className="h-full w-full rounded-lg" />
    </CardContent>
  </Card>
);

const AdminOverview = () => {
  const { taskStats, userStats, isLoading } = useAdminCharts();
  const chart = useChartTheme();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <OverviewChartSkeleton />
        <OverviewChartSkeleton />
      </div>
    );
  }

  const hasUserData = (userStats ?? []).some((item) => item.value > 0);
  const hasTaskData = (taskStats ?? []).length > 0;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-4 text-muted-foreground" aria-hidden="true" />
            User Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasUserData ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={userStats}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={56}
                    outerRadius={86}
                    paddingAngle={3}
                    strokeWidth={0}
                    aria-label="User distribution by role"
                  >
                    {userStats.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          chart.colors[index % chart.colors.length] ??
                          DEFAULT_USER_COLORS[index % DEFAULT_USER_COLORS.length]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={<ChartTooltip colors={chart.colors} />}
                    cursor={{ fill: "transparent" }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-72 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              No user data available yet.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-4 text-muted-foreground" aria-hidden="true" />
            Tasks Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasTaskData ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={taskStats}
                  margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
                  aria-label="Tasks created per month"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: chart.axis }}
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: chart.axis }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    content={<ChartTooltip colors={chart.colors} />}
                    cursor={{ fill: "transparent" }}
                  />
                  <Bar
                    dataKey="tasks"
                    name="Tasks"
                    fill={chart.colors[0]}
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-72 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              No task data available yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
