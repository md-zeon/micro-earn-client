import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Banknote,
  FileText,
  Receipt,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useChartTheme } from "../../hooks/useChartTheme";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import useAdminCharts from "../../hooks/useAdminCharts";
import ChartTooltip from "./ChartTooltip";
import { ChartEmpty } from "./ChartStates";

const DEFAULT_USER_COLORS = ["#10b981", "#38bdf8"];

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

const EmptyChart = ({ message }) => (
  <div className="flex h-72 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
    {message}
  </div>
);

const AdminOverview = () => {
  const {
    taskStats,
    userStats,
    revenueData,
    withdrawalData,
    topTasks,
    isLoading,
  } = useAdminCharts();
  const chart = useChartTheme();
  const reducedMotion = usePrefersReducedMotion();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <OverviewChartSkeleton />
        <OverviewChartSkeleton />
        <OverviewChartSkeleton />
        <OverviewChartSkeleton />
      </div>
    );
  }

  const hasUserData = (userStats ?? []).some((item) => item.value > 0);
  const hasTaskData = (taskStats ?? []).length > 0;
  const hasRevenueData = (revenueData ?? []).some((d) => Number(d.revenue) > 0);
  const hasWithdrawalData = (withdrawalData ?? []).some((d) => Number(d.payout) > 0);

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
            <>
              <div className="h-72" role="img" aria-label="User distribution by role">
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
                      isAnimationActive={!reducedMotion}
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
                    <Tooltip content={<ChartTooltip chart={chart} />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <table className="sr-only">
                <caption>User distribution</caption>
                <thead>
                  <tr>
                    <th scope="col">Role</th>
                    <th scope="col">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {userStats.map((entry) => (
                    <tr key={entry.name}>
                      <td>{entry.name}</td>
                      <td>{entry.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <EmptyChart message="No user data available yet." />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-4 text-muted-foreground" aria-hidden="true" />
            Tasks Created per Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasTaskData ? (
            <>
              <div
                className="h-72"
                role="img"
                aria-label="Tasks created per month"
              >
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
                    <Tooltip content={<ChartTooltip chart={chart} />} />
                    <Bar
                      dataKey="tasks"
                      name="Tasks"
                      fill={chart.colors[0]}
                      radius={[6, 6, 0, 0]}
                      maxBarSize={48}
                      isAnimationActive={!reducedMotion}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <table className="sr-only">
                <caption>Tasks created per month</caption>
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Tasks</th>
                  </tr>
                </thead>
                <tbody>
                  {taskStats.map((entry) => (
                    <tr key={entry.name}>
                      <td>{entry.name}</td>
                      <td>{entry.tasks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <EmptyChart message="No task data available yet." />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="size-4 text-muted-foreground" aria-hidden="true" />
            Revenue Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasRevenueData ? (
            <>
              <div
                className="h-72"
                role="img"
                aria-label="Revenue over time chart showing monthly payment totals."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 8, right: 8, bottom: 0, left: -12 }}
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
                      tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip content={<ChartTooltip chart={chart} />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke={chart.colors[0]}
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: chart.colors[0] }}
                      activeDot={{ r: 5 }}
                      isAnimationActive={!reducedMotion}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <table className="sr-only">
                <caption>Revenue over time</caption>
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueData.map((entry) => (
                    <tr key={entry.name}>
                      <td>{entry.name}</td>
                      <td>${entry.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <EmptyChart message="No payment data available yet." />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="size-4 text-muted-foreground" aria-hidden="true" />
            Withdrawals per Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasWithdrawalData ? (
            <>
              <div
                className="h-72"
                role="img"
                aria-label="Withdrawals per month chart showing approved payout totals."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={withdrawalData}
                    margin={{ top: 8, right: 8, bottom: 0, left: -16 }}
                    aria-label="Withdrawals per month"
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
                      tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip content={<ChartTooltip chart={chart} />} />
                    <Bar
                      dataKey="payout"
                      name="Payouts"
                      fill={chart.colors[1]}
                      radius={[6, 6, 0, 0]}
                      maxBarSize={48}
                      isAnimationActive={!reducedMotion}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <table className="sr-only">
                <caption>Withdrawals per month</caption>
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Payouts</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawalData.map((entry) => (
                    <tr key={entry.name}>
                      <td>{entry.name}</td>
                      <td>${entry.payout}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <EmptyChart message="No withdrawal data available yet." />
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="size-4 text-muted-foreground" aria-hidden="true" />
            Top Tasks by Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topTasks.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              No submissions yet — top tasks will appear here.
            </div>
          ) : (
            <ul className="divide-y divide-border/60">
              {topTasks.map((task, index) => (
                <li
                  key={task._id}
                  className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {task.task_title}
                  </span>
                  <Badge
                    variant="secondary"
                    className="shrink-0 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  >
                    <Receipt className="mr-1 size-3" aria-hidden="true" />
                    {task.submissions} submissions
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
