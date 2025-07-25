const WithdrawRequestsSkeleton = () => {
	return (
		<div className='space-y-8 mt-8'>
			{/* Pending Requests Section */}
			<div>
				<div className='space-y-2 mb-4'>
					<div className='h-6 w-48 bg-gray-400 rounded animate-pulse'></div>
					<div className='h-4 w-64 bg-gray-300 rounded animate-pulse'></div>
				</div>
				<div className='overflow-x-auto border border-gray-300 rounded-md p-4 space-y-4'>
					{Array(5)
						.fill(0)
						.map((_, i) => (
							<div key={i} className='flex space-x-4'>
								{Array(6)
									.fill(0)
									.map((_, idx) => (
										<div key={idx} className='h-6 flex-1 bg-gray-200 rounded animate-pulse'></div>
									))}
							</div>
						))}
				</div>
			</div>

			{/* Approved Requests Section */}
			<div>
				<div className='space-y-2 mb-4'>
					<div className='h-6 w-52 bg-gray-400 rounded animate-pulse'></div>
					<div className='h-4 w-72 bg-gray-300 rounded animate-pulse'></div>
				</div>
				<div className='overflow-x-auto border border-gray-300 rounded-md p-4 space-y-4'>
					{Array(5)
						.fill(0)
						.map((_, i) => (
							<div key={i} className='flex space-x-4'>
								{Array(6)
									.fill(0)
									.map((_, idx) => (
										<div key={idx} className='h-6 flex-1 bg-gray-200 rounded animate-pulse'></div>
									))}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default WithdrawRequestsSkeleton;