import { Skeleton } from "./skeleton";

const PurchaseCoinSkeleton = () => {
	return (
		<div className='max-w-6xl mx-auto px-4 py-6 space-y-6'>
			<div className='text-center space-y-2'>
				<Skeleton className='h-8 w-64 mx-auto' />
				<Skeleton className='h-4 w-80 mx-auto' />
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{Array(6)
					.fill(0)
					.map((_, i) => (
						<div
							key={i}
							className='rounded-md border bg-card p-6 shadow space-y-4'
						>
							<Skeleton className='h-6 w-32' />
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-10 w-full' />
						</div>
					))}
			</div>

			<div className='space-y-3'>
				<Skeleton className='h-6 w-40' />
				<Skeleton className='h-4 w-full' />
				<Skeleton className='h-4 w-5/6' />
				<Skeleton className='h-4 w-2/3' />
			</div>
		</div>
	);
};

export default PurchaseCoinSkeleton;
