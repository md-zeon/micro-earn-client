import useAdminUsers from "../../../hooks/useAdminUsers";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { LuCoins } from "react-icons/lu";
import Swal from "sweetalert2";
import ManageUsersSkeleton from "../../../components/ui/ManageUsersSkeleton";
import PageTitle from "../../../components/PageTitle";

const ManageUsers = () => {
	const { users, isLoading, refetch } = useAdminUsers();
	const axiosSecure = useAxiosSecure();

	const handleRoleChange = async (id, role) => {
		try {
			await axiosSecure.patch(`/update-role/user/${id}`, { role });
			toast.success("Role updated");
			refetch();
		} catch (err) {
			console.error("Failed to update role", err);
			toast.error("Failed to update role");
		}
	};

	const handleDelete = async (id) => {
		try {
			const result = await Swal.fire({
				title: "Are you sure?",
				text: "You really want to delete this user!",
				icon: "warning",
				showCancelButton: true,
				buttonsStyling: false,
				customClass: {
					confirmButton: "btn mr-5 bg-gradient-error",
					cancelButton: "btn bg-gradient-success",
				},
				confirmButtonText: "Yes, delete user!",
			});
			if (result.isConfirmed) {
				await axiosSecure.delete(`/user/${id}`);
				refetch();
				await Swal.fire({
					icon: "success",
					title: "User deleted",
					buttonsStyling: false,
					customClass: {
						confirmButton: "btn mr-5 bg-gradient-success",
					},
				});
			}
		} catch (err) {
			console.error("Failed to delete user", err);
			Swal.fire({
				icon: "error",
				title: "Failed to delete user",
				buttonsStyling: false,
				customClass: {
					confirmButton: "btn mr-5 bg-gradient-error",
				},
			});
		}
	};

	if (isLoading) return <ManageUsersSkeleton />;

	return (
		<div className='mt-10'>
			<PageTitle
				title='Manage Users'
				description='Manage platform users, roles, and account statuses.'
			/>
			<h2 className='text-xl font-semibold mb-4'>Manage Users</h2>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th>Photo</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Micro Coins</th>
							<th>Update Role</th>
							<th>Remove</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user?._id}>
								<td>
									<div className='avatar'>
										<div className='w-10 h-10 rounded-full'>
											<img
												src={user?.photoURL}
												alt='User'
											/>
										</div>
									</div>
								</td>
								<td>{user?.name || "N/A"}</td>
								<td>{user?.email || "N/A"}</td>
								<td className='capitalize'>{user?.role || "No Role"}</td>
								<td>
									{user?.microCoins} <LuCoins className='inline' />
								</td>
								<td>
									<select
										className='select select-bordered select-sm'
										value={user?.role}
										onChange={(e) => handleRoleChange(user?._id, e.target.value)}
									>
										<option value='worker'>Worker</option>
										<option value='buyer'>Buyer</option>
										<option value='admin'>Admin</option>
									</select>
								</td>
								<td>
									<button
										className='btn bg-gradient-error btn-sm'
										onClick={() => handleDelete(user?._id)}
									>
										Delete
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

export default ManageUsers;
