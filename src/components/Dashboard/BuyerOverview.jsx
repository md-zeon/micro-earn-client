import { useEffect, useState } from "react";
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import useBuyerTasks from "../../hooks/useBuyerTasks";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BuyerOverview = () => {
	const { tasks } = useBuyerTasks();
	const axiosSecure = useAxiosSecure();
	const [taskStats, setTaskStats] = useState([]);
	const [paymentData, setPaymentData] = useState([]); // ✅ added missing state
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTaskStats = async () => {
			try {
				// Fetch task statistics
				const statsRes = await axiosSecure.get("/buyer/task-stats");
				setTaskStats(statsRes.data);

				// Fetch payment data
				const paymentRes = await axiosSecure.get("/buyer/payment-stats");
				setPaymentData(paymentRes.data);
			} catch (error) {
				console.error("Failed to fetch buyer dashboard data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTaskStats();
	}, [axiosSecure]);

	// Calculate fallback stats from local tasks
	const activeTasks = tasks.filter((task) => task.status === "active").length;
	const completedTasks = tasks.filter((task) => task.status === "completed").length;

	// Final dataset → prefer API, fallback to local
	const pieData =
		taskStats.length > 0
			? taskStats
			: [
					{ name: "Active", value: activeTasks },
					{ name: "Completed", value: completedTasks },
			  ];

	const COLORS = ["#0088FE", "#00C49F"];

	return (
		<div className='space-y-8'>
			<h2 className='text-2xl font-bold'>Task Overview</h2>

			{/* Charts */}
			<div className='grid grid-cols-1 gap-8'>
				{/* Task Distribution */}
				<div className='bg-base-200 p-6 rounded-xl'>
					<h3 className='text-xl font-semibold mb-4'>Task Distribution</h3>
					<div className='h-80'>
						{loading ? (
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
										fill='#8884d8'
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
			</div>
		</div>
	);
};

export default BuyerOverview;
