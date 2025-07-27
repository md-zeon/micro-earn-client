import HowItWorksIllustration from "../../assets/how-it-works.svg";

import { LuClipboardList, LuCoins, LuUsers } from "react-icons/lu";

const steps = [
	{
		icon: <LuClipboardList className='text-3xl text-accent shrink-0' />,
		title: "Post a Task",
		description: "Buyers create task listings with clear instructions and coin rewards.",
	},
	{
		icon: <LuUsers className='text-3xl text-accent shrink-0' />,
		title: "Complete the Work",
		description: "Workers browse available tasks, do the work, and submit proof as required.",
	},
	{
		icon: <LuCoins className='text-3xl text-accent shrink-0' />,
		title: "Earn Coins",
		description: "Once approved, workers earn coins that can be withdrawn or reinvested.",
	},
];

const HowItWorks = () => {
	return (
		<section className='py-20 px-4 md:px-10 bg-base-100'>
			<div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center'>
				{/* Left: Steps */}
				<div
					data-aos='fade-up'
					data-aos-delay='100'
					
				>
					<h2 className='text-3xl md:text-4xl font-bold mb-6 text-gradient'>How MicroEarn Works</h2>
					<p className='text-base-content/70 mb-10'>
						MicroEarn is simple and flexible. Here's how you can start earning or hiring today:
					</p>

					<div className='space-y-8'>
						{steps.map((step, index) => (
							<div
								key={index}
								className='flex items-start gap-4'
								data-aos='fade-up'
								data-aos-delay={200 + index * 100}
								
							>
								<div className='p-3 bg-base-200 rounded-xl'>{step.icon}</div>
								<div>
									<h3 className='text-lg font-semibold mb-1'>{step.title}</h3>
									<p className='text-sm text-base-content/70'>{step.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Right: Illustration */}
				<div
					data-aos='zoom-in'
					data-aos-delay='200'
					
				>
					<img
						src={HowItWorksIllustration}
						alt='How it works illustration'
						className='w-full max-w-md mx-auto'
					/>
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
