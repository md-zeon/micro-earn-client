import { Link } from "react-router";
import { LuGithub, LuMail, LuPhone, LuMapPin, LuX, LuLinkedin, LuGlobe } from "react-icons/lu";
import Logo from "./Logo";
import Container from "./Container";

const Footer = () => {
	return (
		<footer className='bg-gradient-to-b from-base-200 to-base-300 text-base-content pt-12 pb-6 px-4 sm:px-6 md:px-8'>
			<Container>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-base-300 pb-10'>
					{/* Brand */}
					<div>
						<Logo />
						<p className='text-sm text-gray-400 mt-3 leading-relaxed max-w-xs'>
							Empowering people to earn through micro-tasks. Secure, flexible, and easy-to-use platform.
						</p>
					</div>

					{/* Navigation */}
					<div>
						<h3 className='text-lg font-semibold mb-3'>Explore</h3>
						<ul className='space-y-2 text-sm text-gray-400'>
							<li>
								<Link
									to='/'
									className='hover:text-base-content transition'
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to='/about'
									className='hover:text-base-content transition'
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									to='/dashboard'
									className='hover:text-base-content transition'
								>
									Dashboard
								</Link>
							</li>
							<li>
								<Link
									to='/register'
									className='hover:text-base-content transition'
								>
									Join Now
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h3 className='text-lg font-semibold mb-3'>Contact</h3>
						<ul className='space-y-2 text-sm text-gray-400'>
							<li className='flex items-center gap-2 hover:text-base-content transition'>
								<LuMail />
								<a href='mailto:support@microearn.com'>support@microearn.com</a>
							</li>
							<li className='flex items-center gap-2 hover:text-base-content transition'>
								<LuPhone />
								<span>+880 1234 567890</span>
							</li>
							<li className='flex items-center gap-2 hover:text-base-content transition'>
								<LuMapPin />
								<span>Dhaka, Bangladesh</span>
							</li>
						</ul>
					</div>

					{/* Social */}
					<div>
						<h3 className='text-lg font-semibold mb-3'>Follow Us</h3>
						<div className='flex flex-wrap gap-4 text-2xl text-gray-400'>
							<a
								href='https://linkedin.com/in/zeanur-rahaman-zeon'
								target='_blank'
								rel='noreferrer'
								className='hover:text-base-content transition'
							>
								<LuLinkedin />
							</a>
							<a
								href='https://github.com/md-zeon'
								target='_blank'
								rel='noreferrer'
								className='hover:text-base-content transition'
							>
								<LuGithub />
							</a>
							<a
								href='https://zeon-portfolio.netlify.app/'
								target='_blank'
								rel='noreferrer'
								className='hover:text-base-content transition'
							>
								<LuGlobe />
							</a>
							<a
								href='https://x.com/developerzeon'
								target='_blank'
								rel='noreferrer'
								className='hover:text-base-content transition'
							>
								<LuX />
							</a>
						</div>
					</div>
				</div>

				{/* Bottom */}
				<div className='text-center pt-6 text-sm text-gray-500'>
					&copy; {new Date().getFullYear()} MicroEarn. All rights reserved.
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
