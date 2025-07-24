import Loader from "../../../components/Loader";
import StatsCard from "../../../components/shared/StatsCard";
import useAdminStats from "../../../hooks/useAdminStats";
import useWithdrawRequests from "../../../hooks/useWithdrawRequests";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { LuUsers, LuCoins, LuCreditCard, LuUserCheck, LuUserRound } from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AdminDashboard = ({ greeting }) => {
	const { user } = useAuth();
	const { adminStats: stats, isLoading: isStatsLoading } = useAdminStats();
	const { withdrawRequests, isWithdrawLoading, refetch } = useWithdrawRequests();
	const axiosSecure = useAxiosSecure();

	if (isStatsLoading || isWithdrawLoading) return <Loader />;

	const handleApprove = async (withdraw) => {
		try {
			const result = await Swal.fire({
				title: "Are you sure?",
				text: "You want to approve this withdrawal request?",
				icon: "warning",
				showCancelButton: true,
				customClass: {
					confirmButton: "btn bg-gradient-success",
					cancelButton: "btn bg-gradient-error",
				},
				confirmButtonText: "Yes, approve it!",
			});
			if (result.isConfirmed) {
				// update withdraw status
				await axiosSecure.patch(`/admin/approve-withdraw/${withdraw._id}`, {
					status: "approved",
				});
				// update coins
				await axiosSecure.patch(`/update-coins/${withdraw?.worker_email}`, {
					coinsToUpdate: withdraw?.withdrawal_coin,
					status: "decrease",
				});
				toast.success("Withdrawal Approved");
				refetch();
			}
		} catch (err) {
			console.log("Error approving withdrawal:", err);
			toast.error("Failed to approve withdrawal");
		}
	};

	return (
		<div className='space-y-8'>
			<div className='px-4'>
				<div className='flex items-center justify-between flex-wrap'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight mb-2'>{greeting},</h1>
						<p>{user?.displayName || "Admin"}! Monitor platform activity and manage users.</p>
					</div>
					<Link
						to='/dashboard/profile'
						className='btn bg-gradient'
					>
						<LuUserRound className='w-4 h-4 mr-2' />
						Profile
					</Link>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
				<StatsCard
					label='Total Workers'
					Icon={LuUsers}
					value={stats?.totalWorkers}
					subtitle='Active workers on platform'
				/>
				<StatsCard
					label='Total Buyers'
					Icon={LuUserCheck}
					value={stats?.totalBuyers}
					subtitle='Active buyers on platform'
				/>
				<StatsCard
					label='Platform Coins'
					Icon={LuCoins}
					value={stats?.totalCoins}
					subtitle='Total coins in circulation'
				/>
				<StatsCard
					label='Total Payments'
					Icon={LuCreditCard}
					value={`$${stats?.totalPayments?.toFixed(2)}`}
					subtitle='Total payments processed'
				/>
			</div>

			<div className='mt-10'>
				<h2 className='text-2xl font-semibold mb-2'>Withdrawal Requests</h2>
				<p className="text-gray-400 text-xs mb-4">Pending withdrawal requests from workers</p>
			{
				withdrawRequests.length > 0 ? (
				<div className='overflow-x-auto'>
					<table className='table w-full'>
						<thead>
							<tr>
								<th>User</th>
								<th>Email</th>
								<th>Withdrawal Amount</th>
								<th>Withdraw Date</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{withdrawRequests.map((withdraw) => (
								<tr key={withdraw._id}>
									<td>{withdraw.worker_name}</td>
									<td>{withdraw.worker_email}</td>
									<td className="text-green-500">{withdraw.withdrawal_amount} $</td>
									<td>{new Date(withdraw.withdraw_date).toLocaleDateString()}</td>
									<td>
										<span className={`badge ${withdraw.status === "pending" ? "bg-gradient-warning" : "bg-gradient-success"}`}>{withdraw.status}</span>
									</td>
									<td>
										<button
											onClick={() => handleApprove(withdraw)}
											className='btn bg-gradient-success btn-sm'
										>
											Approve
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				) : (
					<div className='mt-10'>
						<p className='text-gradient text-center font-semibold mb-4'>No pending withdraw requests</p>
					</div>
				)
			}
			</div>
		</div>
	);
};

export default AdminDashboard;
