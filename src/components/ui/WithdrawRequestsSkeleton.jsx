import { Skeleton } from "./skeleton";

const WithdrawRequestsSkeleton = () => {
	return (
		<div className='space-y-8 mt-8'>
			<div>
				<div className='space-y-2 mb-4'>
					<Skeleton className='h-6 w-48' />
					<Skeleton className='h-4 w-64' />
				</div>
				<div className='space-y-4 overflow-x-auto rounded-md border bg-card p-4'>
					{Array(5)
						.fill(0)
						.map((_, i) => (
							<div
								key={i}
								className='flex gap-4'
							>
								{Array(6)
									.fill(0)
									.map((_, idx) => (
										<Skeleton
											key={idx}
											className='h-6 flex-1'
										/>
									))}
							</div>
						))}
				</div>
			</div>

			<div>
				<div className='space-y-2 mb-4'>
					<Skeleton className='h-6 w-52' />
					<Skeleton className='h-4 w-72' />
				</div>
				<div className='space-y-4 overflow-x-auto rounded-md border bg-card p-4'>
					{Array(5)
						.fill(0)
						.map((_, i) => (
							<div
								key={i}
								className='flex gap-4'
							>
								{Array(6)
									.fill(0)
									.map((_, idx) => (
										<Skeleton
											key={idx}
											className='h-6 flex-1'
										/>
									))}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default WithdrawRequestsSkeleton;
