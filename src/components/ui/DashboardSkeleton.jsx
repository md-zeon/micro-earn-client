const DashboardSkeleton = ({ statsCount = 4, showTable = false }) => {
	const statsSkeletons = Array(statsCount)
		.fill(0)
		.map((_, i) => (
			<div
				key={i}
				className='animate-pulse bg-base-300 rounded-xl p-6 flex flex-col space-y-4 shadow-inner'
			>
				<div className='h-5 w-24 bg-base-300 rounded'></div>
				<div className='h-10 w-full bg-base-300 rounded'></div>
				<div className='h-3 w-32 bg-base-300 rounded'></div>
			</div>
		));

	return (
		<div className='space-y-8'>
			{/* Header Skeleton */}
			<div className='animate-pulse space-y-2 sm:px-4'>
				<div className='h-8 w-48 bg-base-300 rounded'></div>
				<div className='h-4 w-64 bg-base-300 rounded'></div>
			</div>

			{/* Stats Grid */}
			<div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-${statsCount} gap-4`}>{statsSkeletons}</div>

			{/* Table Skeleton */}
			{showTable && (
				<div className='overflow-x-auto mt-10'>
					<div className='w-full border border-base-300 rounded-lg'>
						{/* Table header */}
						<div className='flex border-b border-base-300 p-3 space-x-4'>
							{Array(6)
								.fill(0)
								.map((_, i) => (
									<div
										key={i}
										className='h-6 flex-1 bg-base-300 rounded animate-pulse'
									></div>
								))}
						</div>
						{/* Table body */}
						<div className='space-y-3 p-3'>
							{Array(5)
								.fill(0)
								.map((_, i) => (
									<div
										key={i}
										className='flex space-x-4'
									>
										{Array(6)
											.fill(0)
											.map((__, idx) => (
												<div
													key={idx}
													className='h-6 flex-1 bg-base-200 rounded animate-pulse'
												></div>
											))}
									</div>
								))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardSkeleton;
