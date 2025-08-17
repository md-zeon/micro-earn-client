import { useEffect, useState } from "react";
import GlassCard from "../ui/GlassCard";
import { LuCoins, LuCalendar, LuUser } from "react-icons/lu";
import axios from "axios";

const FeaturedTasks = () => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFeaturedTasks = async () => {
			try {
				const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks?limit=6`);
				setTasks(res.data);
			} catch (error) {
				console.error("Failed to fetch featured tasks:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchFeaturedTasks();
	}, []);

	return (
		<section className='py-16 bg-base-100'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl md:text-4xl font-bold text-center mb-3 text-gradient'>Featured Tasks</h2>
				<p className='text-center text-base text-gray-500 mb-12 max-w-2xl mx-auto'>
					Discover the most popular tasks available right now. Start earning coins today!
				</p>

				{loading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className='bg-base-200 p-6 h-[320px] flex flex-col justify-between rounded-2xl shadow'
							>
								<div>
									{/* Title + Badge */}
									<div className='flex justify-between items-center mb-2'>
										<div className='h-6 w-2/3 rounded-md skeleton'></div>
										<div className='h-6 w-16 rounded-md skeleton'></div>
									</div>

									{/* Description */}
									<div className='h-4 w-full mb-2 rounded-md skeleton'></div>
									<div className='h-4 w-3/4 rounded-md skeleton'></div>

									{/* Info Row */}
									<div className='flex gap-4 mt-3'>
										<div className='h-4 w-20 rounded-md skeleton'></div>
										<div className='h-4 w-24 rounded-md skeleton'></div>
									</div>
								</div>

								{/* Footer with button */}
								<div className='flex justify-between items-center mt-4'>
									<div className='h-4 w-24 rounded-md skeleton'></div>
									<div className='h-8 w-20 rounded-full skeleton'></div>
								</div>
							</div>
						))}
					</div>
				) : tasks.length === 0 ? (
					<div className='text-center'>
						<p className='mt-4 text-sm opacity-60'>No featured tasks available</p>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{tasks.map((task, i) => (
							<div
								key={task._id}
								data-aos='fade-up'
								data-aos-delay={100 + i * 100}
							>
								<GlassCard className='bg-base-200 p-6 h-full rounded-2xl shadow hover:shadow-lg transition duration-300'>
									<div className="flex flex-col" >
										<div className="flex-1">
											<div className='flex justify-between items-start mb-3'>
												<h3 className='text-lg font-semibold'>{task.task_title}</h3>
												<span className='badge bg-gradient'>
													{task.payable_amount} <LuCoins className='inline ml-1' />
												</span>
											</div>

											<p className='text-sm text-gray-600 mb-4 line-clamp-2'>{task.task_detail}</p>

											<div className='flex flex-wrap gap-2 mb-4'>
												<div className='flex items-center text-sm text-gray-600'>
													<LuUser className='mr-1' />
													<span>{task.required_workers} workers</span>
												</div>
												<div className='flex items-center text-sm text-gray-600'>
													<LuCalendar className='mr-1' />
													<span>{new Date(task.completion_deadline).toLocaleDateString()}</span>
												</div>
											</div>
										</div>
										<div className='flex justify-between items-center mt-4'>
											<span className='text-xs text-gray-500'>Posted by: {task.buyer_name}</span>
											<button className='btn btn-sm bg-gradient'>See More</button>
										</div>
									</div>
								</GlassCard>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default FeaturedTasks;
