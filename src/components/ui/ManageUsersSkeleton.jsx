const ManageUsersSkeleton = () => {
	return (
		<div className='mt-10 space-y-4'>
			{/* Title Skeleton */}
			<div className='h-8 w-48 bg-gray-400 rounded animate-pulse'></div>

			{/* Table Skeleton */}
			<div className='overflow-x-auto'>
				<div className='w-full border border-gray-400 rounded-lg'>
					{/* Table header skeleton */}
					<div className='flex border-b border-gray-400 p-3 space-x-4'>
						{Array(7)
							.fill(0)
							.map((_, i) => (
								<div
									key={i}
									className='h-6 flex-1 bg-gray-400 rounded animate-pulse'
								></div>
							))}
					</div>

					{/* Table rows skeleton */}
					<div className='space-y-3 p-3'>
						{Array(5)
							.fill(0)
							.map((_, i) => (
								<div
									key={i}
									className='flex space-x-4'
								>
									{Array(7)
										.fill(0)
										.map((__, idx) => (
											<div
												key={idx}
												className='h-6 flex-1 bg-gray-300 rounded animate-pulse'
											></div>
										))}
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ManageUsersSkeleton;
