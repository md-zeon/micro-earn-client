import { useEffect, useState } from "react";
import { LuCoins, LuUserPlus, LuMegaphone, LuDollarSign, LuCheck } from "react-icons/lu";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const iconMap = {
	complete: <LuCoins className='text-green-500' />,
	newTask: <LuMegaphone className='text-blue-500' />,
	join: <LuUserPlus className='text-purple-500' />,
	withdraw: <LuDollarSign className='text-orange-500' />,
	approve: <LuCheck className='text-yellow-500' />,
};

const LiveFeed = () => {
	const [feed, setFeed] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		AOS.init({ once: true });

		const fetchActivities = async () => {
			try {
				const { data } = await axios(`${import.meta.env.VITE_API_URL}/recent-activities`);
				setFeed(data);
			} catch (error) {
				console.error("Error fetching activities:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchActivities();
	}, []);

	return (
		<section
			className='my-16'
			data-aos='fade-up'
		>
			<div className='max-w-5xl mx-auto text-center'>
				<h2 className='text-3xl font-bold mb-8 text-neutral'>Recent Activity on MicroEarn</h2>

				<div className='bg-base-200 rounded-xl text-base-content p-6 shadow-sm'>
					{loading ? (
						<ul className='space-y-4'>
							{Array.from({ length: 5 }).map((_, i) => (
								<li key={i} className='flex items-start gap-3 animate-pulse'>
									<div className='skeleton w-6 h-6 rounded-full'></div>
									<div className='flex-1 space-y-2'>
										<div className='skeleton h-4 w-3/4'></div>
									</div>
								</li>
							))}
						</ul>
					) : feed.length === 0 ? (
						<p className='text-center text-gray-500'>No recent activities.</p>
					) : (
						<ul className='space-y-4 text-left'>
							{feed.map((item, idx) => (
								<li
									key={idx}
									className='flex items-start gap-3 hover:bg-base-300 p-2 rounded-lg transition'
								>
									<span className='text-xl mt-1'>{iconMap[item.type]}</span>
									<span>{item.text}</span>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</section>
	);
};

export default LiveFeed;
