import { LuClock, LuListTodo, LuCoins } from "react-icons/lu";
import { motion } from "motion/react";
import illustration from "../../assets/why-choose.svg";

const reasons = [
	{
		icon: <LuClock className='text-4xl text-green-600' />,
		title: "Freedom to Earn Anytime",
		description: "MicroEarn empowers you to work whenever you want. No pressure — just tasks that pay.",
	},
	{
		icon: <LuListTodo className='text-4xl text-green-600' />,
		title: "Hire Instantly, Without Hassle",
		description: "Buyers post simple tasks and connect with thousands of ready-to-work users instantly.",
	},
	{
		icon: <LuCoins className='text-4xl text-green-600' />,
		title: "Fair & Transparent Earnings",
		description: "Earn coins for every approved task. Withdraw real cash — no hidden cuts or delays.",
	},
];

const WhyChooseUs = () => {
	return (
		<section className='bg-base-100 py-20'>
			<div className='container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12'>
				{/* Left Content */}
				<motion.div
					initial={{ opacity: 0, x: -40 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className='w-full lg:w-1/2'
				>
					<h2 className='text-3xl md:text-4xl font-bold mb-6'>
						Why Choose <span className='text-gradient'>MicroEarn?</span>
					</h2>
					<p className='text-gray-600 mb-8 max-w-lg'>
						Whether you're here to earn or get things done — MicroEarn gives you full control, real value, and instant
						results.
					</p>

					<div className='space-y-6'>
						{reasons.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: index * 0.2 }}
								viewport={{ once: true }}
								className='flex items-start gap-4'
							>
								<div>{item.icon}</div>
								<div>
									<h4 className='text-lg font-semibold'>{item.title}</h4>
									<p className='text-sm text-gray-600'>{item.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Right Illustration */}
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className='w-full lg:w-1/2'
				>
					<img
						src={illustration}
						alt='Why Choose Us Illustration'
						className='w-full max-w-md mx-auto'
					/>
				</motion.div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
