import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { LuHandCoins } from "react-icons/lu";

const Preloader = ({ onComplete }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				const next = prev + 2;
				if (next >= 100) {
					clearInterval(interval);
					setTimeout(onComplete, 500);
				}
				return next;
			});
		}, 40); // adjust speed

		return () => clearInterval(interval);
	}, [onComplete]);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 1 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { duration: 0.5 } }}
				className='fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base-100'
			>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.6, ease: "easeInOut" }}
					className='text-4xl font-extrabold tracking-wide mb-8'
				>
					<LuHandCoins className='text-6xl bg-gradient rounded-xl p-3 mx-auto' />
					MicroEarn
				</motion.div>

				<div className='w-64 h-2 bg-gray-300 rounded-full overflow-hidden'>
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ ease: "easeOut", duration: 0.3 }}
						className='h-full bg-gradient'
					/>
				</div>

				<div className='text-sm text-gray-500 mt-2'>{progress}%</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Preloader;
