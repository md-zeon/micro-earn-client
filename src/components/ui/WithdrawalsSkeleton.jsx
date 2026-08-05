import { Skeleton } from "./skeleton";

const WithdrawalsSkeleton = () => {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-4 w-64" />
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{[...Array(2)].map((_, i) => (
					<div
						key={i}
						className="flex flex-col gap-3 rounded-xl border bg-card p-5"
					>
						<Skeleton className="h-4 w-28" />
						<Skeleton className="h-9 w-40" />
						<Skeleton className="h-3 w-32" />
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<div className="space-y-4 rounded-xl border bg-card p-5">
					<Skeleton className="h-6 w-44" />
					<Skeleton className="h-9 w-full" />
					<Skeleton className="h-9 w-full" />
					<Skeleton className="h-9 w-full" />
					<Skeleton className="h-9 w-full" />
				</div>

				<div className="space-y-4 rounded-xl border bg-card p-5">
					<Skeleton className="h-6 w-40" />
					{[...Array(3)].map((_, i) => (
						<Skeleton
							key={i}
							className="h-6 w-full"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default WithdrawalsSkeleton;
