const faqs = [
	{
		id: 1,
		question: "What is MicroEarn and how does it work?",
		answer:
			"MicroEarn is a platform where Buyers can post small digital tasks and Workers complete them in exchange for coins. Coins can later be withdrawn as real money.",
	},
	{
		id: 2,
		question: "How do I become a Worker on MicroEarn?",
		answer:
			"To become a Worker, sign up and select 'Worker' as your role. After logging in, you can browse available tasks, complete them, and earn coins.",
	},
	{
		id: 3,
		question: "How do I post a task as a Buyer?",
		answer:
			"Sign up as a Buyer, then go to your dashboard and use the 'Post a Task' option. Fill in task details, required workers, and coin rewards per task.",
	},
	{
		id: 4,
		question: "How do coin payments and withdrawals work?",
		answer:
			"Buyers purchase coins using Stripe. Workers earn coins by completing tasks. Once a Worker reaches 200 coins, they can request a withdrawal (20 coins = $1).",
	},
	{
		id: 5,
		question: "What happens if a Buyer rejects a submission?",
		answer:
			"If a task submission is rejected, the worker does not earn coins and the task is reopened for other workers. Feedback may be provided for improvement.",
	},
	{
		id: 6,
		question: "Can I switch roles from Worker to Buyer?",
		answer:
			"Each account is assigned a single role. To use the platform as both a Buyer and a Worker, you’ll need to create a separate account for the other role.",
	},
];

const FAQ = () => {
	return (
		<section className='bg-base-200 py-16'>
			<div className='max-w-4xl mx-auto px-4'>
				<h2 className='text-3xl md:text-4xl font-bold text-center text-gradient mb-3'>Frequently Asked Questions</h2>
				<p className='text-center text-gray-500 mb-10'>Answers to common questions about MicroEarn.</p>
				<div className='space-y-4'>
					{faqs.map(({ id, question, answer }, index) => (
						<div
							className='collapse collapse-plus bg-base-100 border border-base-300'
							key={id}
                            data-aos="fade-right"
                            data-aos-delay={index * 100}
						>
							<input
								type='radio'
								name='faq-accordion'
								defaultChecked={index === 0}
							/>
							<div className='collapse-title font-semibold text-base'>{question}</div>
							<div className='collapse-content text-sm text-gray-500'>{answer}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FAQ;
