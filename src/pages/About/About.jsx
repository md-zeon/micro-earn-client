import aboutImg from "../../assets/about.svg";
import GlassCard from "../../components/ui/GlassCard";
import { LuBadgeDollarSign, LuUserCheck, LuShieldCheck, LuGlobe, LuHandCoins } from "react-icons/lu";

const About = () => {
	return (
		<section className='bg-base-200 text-base-content py-16 px-4'>
			{/* Top Section */}
			<div className='max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10'>
				{/* Text */}
				<div
					className='flex-1 space-y-4'
					data-aos='fade-right'
					data-aos-duration='1000'
				>
                    <LuHandCoins className="bg-gradient p-4 text-6xl rounded-xl mx-auto sm:mx-0" />
					<h2 className='text-3xl md:text-4xl text-center sm:text-start font-bold text-gradient'>About MicroEarn</h2>
					<p className='text-gray-600 leading-relaxed text-justify md:text-left'>
						MicroEarn is a dynamic micro-task and earning platform that connects Buyers (task providers) with global
						Workers (freelancers). Buyers post digital tasks like surveys, app tests, or content sharing, and reward
						Workers with coins. Whether you're looking to outsource tasks or earn from home, MicroEarn empowers you with
						the tools, flexibility, and security to succeed in the digital gig economy.
					</p>
				</div>

				{/* Image */}
				<div
					className='flex-1'
					data-aos='fade-left'
					data-aos-duration='1000'
				>
					<img
						src={aboutImg}
						alt='About MicroEarn'
						className='w-full max-w-md mx-auto object-contain'
					/>
				</div>
			</div>

			{/* Feature Cards */}
			<div
				className='mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-5xl mx-auto'
				data-aos='fade-up'
				data-aos-delay='200'
			>
				<GlassCard className="p-6">
					<div className='flex items-start gap-3'>
						<LuBadgeDollarSign className='text-3xl text-green-500 mt-1' />
						<div>
							<h3 className='text-lg font-semibold mb-1'>Earn Real Rewards</h3>
							<p className='text-sm text-gray-500'>
								Complete tasks and earn coins. Withdraw coins as real money (20 coins = $1).
							</p>
						</div>
					</div>
				</GlassCard>

				<GlassCard className="p-6">
					<div className='flex items-start gap-3'>
						<LuUserCheck className='text-3xl text-blue-500 mt-1' />
						<div>
							<h3 className='text-lg font-semibold mb-1'>Buyer & Worker Roles</h3>
							<p className='text-sm text-gray-500'>
								Register as a Buyer to post tasks or as a Worker to complete tasks and earn.
							</p>
						</div>
					</div>
				</GlassCard>

				<GlassCard className="p-6">
					<div className='flex items-start gap-3'>
						<LuShieldCheck className='text-3xl text-purple-500 mt-1' />
						<div>
							<h3 className='text-lg font-semibold mb-1'>Secure & Transparent</h3>
							<p className='text-sm text-gray-500'>
								All transactions are handled securely via Stripe. Role-based dashboards and submission validations
								ensure fairness.
							</p>
						</div>
					</div>
				</GlassCard>

				<GlassCard className="p-6">
					<div className='flex items-start gap-3'>
						<LuGlobe className='text-3xl text-yellow-500 mt-1' />
						<div>
							<h3 className='text-lg font-semibold mb-1'>Global Access</h3>
							<p className='text-sm text-gray-500'>
								Work and earn from anywhere. MicroEarn is designed for a global workforce of freelancers and digital
								employers.
							</p>
						</div>
					</div>
				</GlassCard>
			</div>

			{/* CTA Section */}
			<div
				className='mt-16 max-w-3xl mx-auto text-center space-y-4'
				data-aos='fade-up'
				data-aos-delay='300'
			>
				<h3 className='text-2xl font-semibold'>Start Your Journey with MicroEarn</h3>
				<p className='text-gray-600'>
					Join thousands of users who are earning real rewards or finding efficient help for their digital tasks.
					Whether you're a freelancer or an entrepreneur — MicroEarn gives you the power to succeed.
				</p>
				<a
					href='/register'
					className='inline-block px-6 py-3 bg-gradient rounded-xl shadow hover:scale-105 transition'
				>
					Get Started
				</a>
			</div>
		</section>
	);
};

export default About;
