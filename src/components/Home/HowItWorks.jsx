import { LuClipboardList, LuCoins, LuUsers } from "react-icons/lu";

const steps = [
	{
		icon: <LuClipboardList className='text-4xl text-primary' />,
		title: "Post a Task",
		description: "Buyers create tasks with clear instructions and coin rewards.",
	},
	{
		icon: <LuUsers className='text-4xl text-secondary' />,
		title: "Do the Work",
		description: "Workers complete tasks based on the requirements and submit proof.",
	},
	{
		icon: <LuCoins className='text-4xl text-accent' />,
		title: "Earn Coins",
		description: "Get coins for approved tasks — withdraw or reinvest anytime.",
	},
];

const HowItWorks = () => {
	return (
		<section className='py-16 px-4 md:px-10 bg-base-100'>
			<div className='max-w-6xl mx-auto text-center'>
				<h2
					data-aos='fade-up'
					className='text-3xl md:text-4xl font-bold mb-6 text-gradient'
				>
					How MicroEarn Works
				</h2>

				<p
					data-aos='fade-up'
					data-aos-delay='100'
					className='mb-12 text-base-content/70 max-w-2xl mx-auto'
				>
					Our platform connects task creators with eager micro-workers. It's fast, fair, and flexible.
				</p>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{steps.map((step, index) => (
						<div
							key={index}
							data-aos='fade-right'
							data-aos-delay={150 * index}
							className='p-6 rounded-2xl shadow bg-base-200 hover:shadow-lg transition'
						>
							<div className='mb-4 grid place-items-center'>{step.icon}</div>
							<h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
							<p className='text-sm text-base-content/70'>{step.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
