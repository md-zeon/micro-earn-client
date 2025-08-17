import { useEffect, useState } from "react";
import { LuUsers, LuCoins, LuListTodo, LuCheck } from "react-icons/lu";

const StatsSection = () => {
	const [stats, setStats] = useState({
		totalWorkers: 0,
		totalBuyers: 0,
		totalTasks: 0,
		totalCoins: 0,
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/stats`);
				const data = await response.json();
				setStats({ ...data });
			} catch (error) {
				console.error("Failed to fetch stats:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	const statItems = [
		{
			icon: <LuUsers className='text-3xl text-accent' />,
			label: "Active Workers",
			value: stats.totalWorkers,
			suffix: "+",
		},
		{
			icon: <LuListTodo className='text-3xl text-accent' />,
			label: "Tasks Completed",
			value: stats.totalTasks,
			suffix: "+",
		},
		{
			icon: <LuCoins className='text-3xl text-accent' />,
			label: "Coins Earned",
			value: stats.totalCoins,
			suffix: "+",
		},
		{
			icon: <LuCheck className='text-3xl text-accent' />,
			label: "Satisfied Buyers",
			value: stats.totalBuyers,
			suffix: "+",
		},
	];

	return (
		<section className='py-16 bg-base-100'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl md:text-4xl font-bold text-center mb-3 text-gradient'>Our Community in Numbers</h2>
				<p className='text-center text-base text-gray-500 mb-12 max-w-2xl mx-auto'>
					Join thousands of users who are already earning and getting work done on MicroEarn.
				</p>

				<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
					{statItems.map((item, index) => (
						<div
							key={index}
							className='bg-base-200 p-6 rounded-2xl shadow text-center'
							data-aos='fade-up'
							data-aos-delay={index * 100}
						>
							<div className='flex justify-center mb-3'>{item.icon}</div>
							<h3 className='text-2xl font-bold mb-1'>
								{loading ? (
									<div className='skeleton h-6 w-16 mx-auto rounded'></div>
								) : (
									`${item.value.toLocaleString()}${item.suffix}`
								)}
							</h3>
							<p className='text-sm text-gray-600'>{item.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default StatsSection;
