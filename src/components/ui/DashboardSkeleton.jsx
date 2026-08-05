import { Skeleton } from "./skeleton";

const DashboardSkeleton = ({ statsCount = 4, showTable = false }) => {
	const statsSkeletons = Array(Math.max(statsCount, 0))
		.fill(0)
		.map((_, i) => (
			<div
				key={i}
				className="flex flex-col gap-4 rounded-xl border bg-card p-5"
			>
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-9 w-full" />
				<Skeleton className="h-3 w-32" />
			</div>
		));

	return (
		<div className="space-y-8">
			<div className="space-y-2 sm:px-4">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-4 w-64" />
			</div>

			{statsSkeletons.length > 0 && (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
					{statsSkeletons}
				</div>
			)}

			{showTable && (
				<div className="space-y-3 rounded-xl border bg-card p-4">
					<div className="flex gap-4 border-b pb-3">
						{Array(6)
							.fill(0)
							.map((_, i) => (
								<Skeleton
									key={i}
									className="h-6 flex-1"
								/>
							))}
					</div>
					{Array(5)
						.fill(0)
						.map((_, i) => (
							<div
								key={i}
								className="flex gap-4"
							>
								{Array(6)
									.fill(0)
									.map((__, idx) => (
										<Skeleton
											key={idx}
											className="h-6 flex-1"
										/>
									))}
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default DashboardSkeleton;
