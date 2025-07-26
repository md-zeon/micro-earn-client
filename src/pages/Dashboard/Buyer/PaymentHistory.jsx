import { LuCoins, LuCreditCard, LuDollarSign } from "react-icons/lu";
import StatsCard from "../../../components/shared/StatsCard";
import PaymentTable from "../../../components/Table/PaymentTable";
import useBuyerPayments from "../../../hooks/useBuyerPayments";
import RecentActivity from "../../../components/Dashboard/RecentActivity";
import DashboardSkeleton from "../../../components/ui/DashboardSkeleton";
import PageTitle from "../../../components/PageTitle";

const PaymentHistory = () => {
	const { payments, isPaymentsLoading } = useBuyerPayments();
	const totalSpent = payments.reduce((sum, payment) => sum + payment.amount_paid, 0);
	const totalCoinsPurchased = payments.reduce((sum, payment) => sum + payment.coins_purchased, 0);

	return (
		<div>
			<PageTitle title="Payment History" description="View your complete payment and transaction history." />
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Payment History</h1>
				<button className='btn btn-sm bg-gradient-success rounded-full cursor-pointer'>{payments.length}</button>
			</div>
			{isPaymentsLoading && <DashboardSkeleton statsCount={3} showTable={true} />}
			{/* Stats Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6'>
				<StatsCard
					Icon={LuDollarSign}
					label='Total Spent'
					value={`$${totalSpent}`}
					color='text-blue-400'
				/>
				<StatsCard
					Icon={LuCoins}
					label='Total Coins Purchased'
					value={totalCoinsPurchased}
					color='text-green-400'
				/>
				<StatsCard
					Icon={LuCreditCard}
					label='Transactions'
					value={payments.length}
					color='text-blue-400'
				/>
			</div>

			{/* Payment Table */}
			<div className='mb-6'>
				<h2 className="text-xl font-bold mb-4 flex items-center gap-1"><LuCreditCard className="inline" /> Transaction History</h2>
			</div>
			<PaymentTable payments={payments} />
			{/* Recent Activity */}
			<RecentActivity payments={payments} />
		</div>
	);
};

export default PaymentHistory;
