import { Link } from "react-router";

const CTA = () => {
	return (
		<section className='py-16 bg-base-200'>
			<div className='rounded-2xl px-8 text-center'>
				<h2 className='text-3xl md:text-4xl font-bold mb-4'>Ready to Start Earning or Hiring?</h2>
				<p className='text-base-content/70 max-w-2xl mx-auto mb-8'>
					Join thousands of users who are already earning coins or getting work done on MicroEarn. Sign up today and
					experience the future of micro-tasking.
				</p>

				<div className='flex flex-col sm:flex-row gap-4 justify-center'>
					{/* Worker button - filled */}
					<Link
						to='/register'
						className='btn bg-gradient text-white font-semibold px-8 py-3 rounded-full'
					>
						Get Started as Worker
					</Link>

					{/* Buyer button - outline */}
					<Link
						to='/register'
						className='btn btn-outline font-semibold px-8 py-3 rounded-full'
					>
						Post Tasks as Buyer
					</Link>
				</div>
			</div>
		</section>
	);
};

export default CTA;
