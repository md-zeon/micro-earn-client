import { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useAdminStats from "../../hooks/useAdminStats";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminOverview = () => {
	const { adminStats: stats } = useAdminStats();
	const axiosSecure = useAxiosSecure();
	const [taskData, setTaskData] = useState([]);
	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				// Fetch task statistics
				const taskRes = await axiosSecure.get("/admin/task-stats");
				setTaskData(taskRes.data);

				// Fetch user statistics
				const userRes = await axiosSecure.get("/admin/user-stats");
				setUserData(userRes.data);
			} catch (error) {
				console.error("Failed to fetch dashboard data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardData();
	}, [axiosSecure]);

	// fallback mock data if API fails
	const pieData =
		userData.length > 0
			? userData
			: [
					{ name: "Workers", value: stats?.totalWorkers || 1200 },
					{ name: "Buyers", value: stats?.totalBuyers || 350 },
			  ];

	const COLORS = ["#0088FE", "#00C49F"];

	return (
		<div className='space-y-8'>
			{/* Charts */}
			<div className='grid grid-cols-1 gap-8'>
				{/* User Distribution */}
				<div className='bg-base-200 p-6 rounded-xl'>
					<h3 className='text-xl font-semibold mb-4'>User Distribution</h3>
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

export default AdminOverview;
