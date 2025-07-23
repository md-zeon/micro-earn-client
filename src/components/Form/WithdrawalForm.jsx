import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { LuCoins, LuDollarSign } from "react-icons/lu";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useAvailableCoins from "../../hooks/useAvailableCoins";

const WithdrawalForm = ({ onSuccess }) => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const axiosSecure = useAxiosSecure();
	const { microCoins: coins, isLoading } = useAvailableCoins();

	const [coinToWithdraw, setCoinToWithdraw] = useState("");
	const [withdrawalAmount, setWithdrawalAmount] = useState(0);
	const [paymentSystem, setPaymentSystem] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const coinNum = parseInt(coinToWithdraw);
		if (!isNaN(coinNum)) {
			setWithdrawalAmount((coinNum / 20).toFixed(2));
		} else {
			setWithdrawalAmount(0);
		}
	}, [coinToWithdraw]);

	const handleWithdraw = async (e) => {
		e.preventDefault();
		const coinNum = parseInt(coinToWithdraw);

		if (coinNum > coins) return toast.error("Cannot withdraw more coins than you have");
		if (coinNum < 200) return toast.error("Minimum 200 coins required to withdraw");

		setLoading(true);
		const withdrawalData = {
			worker_email: user?.email,
			worker_name: user?.displayName,
			withdrawal_coin: coinNum,
			withdrawal_amount: parseFloat(withdrawalAmount),
			payment_system: paymentSystem,
			account_number: accountNumber,
			withdraw_date: new Date().toISOString(),
		};

		try {
			await axiosSecure.post("/withdrawals", withdrawalData);
			await axiosSecure.patch("/update-coins", {
				coinsToUpdate: coinNum,
				status: "decrease",
			});
			toast.success(`Withdrawal request for $${withdrawalAmount} submitted successfully!`);
			onSuccess(); // Refresh history
			navigate("/dashboard");
		} catch (err) {
			console.error(err);
			toast.error("Failed to submit withdrawal request");
		} finally {
			setLoading(false);
			setCoinToWithdraw("");
			setPaymentSystem("");
			setAccountNumber("");
		}
	};

	const canWithdraw = coins >= 200 && parseInt(coinToWithdraw) >= 200;

	return (
		<div className='rounded-xl shadow-lg p-6'>
			<h2 className='text-2xl font-semibold mb-6 border-b pb-2'>Request Withdrawal</h2>
			<p className='text-sm mb-6'>Minimum: 200 coins ($10) | 20 coins = $1</p>

			<form
				onSubmit={handleWithdraw}
				className='space-y-6'
			>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{/* Coin Input */}
					<div className='space-y-2'>
						<label className='block'>Coins to Withdraw</label>
						<input
							type='number'
							value={coinToWithdraw}
							onChange={(e) => setCoinToWithdraw(e.target.value)}
							min='200'
							max={coins}
							onWheel={(e) => e.target.blur()}
							className='input input-bordered w-full p-2'
							placeholder='Enter coins'
							required
						/>
						{coinToWithdraw && parseInt(coinToWithdraw) < 200 ? (
							<p className='text-sm text-red-600'>Minimum 200 coins required</p>
						) : coinToWithdraw && parseInt(coinToWithdraw) > coins ? (
							<p className='text-sm text-red-600'>Insufficient coins</p>
						) : null}
					</div>

					{/* Amount */}
					<div className='space-y-2'>
						<label className='block'>Withdrawal Amount ($)</label>
						<input
							type='number'
							value={withdrawalAmount}
							readOnly
							className='input input-bordered w-full p-2'
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{/* Payment System */}
					<div className='space-y-2'>
						<label className='block'>Payment System</label>
						<select
							value={paymentSystem}
							onChange={(e) => setPaymentSystem(e.target.value)}
							className='select select-bordered w-full p-2'
							required
						>
							<option value=''>Select a method</option>
							<option value='bkash'>Bkash</option>
							<option value='rocket'>Rocket</option>
							<option value='nagad'>Nagad</option>
							<option value='paypal'>PayPal</option>
							<option value='bank'>Bank Transfer</option>
						</select>
					</div>

					{/* Account Number */}
					<div className='space-y-2'>
						<label className='block'>Account Number</label>
						<input
							type='text'
							value={accountNumber}
							onChange={(e) => setAccountNumber(e.target.value)}
							className='input input-bordered w-full p-2'
							placeholder='Enter account number'
							required
						/>
					</div>
				</div>

				{/* Button */}
				{!canWithdraw ? (
					<div className='text-center py-4'>
						<p className='mb-2'>Insufficient coins</p>
						<div className='badge bg-gradient-error'>Minimum 200 coins required</div>
					</div>
				) : (
					<button
						type='submit'
						className='btn w-full bg-gradient'
						disabled={loading || !coinToWithdraw || !paymentSystem || !accountNumber}
					>
						{loading ? "Processing..." : "Submit Withdrawal Request"}
					</button>
				)}
			</form>
		</div>
	);
};

export default WithdrawalForm;
