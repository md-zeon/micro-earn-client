import { Skeleton } from "./skeleton";

const TaskSkeletonCard = () => {
	return (
		<div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
			<div className="space-y-2">
				<Skeleton className="h-5 w-3/4" />
				<Skeleton className="h-4 w-1/2" />
			</div>

			<div className="space-y-2">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-5/6" />
			</div>

			<Skeleton className="mt-auto h-9 w-full" />
		</div>
	);
};

export default TaskSkeletonCard;
