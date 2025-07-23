import Loader from "../../../components/Loader";
import StatsCard from "../../../components/shared/StatsCard";
import useAdminStats from "../../../hooks/useAdminStats";
import { LuUsers, LuCoins, LuCreditCard, LuUserCheck } from "react-icons/lu";
const AdminDashboard = () => {
	const { adminStats: stats, isLoading: isStatsLoading } = useAdminStats();
	console.log(stats);
	if (isStatsLoading) return <Loader />;
	return (
		<div>
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
