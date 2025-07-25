const TaskDetailsSkeleton = () => {
	return (
		<div className='sm:px-4 py-8 space-y-8 animate-pulse'>
			<div className='btn btn-sm w-40 h-10' />

			<div className='flex flex-col lg:flex-row gap-8'>
				{/* Left Card Skeleton */}
				<div className='flex-1 bg-base-200 p-6 rounded-xl shadow-md border border-base-300 space-y-6'>
					<div className='h-8 bg-base-200 rounded w-3/4'></div>
					<div className='border border-base-300 rounded-lg sm:p-3 my-6 h-64 bg-base-200' />
					<div className='space-y-2'>
						<div className='h-6 w-1/3 bg-base-200 rounded'></div>
						<div className='h-4 w-full bg-base-200 rounded'></div>
						<div className='h-4 w-4/5 bg-base-200 rounded'></div>
					</div>
					<div className='space-y-2'>
						<div className='h-6 w-1/2 bg-base-200 rounded'></div>
						<div className='h-4 w-full bg-base-200 rounded'></div>
						<div className='h-4 w-4/5 bg-base-200 rounded'></div>
					</div>
				</div>

				{/* Right Sidebar Skeleton */}
				<div className='lg:w-1/3 space-y-6'>
					<div className='bg-base-200 p-6 rounded-xl shadow-md border border-base-300 space-y-4'>
						<div className='h-6 bg-base-200 w-1/2 rounded'></div>
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className='flex justify-between items-center'
							>
								<div className='flex gap-2 items-center text-base-300'>
									<div className='w-4 h-4 bg-base-200 rounded-full' />
									<div className='w-20 h-4 bg-base-200 rounded' />
								</div>
								<div className='w-12 h-4 bg-base-200 rounded'></div>
							</div>
						))}
					</div>

					<div className='bg-base-200 p-6 rounded-xl shadow-md border border-base-300 space-y-3'>
						<div className='h-6 bg-base-200 w-1/3 rounded'></div>
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className='w-4/5 h-3 bg-base-200 rounded'
							></div>
						))}
					</div>
				</div>
			</div>

			{/* Submit Section */}
			<div className='bg-base-200 p-6 rounded-xl shadow-md border border-base-300 space-y-4'>
				<div className='h-6 w-1/3 bg-base-200 rounded'></div>
				<div className='h-10 bg-base-200 rounded'></div>
				<div className='h-32 bg-base-200 rounded'></div>
				<div className='h-12 bg-base-200 rounded w-full'></div>
			</div>
		</div>
	);
};

export default TaskDetailsSkeleton;
