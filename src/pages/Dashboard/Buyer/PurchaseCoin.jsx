import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import Loader from "../../../components/Loader";
import PaymentInformation from "../../../components/Dashboard/PaymentInformation";
import CoinPackage from "../../../components/Dashboard/CoinPackage";

const PurchaseCoin = () => {
	const axiosSecure = useAxiosSecure();
	const { microCoins, refetch: refetchCoins, isLoading: coinsLoading } = useAvailableCoins();
	const [selectedPackage, setSelectedPackage] = useState(null);
	const [processing, setProcessing] = useState(false);

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
	const handlePurchase = async (pkg) => {
		setSelectedPackage(pkg);
		setProcessing(true);
	};

	if (coinsLoading) return <Loader />;

	return (
		<div className='max-w-6xl mx-auto px-4 py-6 space-y-6'>
			<div className='text-center'>
				<h1 className='text-3xl font-bold mb-2'>Purchase Coins</h1>
				<p className='text-gray-500'>Choose a package to add coins to your account</p>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
				{coinPackages.map((pkg) => (
                    <CoinPackage key={pkg.id} pkg={pkg} handlePurchase={handlePurchase} selectedPackage={selectedPackage} processing={processing} />
				))}
			</div>
			<PaymentInformation />
		</div>
	);
};

export default PurchaseCoin;
