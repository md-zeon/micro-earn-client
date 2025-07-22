import { useState } from "react";
import useBuyerTasks from "../../../hooks/useBuyerTask";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { LuCoins, LuPen, LuTrash2, LuUser } from "react-icons/lu";
import Loader from "../../../components/Loader";
import toast from "react-hot-toast";
import MyTaskTable from "../../../components/Table/MyTaskTable";

const MyTasks = () => {
	const { tasks, isTasksLoading, refetch } = useBuyerTasks();
	const { refetch: refetchCoins } = useAvailableCoins();
	const axiosSecure = useAxiosSecure();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [formData, setFormData] = useState({
		task_title: "",
		task_detail: "",
		submission_info: "",
	});

	// Handle Delete Task
	const handleDelete = async (taskId, requiredWorkers, payableAmount, status) => {
		const result = await Swal.fire({
			title: "Are you sure?",
			text: "This task will be deleted, and coins will be refunded for uncompleted tasks.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		});

		if (result.isConfirmed) {
			try {
				await axiosSecure.delete(`/tasks/${taskId}`);
				if (status === "active") {
					const refundAmount = requiredWorkers * payableAmount;
					await axiosSecure.patch("/update-coins", {
						coinsToUpdate: refundAmount,
						status: "increase",
					});
				}
				refetch();
				refetchCoins();
				Swal.fire("Deleted!", "Task has been deleted.", "success");
			} catch (err) {
				console.error("Delete Task Error:", err);
				toast.error("Failed to delete task. Please try again.");
			}
		}
	};

	// Handle Update Task
	const handleUpdateClick = (task) => {
		setSelectedTask(task);
		setFormData({
			task_title: task.task_title,
			task_detail: task.task_detail,
			submission_info: task.submission_info,
		});
		setIsModalOpen(true);
	};

	const handleUpdateSubmit = async (e) => {
		e.preventDefault();
		try {
			await axiosSecure.patch(`/tasks/${selectedTask._id}`, formData);
			refetch();
			setIsModalOpen(false);
			Swal.fire("Updated!", "Task has been updated.", "success");
		} catch (err) {
			console.error("Update Task Error:", err);
			toast.error("Failed to update task. Please try again.");
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	if (isTasksLoading) return <Loader />;

	const totalTasks = tasks.length;
	const activeTasks = tasks.filter((task) => task.status === "active").length;
	const totalInvestment = tasks.reduce((sum, task) => sum + task.required_workers * task.payable_amount, 0);
	const completedTasks = tasks.filter((task) => task.status === "completed").length;

	return (
		<div className='max-w-6xl mx-auto px-4 py-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>My Tasks</h1>
				<button className='btn btn-sm btn-success rounded-full'>{tasks.length}</button>
			</div>

			{/* Stats Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6'>
				<div className='card border-2 border-base-200 hover:bg-base-200 rounded-lg p-6'>
					<p className='text-gray-400'>Total Tasks</p>
					<p className='text-2xl font-semibold'>{totalTasks}</p>
				</div>
				<div className='card border-2 border-base-200 rounded-lg p-6 hover:bg-base-200'>
					<p className='text-gray-400'>Active Tasks</p>
					<p className='text-2xl font-semibold text-blue-400'>{activeTasks}</p>
				</div>
				<div className='card border-2 border-base-200 rounded-lg p-6 hover:bg-base-200'>
					<p className='text-gray-400'>Completed Tasks</p>
					<p className='text-2xl font-semibold text-green-400'>{completedTasks}</p>
				</div>
				<div className='card border-2 border-base-200 rounded-lg p-6 hover:bg-base-200'>
					<p className='text-gray-400'>Total Investment</p>
					<p className='text-2xl font-semibold text-blue-400'>
						{totalInvestment} <span className='text-gradient text-base'>Micro coins</span>
					</p>
				</div>
			</div>

			{/* Task Management Table */}
			<div className='card rounded-xl p-4 border-2 border-base-200'>
				<h2 className='text-xl font-semibold mb-4'>Task Management</h2>
				{tasks.length === 0 ? (
					<div className='p-6'>
						<p className='text-center text-gray-500'>No tasks found. Create a new task!</p>
					</div>
				) : (
					<MyTaskTable
						tasks={tasks}
						onUpdateClick={handleUpdateClick}
						onDeleteClick={handleDelete}
					/>
				)}
			</div>

			{/* Update Task Modal */}
			{isModalOpen && (
				<div className='modal modal-open'>
					<div className='modal-box'>
						<h3 className='font-bold text-lg'>Update Task</h3>
						<form
							onSubmit={handleUpdateSubmit}
							className='space-y-4 mt-4'
						>
							<div>
								<label className='label'>Task Title *</label>
								<input
									type='text'
									name='task_title'
									value={formData.task_title}
									onChange={handleInputChange}
									className='input input-bordered w-full'
									required
								/>
							</div>
							<div>
								<label className='label'>Task Description *</label>
								<textarea
									name='task_detail'
									value={formData.task_detail}
									onChange={handleInputChange}
									className='textarea textarea-bordered w-full'
									rows='4'
									required
								></textarea>
							</div>
							<div>
								<label className='label'>Submission Instructions *</label>
								<textarea
									name='submission_info'
									value={formData.submission_info}
									onChange={handleInputChange}
									className='textarea textarea-bordered w-full'
									rows='3'
									required
								></textarea>
							</div>
							<div className='modal-action'>
								<button
									type='submit'
									className='btn bg-gradient'
								>
									Save Changes
								</button>
								<button
									type='button'
									className='btn btn-ghost'
									onClick={() => setIsModalOpen(false)}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default MyTasks;
