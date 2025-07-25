const WithdrawRequestsSkeleton = () => {
	return (
		<div className='space-y-8 mt-8'>
			{/* Pending Requests Section */}
			<div>
				<div className='space-y-2 mb-4'>
					<div className='h-6 w-48 bg-base-300 rounded animate-pulse'></div>
					<div className='h-4 w-64 bg-base-200 rounded animate-pulse'></div>
				</div>
				<div className='overflow-x-auto border border-base-200 rounded-md p-4 space-y-4'>
					{Array(5)
						.fill(0)
						.map((_, i) => (
							<div key={i} className='flex space-x-4'>
								{Array(6)
									.fill(0)
									.map((_, idx) => (
										<div key={idx} className='h-6 flex-1 bg-base-200 rounded animate-pulse'></div>
									))}
							</div>
						))}
				</div>
			</div>

			{/* Approved Requests Section */}
			<div>
				<div className='space-y-2 mb-4'>
					<div className='h-6 w-52 bg-base-300 rounded animate-pulse'></div>
					<div className='h-4 w-72 bg-base-200 rounded animate-pulse'></div>
				</div>
				<div className='overflow-x-auto border border-base-200 rounded-md p-4 space-y-4'>
					{Array(5)
						.fill(0)
						.map((_, i) => (
							<div key={i} className='flex space-x-4'>
								{Array(6)
									.fill(0)
									.map((_, idx) => (
										<div key={idx} className='h-6 flex-1 bg-base-200 rounded animate-pulse'></div>
									))}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default WithdrawRequestsSkeleton;