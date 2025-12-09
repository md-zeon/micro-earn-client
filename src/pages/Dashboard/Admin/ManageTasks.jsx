import Swal from "sweetalert2";
import useAdminTasks from "../../../hooks/useAdminTasks";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { LuCoins, LuTrash2 } from "react-icons/lu";
import ManageTasksSkeleton from "../../../components/ui/ManageTasksSkeleton";
import PageTitle from "../../../components/PageTitle";

const ManageTasks = () => {
	const { tasks, isLoading, refetch } = useAdminTasks();
	const axiosSecure = useAxiosSecure();

	const handleDelete = async (id) => {
		try {
			const result = await Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it!",
				buttonsStyling: false,
				customClass: {
					confirmButton: "btn mr-5 bg-gradient-success",
					cancelButton: "btn bg-gradient-error",
				},
			});
			if (result.isConfirmed) {
				await axiosSecure.delete(`/admin/task/${id}`);
				refetch();
				await Swal.fire({
					icon: "success",
					title: "Task deleted successfully",
					buttonsStyling: false,
					customClass: {
						confirmButton: "btn mr-5 bg-gradient-success",
					},
				});
			}
		} catch (err) {
			console.error("Failed to delete task", err);
			toast.error("Failed to delete task");
		}
	};

	if (isLoading) return <ManageTasksSkeleton />;

	return (
		<div className='mt-10'>
			<PageTitle
				title='Manage Tasks'
				description='Oversee all platform tasks and moderate content.'
			/>
			<h2 className='text-xl font-semibold mb-4'>Manage Tasks</h2>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th>Task Title</th>
							<th>Buyer</th>
							<th>Coins</th>
							<th>Required</th>
							<th>Completed</th>
							<th>Status</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task) => (
							<tr key={task._id}>
								<td>{task.task_title}</td>
								<td>{task.posted_by}</td>
								<td>
									{task.payable_amount} <LuCoins className='inline' />
								</td>
								<td>{task.required_workers}</td>
								<td>{task.total_workers - task.required_workers}</td>
								<td className='capitalize'>
									<span
										className={`badge ${
											task?.status === "active"
												? "bg-gradient"
												: "bg-gradient-success"
										}`}>
										{task?.status}
									</span>
								</td>
								<td>
									<button
										className='btn bg-gradient-error btn-sm'
										onClick={() => handleDelete(task._id)}>
										<LuTrash2 className='inline' /> Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageTasks;
