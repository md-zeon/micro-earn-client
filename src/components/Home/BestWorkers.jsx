import { useEffect, useState } from "react";
import { LuCoins } from "react-icons/lu";
import axios from "axios";
import GlassCard from "../ui/GlassCard";

const BestWorkers = () => {
	const [workers, setWorkers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getTopWorkers = async () => {
			try {
				const res = await axios.get(`${import.meta.env.VITE_API_URL}/top-workers`);
				// console.log(res.data);
				setWorkers(res.data);
			} catch (error) {
				console.error("Failed to fetch top workers:", error);
			} finally {
				setLoading(false);
			}
		};
		getTopWorkers();
	}, []);

	return (
		<section className='py-16 bg-base-100'>
			<div className='container mx-auto px-4'>
				<h2
					className='text-3xl md:text-4xl font-bold text-center mb-3 text-gradient'
					data-aos='fade-up'
				>
					Top Performing Workers
				</h2>
				<p
					className='text-center text-base text-gray-500 mb-12 max-w-2xl mx-auto'
					data-aos='fade-up'
				>
					Meet our highest-rated workers who consistently deliver top-quality results and earn the most coins on the
					platform.
				</p>

				{loading ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className='bg-base-200 p-6 rounded-2xl shadow'
								data-aos='zoom-in'
								data-aos-delay={i * 100}
							>
								<div className='flex flex-col items-center gap-4'>
									<div className='w-24 h-24 rounded-full skeleton' />
									<div className='w-32 h-4 rounded-md skeleton' />
									<div className='w-24 h-4 rounded-md skeleton' />
								</div>
							</div>
						))}
					</div>
				) : workers.length === 0 ? (
					<div className='text-center'>
						<p className='mt-4 text-sm opacity-60'>No workers found</p>
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
						{workers.map((worker, i) => (
							<GlassCard
								key={worker._id}
								className='bg-base-200 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300'
								data-aos='zoom-in'
								data-aos-delay={i * 100}
							>
								<div className='flex flex-col items-center text-center gap-3'>
									<img
										src={worker.photoURL}
										alt={worker.name}
										className='w-24 h-24 rounded-full object-cover border-4 border-accent'
										referrerPolicy="no-referrer"
									/>
									<h3 className='text-lg font-semibold'>{worker.name}</h3>
									<p className='flex items-center gap-1 text-green-600 font-medium'>
										<LuCoins className='text-xl' />
										<span className='text-gradient'>{worker.microCoins} Coins</span>
									</p>
								</div>
							</GlassCard>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default BestWorkers;
