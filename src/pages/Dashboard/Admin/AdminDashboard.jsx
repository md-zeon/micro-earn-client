import Loader from "../../../components/Loader";
import StatsCard from "../../../components/shared/StatsCard";
import useAdminStats from "../../../hooks/useAdminStats";
import useWithdrawRequests from "../../../hooks/useWithdrawRequests";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { LuUsers, LuCoins, LuCreditCard, LuUserCheck, LuUserRound } from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import toast from "react-hot-toast";

const AdminDashboard = ({ greeting }) => {
	const { user } = useAuth();
	const { adminStats: stats, isLoading: isStatsLoading } = useAdminStats();
	const { withdrawRequests, isWithdrawLoading, refetch } = useWithdrawRequests();
	const axiosSecure = useAxiosSecure();

	if (isStatsLoading || isWithdrawLoading) return <Loader />;

	const handleApprove = async (withdraw) => {
		try {
			await axiosSecure.patch(`/admin/approve-withdraw/${withdraw._id}`, {
				email: withdraw.userId,
				amount: withdraw.amount,
			});
			toast.success("Withdrawal Approved");
			refetch();
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
				<h2 className='text-xl font-semibold mb-4'>Pending Withdraw Requests</h2>
				<div className='overflow-x-auto'>
					<table className='table w-full'>
						<thead>
							<tr>
								<th>User</th>
								<th>Email</th>
								<th>Amount</th>
								<th>Date</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{withdrawRequests.map((withdraw) => (
								<tr key={withdraw._id}>
									<td>{withdraw.display_name}</td>
									<td>{withdraw.user_email}</td>
									<td>{withdraw.amount} coins</td>
									<td>{new Date(withdraw.date).toLocaleDateString()}</td>
									<td>{withdraw.status}</td>
									<td>
										<button
											onClick={() => handleApprove(withdraw)}
											className='btn btn-success btn-sm'
										>
											Approve
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
