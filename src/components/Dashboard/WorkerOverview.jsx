import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	LineChart,
	Line,
} from "recharts";
import useWorkerSubmissions from "../../hooks/useWorkerSubmissions";
import useWorkerStats from "../../hooks/useWorkerStats";

const WorkerOverview = () => {
	const { submissions } = useWorkerSubmissions();
	const { earningsData, submissionStats } = useWorkerStats();

	// Fallback local stats
	const pending = submissions?.filter((s) => s.status === "pending").length ?? 0;
	const approved = submissions?.filter((s) => s.status === "approved").length ?? 0;
	const rejected = submissions?.filter((s) => s.status === "rejected").length ?? 0;

	const mockSubmissionStats = [
		{ name: "Approved", value: approved },
		{ name: "Pending", value: pending },
		{ name: "Rejected", value: rejected },
	];

	const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

	return (
		<div className='space-y-8'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* 📊 Submission Distribution */}
				<div className='bg-base-200 p-6 rounded-xl shadow'>
					<h3 className='text-xl font-semibold mb-4'>Submission Distribution</h3>
					<div className='h-80'>
						<ResponsiveContainer
							width='100%'
							height='100%'
						>
							<PieChart>
								<Pie
									data={submissionStats.length > 0 ? submissionStats : mockSubmissionStats}
									cx='50%'
									cy='50%'
									outerRadius={90}
									dataKey='value'
									label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
								>
									{(submissionStats.length > 0 ? submissionStats : mockSubmissionStats).map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* 📈 Earnings Over Time */}
				<div className='bg-base-200 p-6 rounded-xl shadow'>
					<h3 className='text-xl font-semibold mb-4'>Earnings Over Time</h3>
					<div className='h-80'>
						<ResponsiveContainer
							width='100%'
							height='100%'
						>
							<LineChart data={earningsData}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='name' />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line
									type='monotone'
									dataKey='earnings'
									stroke='#00C49F'
									strokeWidth={3}
									dot={{ r: 4 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorkerOverview;
