import { LuClock, LuListTodo, LuCoins } from "react-icons/lu";
import illustration from "../../assets/why-choose.svg";

const reasons = [
	{
		icon: <LuClock className='text-4xl text-accent' />,
		title: "Freedom to Earn Anytime",
		description: "MicroEarn empowers you to work whenever you want. No pressure — just tasks that pay.",
	},
	{
		icon: <LuListTodo className='text-4xl text-accent' />,
		title: "Hire Instantly, Without Hassle",
		description: "Buyers post simple tasks and connect with thousands of ready-to-work users instantly.",
	},
	{
		icon: <LuCoins className='text-4xl text-accent' />,
		title: "Fair & Transparent Earnings",
		description: "Earn coins for every approved task. Withdraw real cash — no hidden cuts or delays.",
	},
];

const WhyChooseUs = () => {
	return (
		<section className='bg-base-100 py-20'>
			<div className='px-4 flex flex-col-reverse lg:flex-row items-center gap-12'>
				{/* Left Content */}
				<div
					className='w-full lg:w-1/2'
					data-aos='fade-right'
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
							<div
								data-aos='fade-down'
								data-aos-delay={index * 100}
								className='flex items-start gap-4'
							>
								<div>{item.icon}</div>
								<div>
									<h4 className='text-lg font-semibold'>{item.title}</h4>
									<p className='text-sm text-gray-600'>{item.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Right Illustration */}
				<div
					className='w-full lg:w-1/2'
					data-aos='fade-left'
				>
					<img
						src={illustration}
						alt='Why Choose Us Illustration'
						className='w-full max-w-md mx-auto'
					/>
				</div>
			</div>
		</section>
	);
};

export default WhyChooseUs;
