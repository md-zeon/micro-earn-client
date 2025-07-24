import Container from "../../../components/Container";

const DashBoardFooter = () => {
	return (
		<footer className='w-full border-t border-accent bg-base-100 text-sm '>
			<Container>
				<div className='py-3.5 px-6 flex flex-col md:flex-row items-center justify-between gap-2'>
					<p className='text-center'>
						&copy; {new Date().getFullYear()} <span className='font-semibold text-gradient'>MicroEarn</span>. All rights
						reserved.
					</p>

					<div className='flex items-center gap-4 text-xs text-base-content'>
						Built by
						<a
							href='https://zeon-portfolio.netlify.app/'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-primary transition-colors'
						>
							<span className='font-semibold text-gradient'>Zeanur Rahaman Zeon</span>
						</a>
						<span className='text-muted hidden sm:inline'>v1.0.0</span>
					</div>
				</div>
			</Container>
		</footer>
	);
};

export default DashBoardFooter;
