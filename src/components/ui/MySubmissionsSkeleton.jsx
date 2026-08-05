import { Skeleton } from "./skeleton";

const MySubmissionsSkeleton = () => {
	const rows = 5;

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-4 w-64" />
			</div>

			<div className="flex flex-wrap gap-2">
				{Array(4)
					.fill(0)
					.map((_, i) => (
						<Skeleton
							key={i}
							className="h-7 w-20"
						/>
					))}
			</div>

			<div className="overflow-x-auto rounded-xl border bg-card p-4">
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
				{Array(rows)
					.fill(0)
					.map((_, index) => (
						<div
							key={index}
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
		</div>
	);
};

export default MySubmissionsSkeleton;
