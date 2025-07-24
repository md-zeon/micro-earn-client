import { Container } from "@radix-ui/themes/dist/cjs/index.js";
import { motion } from "motion/react";
import { Link } from "react-router";

const Hero = () => {
	return (
		<div className='relative h-[500px] w-full overflow-hidden bg-gray-900'>
			{/* Background Video */}
			<video
				className='absolute inset-0 w-full h-full object-cover pointer-events-none'
				src='https://www.shutterstock.com/shutterstock/videos/1060923829/preview/stock-footage-alternative-macro-close-up-of-an-young-businessman-hands-busy-working-on-laptop-or-computer.mp4'
				autoPlay
				loop
				muted
				playsInline
				aria-hidden='true'
			/>

			{/* Dark Overlay */}
			<div className='absolute inset-0 bg-black/50 z-10 backdrop-blur-sm'></div>

			{/* Content */}
			<div className='relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4'>
				<motion.h1
					initial={{ opacity: 0, y: -40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9, ease: "easeOut" }}
					className='text-4xl md:text-6xl font-extrabold tracking-tight mb-5 drop-shadow-lg'
				>
					Empower Your Efforts, Earn Your Rewards
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
					className='text-lg md:text-xl max-w-3xl mb-10 leading-relaxed text-gray-200'
				>
					Join a community of doers. Complete micro-tasks from trusted buyers and watch your earnings grow. Simple,
					fast, and reliable.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.6 }}
				>
					<Link to='/register'>
						<button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-full text-lg transition-transform duration-300 transform hover:scale-105 shadow-md'>
							Start Earning Now
						</button>
					</Link>
				</motion.div>
			</div>
		</div>
	);
};

export default Hero;
