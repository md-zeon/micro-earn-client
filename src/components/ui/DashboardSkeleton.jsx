import DashBoardFooter from "../../pages/Dashboard/Common/DashboardFooter";
import Container from "../Container";

const DashboardSkeleton = () => {
	return (
		<Container>
			<div className='flex flex-col'>
				{/* Navbar Skeleton */}
				<header className='px-2 py-4 sm:p-4 bg-base-200 rounded-xl shadow sticky top-0 z-50'>
					<div className='flex items-center justify-between'>
						{/* Left side: Menu + Logo */}
						<div className='flex items-center gap-2'>
							<div className='skeleton h-8 w-8 rounded-md'></div> {/* Menu icon */}
							<div className='skeleton h-8 w-28 rounded'></div> {/* Logo */}
						</div>

						{/* Right side: Coins + Theme + User + Notification */}
						<div className='flex items-center gap-2 sm:gap-4'>
							<div className='hidden md:block skeleton h-6 w-24 rounded'></div> {/* AvailableCoins */}
							<div className='skeleton h-8 w-8 rounded-md'></div> {/* Theme Controller */}
							<div className='flex items-center gap-2'>
								<div className='skeleton w-10 h-10 rounded-full'></div> {/* Avatar */}
								<div className='hidden sm:flex flex-col gap-1'>
									<div className='skeleton h-4 w-24'></div> {/* Name */}
									<div className='skeleton h-3 w-16'></div> {/* Role */}
								</div>
							</div>
							<div className='skeleton w-8 h-8 rounded-full'></div> {/* Notification bell */}
						</div>
					</div>
				</header>

				{/* Sidebar + Content Skeleton */}
				<div className='flex flex-1 h-[calc(100vh-72px)]'>
					{/* Sidebar Skeleton */}
					<div className='hidden lg:block w-64 p-4 bg-base-200'>
						<div className='space-y-4'>
							<div className='skeleton h-4 w-3/4'></div>
							<div className='skeleton h-4 w-1/2'></div>
							<div className='skeleton h-4 w-2/3'></div>
							<div className='skeleton h-4 w-1/3'></div>
							<div className='skeleton h-4 w-3/5'></div>
						</div>
					</div>

					{/* Main content Skeleton */}
					<main className='flex-1 p-6 bg-base-100 flex flex-col overflow-y-auto'>
						<div className='flex-1 space-y-4'>
							<div className='skeleton h-8 w-1/3'></div>
							<div className='skeleton h-40 w-full'></div>
							<div className='skeleton h-40 w-full'></div>
						</div>
						<DashBoardFooter />
					</main>
				</div>
			</div>
		</Container>
	);
};

export default DashboardSkeleton;
