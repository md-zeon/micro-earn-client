import { useNavigate } from "react-router";
import { LuDollarSign, LuUsers, LuCalendarDays } from "react-icons/lu";
import useWorkerTasks from "../../../hooks/useWorkerTasks";
import Container from "../../../components/Container";
import TaskSkeletonCard from "../../../components/ui/TaskSkeletonCard";
import PageTitle from "../../../components/PageTitle";

const TasksList = () => {
	const navigate = useNavigate();
	const { tasks, isTasksLoading } = useWorkerTasks();

	return (
		<Container>
			<div className='sm:px-4 py-6'>
				<PageTitle title="Available Tasks" description="Browse and apply for tasks to start earning money." />
				<h1 className='text-3xl font-bold mb-6 text-center text-gradient'>Available Tasks</h1>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{isTasksLoading ? (
						Array.from({ length: 6 }).map((_, index) => <TaskSkeletonCard key={index} />)
					) : tasks.length === 0 ? (
						<p className='text-center text-gray-500 col-span-full'>No tasks available at the moment.</p>
					) : (
						tasks.map((task) => (
							<div
								key={task._id}
								className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-500'
							>
								<div className='card-body'>
									<h2 className='card-title text-xl font-semibold truncate line-clamp-1'>{task.task_title}</h2>
									<p className='text-sm text-gray-600'>Posted by: {task.buyer_name}</p>
									<div className='mt-4 space-y-2'>
										<div className='flex items-center gap-2'>
											<LuCalendarDays className='text-red-400' />
											<span className='text-sm'>
												Deadline: {new Date(task.completion_deadline).toLocaleDateString()}
											</span>
										</div>
										<div className='flex items-center gap-2'>
											<LuDollarSign className='text-green-400' />
											<span className='text-sm'>Payment: {task.payable_amount} Micro Coins</span>
										</div>
										<div className='flex items-center gap-2'>
											<LuUsers className='text-blue-400' />
											<span className='text-sm'>Workers Needed: {task.required_workers}</span>
										</div>
									</div>
									<div className='card-actions mt-4'>
										<button
											onClick={() => navigate(`/dashboard/task-details/${task._id}`)}
											className='btn bg-gradient w-full'
										>
											View Details
										</button>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</Container>
	);
};

export default TasksList;
