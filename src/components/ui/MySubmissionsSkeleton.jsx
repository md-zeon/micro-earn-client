const MySubmissionsSkeleton = () => {
	const rows = 5;

	return (
		<div className='px-4 py-6 max-w-7xl mx-auto'>
			<div className='h-8 w-64 mx-auto bg-base-200 rounded mb-6 animate-pulse'></div>

			{/* Filter Buttons Skeleton */}
			<div className='flex flex-wrap justify-center sm:justify-start gap-2 mb-6'>
				{Array(4)
					.fill(0)
					.map((_, i) => (
						<div
							key={i}
							className='h-8 w-20 bg-base-200 rounded animate-pulse'
						></div>
					))}
			</div>

			{/* Table Skeleton */}
			<div className='overflow-x-auto shadow rounded-lg'>
				<table className='table w-full'>
					<thead>
						<tr className='text-sm text-base-300'>
							<th>#</th>
							<th>Task Title</th>
							<th>Submitted</th>
							<th>Payment</th>
							<th>Status</th>
							<th>Details</th>
						</tr>
					</thead>
					<tbody>
						{Array(rows)
							.fill(0)
							.map((_, index) => (
								<tr
									key={index}
									className='animate-pulse'
								>
									<td>
										<div className='h-4 w-6 bg-base-100 rounded'></div>
									</td>
									<td>
										<div className='h-4 w-32 bg-base-200 rounded'></div>
									</td>
									<td>
										<div className='h-4 w-24 bg-base-100 rounded'></div>
									</td>
									<td>
										<div className='h-4 w-20 bg-base-200 rounded'></div>
									</td>
									<td>
										<div className='h-4 w-20 bg-base-200 rounded'></div>
									</td>
									<td>
										<div className='h-4 w-6 bg-base-200 rounded'></div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MySubmissionsSkeleton;
