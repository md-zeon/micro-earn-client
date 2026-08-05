import { useState } from "react";
import { Coins, CircleDollarSign, Wallet, History } from "lucide-react";
import { toast } from "sonner";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import useWithDrawals from "../../../hooks/useWithDrawals";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import WithdrawalForm from "../../../components/Form/WithdrawalForm";
import WithdrawalHistory from "../../../components/Dashboard/WithDrawalHistory";
import StatsCard from "../../../components/shared/StatsCard";
import WithdrawalsSkeleton from "../../../components/ui/WithdrawalsSkeleton";
import PageTitle from "../../../components/PageTitle";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";

const Withdrawals = () => {
	const { microCoins: coins, isLoading: isCoinsLoading, refetch: refetchCoins } =
		useAvailableCoins();
	const {
		withdrawals: withdrawalHistory,
		isLoading: isWithdrawalLoading,
		refetch: refetchWithdrawals,
	} = useWithDrawals();
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const [coinToWithdraw, setCoinToWithdraw] = useState(0);
	const [loading, setLoading] = useState(false);

	if (isCoinsLoading || isWithdrawalLoading) return <WithdrawalsSkeleton />;

	const handleSubmit = async (payload) => {
		setLoading(true);
		try {
			await axiosSecure.post("/withdrawals", {
				worker_email: user?.email,
				worker_name: user?.displayName,
				withdrawal_coin: payload.coinToWithdraw,
				withdrawal_amount: (payload.coinToWithdraw / 20).toFixed(2),
				payment_system: payload.paymentSystem,
				account_number: payload.accountNumber,
				withdraw_date: new Date().toISOString(),
				status: "pending",
			});

			toast.success("Withdrawal request submitted!");
			setCoinToWithdraw(0);
			refetchWithdrawals();
			refetchCoins();
		} catch (err) {
			console.error("Withdrawal error:", err);
			toast.error("Failed to submit withdrawal request. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<PageTitle
				title="Withdrawals"
				description="Request withdrawal of your earned money."
			/>

			<div>
				<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
					Withdrawals
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Convert your earned Micro Coins into real money.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<StatsCard
					label="Current Coins"
					Icon={Coins}
					value={coins}
					subtitle="Available for withdrawal"
					tone="info"
				/>
				<StatsCard
					label="Withdrawal Amount"
					Icon={CircleDollarSign}
					value={(coins / 20).toFixed(2)}
					subtitle="20 coins = $1"
					tone="success"
				/>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Wallet className="size-4" />
							Request Withdrawal
						</CardTitle>
						<CardDescription>
							Minimum withdrawal is 200 coins. Funds are reviewed before payout.
						</CardDescription>
					</CardHeader>
					<CardContent className="py-6">
						<WithdrawalForm
							coinToWithdraw={coinToWithdraw}
							setCoinToWithdraw={setCoinToWithdraw}
							onSubmit={handleSubmit}
							loading={loading}
							maxCoins={coins}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<History className="size-4" />
							Withdrawal History
						</CardTitle>
						<CardDescription>
							Track the status of your withdrawal requests.
						</CardDescription>
					</CardHeader>
					<WithdrawalHistory history={withdrawalHistory} />
				</Card>
			</div>
		</div>
	);
};

export default Withdrawals;
