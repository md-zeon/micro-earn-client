import { Skeleton } from "./skeleton";

const ManageUsersSkeleton = () => {
	return (
		<div className='mt-10 space-y-4'>
			<Skeleton className='h-8 w-48' />

			<div className='overflow-x-auto'>
				<div className='w-full rounded-lg border bg-card'>
					<div className='flex gap-4 border-b p-3'>
						{Array(7)
							.fill(0)
							.map((_, i) => (
								<Skeleton
									key={i}
									className='h-6 flex-1'
								/>
							))}
					</div>

					<div className='space-y-3 p-3'>
						{Array(5)
							.fill(0)
							.map((_, i) => (
								<div
									key={i}
									className='flex gap-4'
								>
									{Array(7)
										.fill(0)
										.map((__, idx) => (
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
		</div>
	);
};

export default ManageUsersSkeleton;
