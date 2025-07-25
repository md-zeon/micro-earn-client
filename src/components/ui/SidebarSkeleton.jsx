const SidebarSkeleton = ({ isSidebarOpen }) => {
	return (
		<aside
			className={`w-64 bg-base-200 z-40 p-4 ${
				isSidebarOpen ? "block" : "hidden"
			} lg:block sticky top-[72px] self-start h-[calc(100vh-72px)] overflow-y-auto flex flex-col justify-between animate-pulse`}
		>
			{/* Skeleton menu items */}
			<ul className='space-y-3'>
				{Array(6)
					.fill(0)
					.map((_, i) => (
						<li key={i}>
							<div className='skeleton h-6 w-40 rounded'></div>
						</li>
					))}
			</ul>

			{/* Skeleton logout button */}
			<div className='fixed bottom-2 w-60'>
				<hr className='border-accent mb-3' />
				<div className='skeleton h-10 w-full rounded'></div>
			</div>
		</aside>
	);
};

export default SidebarSkeleton;
