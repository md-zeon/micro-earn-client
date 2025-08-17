import {
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Line,
} from "recharts";
import useBuyerTasks from "../../hooks/useBuyerTasks";
import useBuyerTaskStats from "../../hooks/useBuyerTaskStats";
import useBuyerPaymentStats from "../../hooks/useBuyerPaymentStats";

const BuyerOverview = () => {
	const { tasks } = useBuyerTasks();
	const { taskStats, isLoading: taskLoading } = useBuyerTaskStats();
	const { paymentStats, isLoading: paymentLoading } = useBuyerPaymentStats();

	// Local fallback for task stats
	const activeTasks = tasks.filter((task) => task.status === "active").length;
	const completedTasks = tasks.filter((task) => task.status === "completed").length;

	const pieData =
		taskStats.length > 0
			? taskStats
			: [
					{ name: "Active", value: activeTasks },
					{ name: "Completed", value: completedTasks },
			  ];

	const COLORS = ["#0088FE", "#00C49F"];

	return (
		<div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>
			{/* Task Distribution */}
			<div className='bg-base-200 p-6 rounded-xl'>
				<h3 className='text-xl font-semibold mb-4'>Task Distribution</h3>
				<div className='h-80'>
					{taskLoading ? (
						<div className='flex items-center justify-center h-full'>
							<p className='text-sm opacity-70'>Loading chart...</p>
						</div>
					) : (
						<ResponsiveContainer
							width='100%'
							height='100%'
						>
							<PieChart>
								<Pie
									data={pieData}
									cx='50%'
									cy='50%'
									labelLine={false}
									outerRadius={100}
									dataKey='value'
									label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
								>
									{pieData.map((_, index) => (
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
					)}
				</div>
			</div>

			{/* Payments Over Time */}
			<div className='bg-base-200 p-6 rounded-xl'>
				<h3 className='text-xl font-semibold mb-4'>Payments Over Time</h3>
				<div className='h-80'>
					{paymentLoading ? (
						<div className='flex items-center justify-center h-full'>
							<p className='text-sm opacity-70'>Loading chart...</p>
						</div>
					) : (
						<ResponsiveContainer
							width='100%'
							height='100%'
						>
							<LineChart data={paymentStats}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='name' />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line
									type='monotone'
									dataKey='payments'
									stroke='#0088FE'
									strokeWidth={3}
								/>
							</LineChart>
						</ResponsiveContainer>
					)}
				</div>
			</div>
		</div>
	);
};

export default BuyerOverview;
