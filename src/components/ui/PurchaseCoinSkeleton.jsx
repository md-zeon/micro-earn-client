const PurchaseCoinSkeleton = () => {
	return (
		<div className='max-w-6xl mx-auto px-4 py-6 space-y-6'>
			{/* Header Skeleton */}
			<div className='text-center space-y-2'>
				<div className='h-8 w-64 bg-base-200 rounded mx-auto animate-pulse'></div>
				<div className='h-4 w-80 bg-base-100 rounded mx-auto animate-pulse'></div>
			</div>

			{/* Coin Package Cards Skeleton */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
				{Array(6)
					.fill(0)
					.map((_, i) => (
						<div
							key={i}
							className='border rounded-md p-6 shadow space-y-4 animate-pulse'
						>
							<div className='h-6 w-32 bg-base-200 rounded'></div>
							<div className='h-4 w-24 bg-base-100 rounded'></div>
							<div className='h-10 w-full bg-base-200 rounded'></div>
						</div>
					))}
			</div>

			{/* Payment Info Skeleton */}
			<div className='space-y-3'>
				<div className='h-6 w-40 bg-base-200 rounded animate-pulse'></div>
				<div className='h-4 w-full bg-base-100 rounded animate-pulse'></div>
				<div className='h-4 w-5/6 bg-base-100 rounded animate-pulse'></div>
				<div className='h-4 w-2/3 bg-base-100 rounded animate-pulse'></div>
			</div>
		</div>
	);
};

export default PurchaseCoinSkeleton;
