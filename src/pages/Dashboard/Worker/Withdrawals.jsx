import useAvailableCoins from "../../../hooks/useAvailableCoins";
import { LuCoins, LuDollarSign } from "react-icons/lu";
import WithdrawalForm from "../../../components/Form/WithdrawalForm";
import WithdrawalHistory from "../../../components/Dashboard/WithDrawalHistory";
import StatsCard from "../../../components/shared/StatsCard";
import useWithDrawals from "../../../hooks/useWithDrawals";
import Container from "../../../components/Container";
import WithdrawalsSkeleton from "../../../components/ui/WithdrawalsSkeleton";
import PageTitle from "../../../components/PageTitle";

const Withdrawals = () => {
	const { microCoins: coins, isLoading: isCoinsLoading } = useAvailableCoins();
	const {
		withdrawals: withdrawalHistory,
		isLoading: isWithdrawalLoading,
		refetch: refetchWithdrawals,
	} = useWithDrawals();

	if (isCoinsLoading || isWithdrawalLoading) return <WithdrawalsSkeleton />;

	return (
		<Container>
			<div className='sm:px-4 py-8 min-h-screen space-y-6'>
				<PageTitle title="Withdrawals" description="Request withdrawal of your earned money." />
				<h1 className='text-3xl font-bold text-center text-gradient'>Withdrawals</h1>

				{/* Coin Stats */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<StatsCard
						label='Current Coins'
						Icon={LuCoins}
						value={coins}
						subtitle='Available for withdrawal'
						color='text-blue-600'
					/>
					<StatsCard
						label='Withdrawal Amount'
						Icon={LuDollarSign}
						value={(coins / 20).toFixed(2)}
						subtitle='20 coins = $1'
						color='text-green-600'
					/>
				</div>

				{/* Form & History */}
				<WithdrawalForm onSuccess={refetchWithdrawals} />
				<div className='bg-base-100 rounded-xl shadow-lg p-6'>
					<h2 className='text-2xl font-semibold mb-6 border-b pb-2'>Withdrawal History</h2>
					<WithdrawalHistory history={withdrawalHistory} />
				</div>
			</div>
		</Container>
	);
};

export default Withdrawals;
