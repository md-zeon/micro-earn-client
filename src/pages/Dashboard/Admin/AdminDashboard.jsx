import Loader from "../../../components/Loader";
import StatsCard from "../../../components/shared/StatsCard";
import useAdminStats from "../../../hooks/useAdminStats";
import { LuUsers, LuCoins, LuCreditCard, LuUserCheck, LuPlus } from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
const AdminDashboard = ({ greeting }) => {
	const { user } = useAuth();
	const { adminStats: stats, isLoading: isStatsLoading } = useAdminStats();
	console.log(stats);
	if (isStatsLoading) return <Loader />;
	return (
		<div className="space-y-8">
			<div className='px-4'>
				<div className='flex items-center justify-between flex-wrap'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight mb-2'>{greeting},</h1>
						<p>{user?.displayName || "Admin"}! Monitor platform activity and manage users.</p>
					</div>
					<Link
						to='/dashboard/add-task'
						className='btn bg-gradient'
					>
						<LuPlus className='w-4 h-4 mr-2' />
						Add New Task
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
		</div>
	);
};

export default AdminDashboard;
