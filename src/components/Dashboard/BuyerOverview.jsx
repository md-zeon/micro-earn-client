import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useChartTheme } from "@/hooks/useChartTheme";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import useBuyerTasks from "@/hooks/useBuyerTasks";
import useBuyerTaskStats from "@/hooks/useBuyerTaskStats";
import useBuyerPaymentStats from "@/hooks/useBuyerPaymentStats";
import ChartTooltip from "@/components/Dashboard/ChartTooltip";
import { ChartEmpty, ChartLoading } from "@/components/Dashboard/ChartStates";
import { PieChart as PieChartIcon, TrendingUp } from "lucide-react";

const BuyerOverview = () => {
  const chart = useChartTheme();
  const reducedMotion = usePrefersReducedMotion();
  const { tasks, isTasksLoading } = useBuyerTasks();
  const { taskStats, isLoading: taskLoading } = useBuyerTaskStats();
  const { paymentStats, isLoading: paymentLoading } = useBuyerPaymentStats();

  const activeTasks = tasks.filter((t) => t.status === "active").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  const pieData =
    taskStats.length > 0
      ? taskStats
      : [
          { name: "Active", value: activeTasks },
          { name: "Completed", value: completedTasks },
        ];
  const hasPieData = pieData.some((d) => (d.value || 0) > 0);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Task distribution */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="size-4 text-primary" aria-hidden="true" />
            Task Distribution
          </CardTitle>
          <CardDescription>
            Breakdown of your active vs completed tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          {taskLoading || isTasksLoading ? (
            <ChartLoading />
          ) : !hasPieData ? (
            <ChartEmpty message="Create your first task to see the breakdown here." />
          ) : (
            <>
              <div
                className="h-72"
                role="img"
                aria-label={`Task distribution chart. ${pieData
                  .map((d) => `${d.name}: ${d.value ?? 0}`)
                  .join(", ")}.`}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={3}
                      dataKey="value"
                      nameKey="name"
                      strokeWidth={2}
                      isAnimationActive={!reducedMotion}
                    >
                      {pieData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={chart.colors[index % chart.colors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip chart={chart} />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{
                        fontSize: 12,
                        color: chart.axis,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <table className="sr-only">
                <caption>Task distribution</caption>
                <thead>
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {pieData.map((entry) => (
                    <tr key={entry.name}>
                      <td>{entry.name}</td>
                      <td>{entry.value ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </CardContent>
      </Card>

      {/* Payments over time */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" aria-hidden="true" />
            Payments Over Time
          </CardTitle>
          <CardDescription>
            Your monthly coin purchase spend
          </CardDescription>
        </CardHeader>
        <CardContent>
          {paymentLoading ? (
            <ChartLoading />
          ) : !paymentStats.length ? (
            <ChartEmpty message="Purchase coins to start tracking your spending." />
          ) : (
            <>
              <div
                className="h-72"
                role="img"
                aria-label="Payments over time chart showing your monthly coin purchase spend."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={paymentStats}
                    margin={{ top: 8, right: 12, bottom: 0, left: -18 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={chart.grid}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: chart.axis }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: chart.axis }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip content={<ChartTooltip chart={chart} />} />
                    <Line
                      type="monotone"
                      dataKey="payments"
                      name="Spend"
                      stroke={chart.colors[0]}
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: chart.colors[0] }}
                      activeDot={{ r: 5 }}
                      className="drop-shadow-sm"
                      isAnimationActive={!reducedMotion}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <table className="sr-only">
                <caption>Payments over time</caption>
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Spend</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentStats.map((entry) => (
                    <tr key={entry.name}>
                      <td>{entry.name}</td>
                      <td>${entry.payments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerOverview;
