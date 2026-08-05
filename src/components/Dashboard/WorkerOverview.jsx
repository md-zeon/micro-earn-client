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
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const CHART_COLORS = {
	approved: "#10b981",
	pending: "#f59e0b",
	rejected: "#ef4444",
};

const WorkerOverview = () => {
	const { submissions } = useWorkerSubmissions();
	const { earningsData, submissionStats, isLoading } = useWorkerStats();

	const pending = submissions?.filter((s) => s.status === "pending").length ?? 0;
	const approved = submissions?.filter((s) => s.status === "approved").length ?? 0;
	const rejected = submissions?.filter((s) => s.status === "rejected").length ?? 0;

	const pieData = submissionStats.length > 0 ? submissionStats : [
		{ name: "Approved", value: approved },
		{ name: "Pending", value: pending },
		{ name: "Rejected", value: rejected },
	];

	const total = pieData.reduce((sum, d) => sum + (d.value ?? 0), 0);

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
						<Skeleton className="h-72 w-full" />
					) : (
						<div className="h-72">
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
										isAnimationActive={true}
									>
										{pieData.map((entry) => (
											<Cell
												key={entry.name}
												fill={CHART_COLORS[entry.name?.toLowerCase()] ?? "#94a3b8"}
											/>
										))}
									</Pie>
									<Tooltip
										contentStyle={{
											borderRadius: "0.75rem",
											fontSize: "0.875rem",
										}}
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>
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
						<Skeleton className="h-72 w-full" />
					) : (
						<div className="h-72">
							<ResponsiveContainer
								width="100%"
								height="100%"
							>
								<LineChart data={earningsData}>
									<CartesianGrid
										strokeDasharray="3 3"
										className="stroke-border"
									/>
									<XAxis
										dataKey="name"
										tick={{ fontSize: 12 }}
										tickLine={false}
										axisLine={false}
										stroke="currentColor"
										className="text-muted-foreground"
									/>
									<YAxis
										tick={{ fontSize: 12 }}
										tickLine={false}
										axisLine={false}
										stroke="currentColor"
										className="text-muted-foreground"
									/>
									<Tooltip
										contentStyle={{
											borderRadius: "0.75rem",
											fontSize: "0.875rem",
										}}
									/>
									<Line
										type="monotone"
										dataKey="earnings"
										stroke="#10b981"
										strokeWidth={3}
										dot={{ r: 4 }}
										activeDot={{ r: 6 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default WorkerOverview;
