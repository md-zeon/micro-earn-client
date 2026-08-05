import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	LineChart,
	Line,
} from "recharts";
import useWorkerSubmissions from "../../hooks/useWorkerSubmissions";
import useWorkerStats from "../../hooks/useWorkerStats";
import { useChartTheme } from "../../hooks/useChartTheme";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import ChartTooltip from "./ChartTooltip";
import { ChartEmpty, ChartLoading } from "./ChartStates";

const WorkerOverview = () => {
	const { submissions } = useWorkerSubmissions();
	const { earningsData, submissionStats, isLoading } = useWorkerStats();
	const chart = useChartTheme();
	const reducedMotion = usePrefersReducedMotion();

	const pending = submissions?.filter((s) => s.status === "pending").length ?? 0;
	const approved = submissions?.filter((s) => s.status === "approved").length ?? 0;
	const rejected = submissions?.filter((s) => s.status === "rejected").length ?? 0;

	const pieData = submissionStats.length > 0 ? submissionStats : [
		{ name: "Approved", value: approved },
		{ name: "Pending", value: pending },
		{ name: "Rejected", value: rejected },
	];

	const total = pieData.reduce((sum, d) => sum + (d.value ?? 0), 0);
	const pieSummary = pieData
		.map((d) => `${d.name}: ${d.value ?? 0}`)
		.join(", ");

	const completionRate = total > 0 ? Math.round((approved / total) * 100) : 0;
	const hasEarnings = earningsData.some((d) => Number(d.earnings) > 0);
	const bestMonth = hasEarnings
		? earningsData.reduce((max, d) =>
				Number(d.earnings) > Number(max.earnings) ? d : max,
			)
		: null;

	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Submission Distribution</CardTitle>
					<CardDescription>
						Overview of your submissions by review status.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<ChartLoading />
					) : total === 0 ? (
						<ChartEmpty message="Submit tasks to see your status breakdown here." />
					) : (
						<>
							<div
								className="h-72"
								role="img"
								aria-label={`Submission distribution chart. ${pieSummary}.`}
							>
								<ResponsiveContainer
									width="100%"
									height="100%"
								>
									<PieChart>
										<Pie
											data={pieData}
											cx="50%"
											cy="50%"
											outerRadius={90}
											innerRadius={50}
											dataKey="value"
											paddingAngle={2}
											label={({ name, percent }) =>
												total > 0 && percent > 0
													? `${name}: ${(percent * 100).toFixed(0)}%`
													: ""
											}
											isAnimationActive={!reducedMotion}
										>
											{pieData.map((entry, index) => (
												<Cell
													key={entry.name}
													fill={
														chart.colors[index % chart.colors.length] ??
														"hsl(var(--muted-foreground))"
													}
												/>
											))}
										</Pie>
										<Tooltip content={<ChartTooltip chart={chart} />} />
									</PieChart>
								</ResponsiveContainer>
							</div>
							<table className="sr-only">
								<caption>Submission distribution</caption>
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
											<td>{entry.value}</td>
										</tr>
									))}
								</tbody>
							</table>
						</>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Earnings Over Time</CardTitle>
					<CardDescription>
						Your approved earnings trend across months.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<ChartLoading />
					) : !hasEarnings ? (
						<ChartEmpty message="Approved submissions will appear here as earnings." />
					) : (
						<>
							<div
								className="h-72"
								role="img"
								aria-label="Earnings over time chart showing monthly approved earnings."
							>
								<ResponsiveContainer
									width="100%"
									height="100%"
								>
									<LineChart data={earningsData}>
										<CartesianGrid
											strokeDasharray="3 3"
											stroke={chart.grid}
											vertical={false}
										/>
										<XAxis
											dataKey="name"
											tick={{ fontSize: 12, fill: chart.axis }}
											tickLine={false}
											axisLine={false}
											stroke="currentColor"
										/>
										<YAxis
											tick={{ fontSize: 12, fill: chart.axis }}
											tickLine={false}
											axisLine={false}
											stroke="currentColor"
										/>
										<Tooltip content={<ChartTooltip chart={chart} />} />
										<Line
											type="monotone"
											dataKey="earnings"
											stroke={chart.colors[0]}
											strokeWidth={3}
											dot={{ r: 4, fill: chart.colors[0] }}
											activeDot={{ r: 6 }}
											isAnimationActive={!reducedMotion}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
							<table className="sr-only">
								<caption>Earnings over time</caption>
								<thead>
									<tr>
										<th scope="col">Month</th>
										<th scope="col">Earnings</th>
									</tr>
								</thead>
								<tbody>
									{earningsData.map((entry) => (
										<tr key={entry.name}>
											<td>{entry.name}</td>
											<td>{entry.earnings}</td>
										</tr>
									))}
								</tbody>
							</table>
						</>
					)}
				</CardContent>
			</Card>

			<Card className="lg:col-span-2">
				<CardHeader>
					<CardTitle>Completion Rate</CardTitle>
					<CardDescription>
						How many of your submissions get approved.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<ChartLoading />
					) : total === 0 ? (
						<ChartEmpty message="Submit tasks to start tracking your completion rate." />
					) : (
						<div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
							<div
								className="relative flex size-40 items-center justify-center rounded-full"
								style={{
									background: `conic-gradient(${chart.colors[0]} ${completionRate * 3.6}deg, ${chart.grid} 0deg)`,
								}}
								role="img"
								aria-label={`Completion rate ${completionRate}%`}
							>
								<div className="flex size-28 flex-col items-center justify-center rounded-full bg-card shadow-inner">
									<span className="text-3xl font-bold tracking-tight tabular-nums">
										{completionRate}%
									</span>
									<span className="text-xs text-muted-foreground">
										approved
									</span>
								</div>
							</div>
							<div className="text-center sm:text-left">
								<p className="text-sm text-muted-foreground">
									<strong className="font-semibold text-foreground">
										{approved}
									</strong>{" "}
									of{" "}
									<strong className="font-semibold text-foreground">
										{total}
									</strong>{" "}
									submissions approved
								</p>
								{bestMonth && (
									<p className="mt-2 text-sm text-muted-foreground">
										Best month:{" "}
										<strong className="font-semibold text-foreground">
											{bestMonth.name}
										</strong>{" "}
										({bestMonth.earnings} coins)
									</p>
								)}
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default WorkerOverview;
