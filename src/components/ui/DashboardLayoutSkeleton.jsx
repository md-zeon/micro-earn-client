import Container from "../Container";

const DashboardLayoutSkeleton = () => {
	return (
		<Container>
			<div className='flex flex-col animate-pulse'>
				{/* Navbar Skeleton */}
				<header className='flex justify-between items-center px-4 py-4 bg-base-200 rounded-xl shadow sticky top-0 z-50'>
					<div className='skeleton h-8 w-48 rounded'></div>
					<div className='flex items-center space-x-4'>
						<div className='skeleton h-6 w-24 rounded'></div>
						<div className='skeleton h-8 w-8 rounded-full'></div>
					</div>
				</header>

				{/* Main */}
				<div className='flex flex-1 h-[calc(100vh-72px)]'>
					{/* Sidebar Skeleton */}
					<div className='hidden lg:block w-64 p-4 bg-base-200 space-y-4'>
						{Array(6)
							.fill(0)
							.map((_, i) => (
								<div
									key={i}
									className='skeleton h-6 w-full rounded'
								></div>
							))}
					</div>

					{/* Content Skeleton */}
					<div className='flex-1 bg-base-100 p-6 flex flex-col'>
						<div className='skeleton h-6 w-48 mb-6 rounded'></div>
						<div className='flex-1 space-y-4'>
							<div className='skeleton h-40 rounded'></div>
							<div className='skeleton h-40 rounded'></div>
						</div>
						{/* Footer Skeleton */}
						<footer className='mt-6 h-12 w-full skeleton rounded'></footer>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default DashboardLayoutSkeleton;
