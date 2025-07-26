const ProfileSkeleton = () => {
	return (
		<div className='max-w-3xl mx-auto p-4 space-y-6'>
			<div className='skeleton h-8 w-1/3'></div>
			<div className='flex items-center gap-4'>
				<div className='skeleton w-24 h-24 rounded-full'></div>
				<div className='flex-1 space-y-3'>
					<div className='skeleton h-4 w-2/3'></div>
					<div className='skeleton h-4 w-1/2'></div>
					<div className='skeleton h-4 w-1/3'></div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSkeleton;
