const TaskSkeletonCard = () => {
	return (
		<div className='card bg-base-100 shadow-md border border-base-300 animate-pulse'>
			<div className='card-body space-y-4'>
				<div className='h-5 w-3/4 bg-base-300 rounded'></div>
				<div className='h-4 w-1/2 bg-base-300 rounded'></div>

				<div className='space-y-2 mt-4'>
					<div className='h-4 w-full bg-base-300 rounded'></div>
					<div className='h-4 w-full bg-base-300 rounded'></div>
					<div className='h-4 w-5/6 bg-base-300 rounded'></div>
				</div>

				<div className='mt-4'>
					<div className='h-10 bg-base-300 rounded'></div>
				</div>
			</div>
		</div>
	);
};

export default TaskSkeletonCard;
