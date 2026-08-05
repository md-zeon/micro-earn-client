import { useNavigate } from "react-router";
import { CalendarDays, Coins, Users, ArrowRight } from "lucide-react";
import useWorkerTasks from "../../../hooks/useWorkerTasks";
import TaskSkeletonCard from "../../../components/ui/TaskSkeletonCard";
import PageTitle from "../../../components/PageTitle";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

const TasksList = () => {
	const navigate = useNavigate();
	const { tasks, isTasksLoading } = useWorkerTasks();

	return (
		<div className="space-y-6">
			<PageTitle
				title="Available Tasks"
				description="Browse and apply for tasks to start earning money."
			/>

			<div>
				<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
					Available Tasks
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					{isTasksLoading
						? "Loading tasks..."
						: `${tasks.length} task${tasks.length === 1 ? "" : "s"} ready for you to complete.`}
				</p>
			</div>

			{isTasksLoading ? (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, index) => (
						<TaskSkeletonCard key={index} />
					))}
				</div>
			) : tasks.length === 0 ? (
				<div className="rounded-xl border bg-card py-16 text-center">
					<p className="text-sm text-muted-foreground">
						No tasks available at the moment.
					</p>
					<p className="mt-1 text-xs text-muted-foreground">
						Check back soon for new tasks.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{tasks.map((task) => (
						<Card
							key={task._id}
							className="transition-shadow hover:shadow-md"
						>
							<CardContent className="flex flex-col gap-4 p-5">
								<div className="space-y-1">
									<h2 className="truncate text-lg font-semibold">
										{task.task_title}
									</h2>
									<p className="text-sm text-muted-foreground">
										Posted by {task.buyer_name}
									</p>
								</div>

								<div className="space-y-2">
									<div className="flex items-center gap-2 text-sm">
										<CalendarDays className="size-4 text-red-400" />
										<span className="text-muted-foreground">Deadline:</span>
										<span>
											{new Date(task.completion_deadline).toLocaleDateString()}
										</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<Coins className="size-4 text-emerald-400" />
										<span className="text-muted-foreground">Payment:</span>
										<span className="font-medium">
											{task.payable_amount} Micro Coins
										</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<Users className="size-4 text-sky-400" />
										<span className="text-muted-foreground">Workers Needed:</span>
										<span>{task.required_workers}</span>
									</div>
								</div>

								<div className="flex items-center justify-between gap-3 border-t pt-4">
									<Badge variant="secondary">Open</Badge>
									<Button
										className="bg-gradient"
										onClick={() =>
											navigate(`/dashboard/task-details/${task._id}`)
										}
									>
										View Details
										<ArrowRight />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

export default TasksList;
