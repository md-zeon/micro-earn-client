import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import Swal from "sweetalert2";
import PaymentInformation from "../../../components/Dashboard/PaymentInformation";
import CoinPackage from "../../../components/Dashboard/CoinPackage";
import PurchaseModal from "../../../components/Modals/PurchaseModal";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../../hooks/useAuth";
import PurchaseCoinSkeleton from "../../../components/ui/PurchaseCoinSkeleton";
import PageTitle from "../../../components/PageTitle";

// Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const PurchaseCoin = () => {
	const axiosSecure = useAxiosSecure();
	const { refetch: refetchCoins, isMicroCoinsLoading: coinsLoading } =
		useAvailableCoins();
	const [selectedPackage, setSelectedPackage] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { user } = useAuth();

	// Coin packages
	const coinPackages = [
		{ id: "starter", coins: 100, price: 10 },
		{ id: "popular", coins: 300, price: 25, popular: true, bonus: 50 },
		{ id: "value", coins: 600, price: 45, bonus: 100 },
		{ id: "pro", coins: 800, price: 60, bonus: 150 },
		{ id: "premium", coins: 1200, price: 80, bonus: 300 },
		{ id: "elite", coins: 2000, price: 130, bonus: 500 },
	];

	// Handle Purchase
	const handlePurchase = async (pkg, receivedTransactionId) => {
		// console.log("Transaction ID received in handlePurchase:", receivedTransactionId);
		setProcessing(true);
		try {
			const totalCoins = pkg.coins + (pkg.bonus || 0);

			await axiosSecure.post("/payments", {
				transaction_id: receivedTransactionId,
				buyer_email: user?.email,
				buyer_name: user?.displayName,
				coins_purchased: totalCoins,
				amount_paid: pkg?.price,
				payment_date: new Date().toISOString(),
				payment_method: "stripe",
				status: "completed",
			});

			await axiosSecure.patch(`/user/update-coins/${user?.email}`, {
				coinsToUpdate: totalCoins,
				status: "increase",
			});

			refetchCoins();

			Swal.fire({
				title: "Payment Successful!",
				text: `${totalCoins} coins have been added to your account.`,
				icon: "success",
				confirmButtonText: "OK",
				buttonsStyling: false,
				customClass: {
					confirmButton: "btn mr-5 bg-gradient",
				},
			});
		} catch (err) {
			console.error("Purchase Error:", err);
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: "Payment failed. Please try again.",
				buttonsStyling: false,
				customClass: {
					confirmButton: "btn mr-5 bg-gradient-error",
				},
			});
		} finally {
			setProcessing(false);
			setIsModalOpen(false);
			setSelectedPackage(null);
		}
	};

	if (coinsLoading) return <PurchaseCoinSkeleton />;

	return (
		<div className='max-w-6xl mx-auto px-4 py-6 space-y-6'>
			<PageTitle
				title='Purchase Coins'
				description='Buy coins to pay workers for completing your tasks.'
			/>
			<div className='text-center'>
				<h1 className='text-3xl font-bold mb-2'>Purchase Coins</h1>
				<p className='text-gray-500'>
					Choose a package to add coins to your account
				</p>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
				{coinPackages.map((pkg) => (
					<CoinPackage
						key={pkg.id}
						pkg={pkg}
						selectedPackage={selectedPackage}
						processing={processing}
						setSelectedPackage={setSelectedPackage}
						setIsModalOpen={setIsModalOpen}
					/>
				))}
			</div>
			<PaymentInformation />
			{/* Modal */}
			<PurchaseModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setSelectedPackage(null);
				}}
				package={selectedPackage}
				onPurchase={handlePurchase}
				processing={processing}
				stripePromise={stripePromise}
			/>
		</div>
	);
};

export default PurchaseCoin;
