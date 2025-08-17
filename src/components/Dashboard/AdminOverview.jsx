import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
} from "recharts";
import useAdminCharts from "../../hooks/useAdminCharts";

const AdminOverview = () => {
	const { taskStats, userStats, isLoading } = useAdminCharts();
	const COLORS = ["#0088FE", "#00C49F"];

	if (isLoading) return <p>Loading charts...</p>;

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
			{/* User Distribution */}
			<div className='bg-base-200 p-6 rounded-xl'>
				<h3 className='text-xl font-semibold mb-4'>User Distribution</h3>
				<div className='h-80'>
					<ResponsiveContainer
						width='100%'
						height='100%'
					>
						<PieChart>
							<Pie
								data={userStats}
								cx='50%'
								cy='50%'
								outerRadius={100}
								dataKey='value'
								label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
							>
								{userStats.map((_, index) => (
									<Cell
										key={index}
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

			{/* Task Distribution */}
			<div className='bg-base-200 p-6 rounded-xl'>
				<h3 className='text-xl font-semibold mb-4'>Tasks Overview</h3>
				<div className='h-80'>
					<ResponsiveContainer
						width='100%'
						height='100%'
					>
						<BarChart data={taskStats}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='name' />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar
								dataKey='tasks'
								fill='#00C49F'
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default AdminOverview;
