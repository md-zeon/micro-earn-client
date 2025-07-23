import { useState } from "react";
import useBuyerTasks from "../../../hooks/useBuyerTasks";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import toast from "react-hot-toast";
import MyTaskTable from "../../../components/Table/MyTaskTable";
import StatsCard from "../../../components/shared/StatsCard";
import UpdateTaskModal from "../../../components/Modals/UpdateTaskModal";

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

	if (isTasksLoading) return <Loader />;

	const totalTasks = tasks.length;
	const activeTasks = tasks.filter((task) => task.status === "active").length;
	const totalInvestment = tasks.reduce((sum, task) => sum + task.required_workers * task.payable_amount, 0);
	const completedTasks = tasks.filter((task) => task.status === "completed").length;

	return (
		<div>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>My Tasks</h1>
				<button className='btn btn-sm btn-success rounded-full'>{tasks.length}</button>
			</div>
			{/* Stats Cards */}
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6'>
				<StatsCard
					label='Total Tasks'
					value={totalTasks}
				/>
				<StatsCard
					label='Active Tasks'
					value={activeTasks}
					color='text-blue-400'
				/>
				<StatsCard
					label='Completed Tasks'
					value={completedTasks}
					color='text-green-400'
				/>
				<StatsCard
					label='Total Investment'
					value={totalInvestment}
					color='text-blue-400'
					suffix='coins'
				/>
			</div>

			{/* Task Table */}
			<MyTaskTable
				tasks={tasks}
				onUpdateClick={handleUpdateClick}
				onDeleteClick={(task) => handleDelete(task._id, task.required_workers, task.payable_amount, task.status)}
			/>

			{/* Update Modal */}
			<UpdateTaskModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				formData={formData}
				setFormData={setFormData}
				onSubmit={handleUpdateSubmit}
			/>
		</div>
	);
};

export default MyTasks;
