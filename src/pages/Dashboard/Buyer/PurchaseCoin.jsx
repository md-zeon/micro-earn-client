// src/pages/Dashboard/Buyer/PurchaseCoin.jsx
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import Swal from "sweetalert2";
import { LuCoins, LuCreditCard, LuCheck } from "react-icons/lu";
import Loader from "../../../components/Loader";

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
					<div
						key={pkg.id}
						className={`card rounded-lg p-6 transition-all duration-200 hover:shadow-lg ${
							pkg.popular
								? "ring-2 ring-blue-400"
								: "ring-2 ring-base-200 hover:ring-blue-400 transition ease-linear duration-300"
						} ${processing && selectedPackage?.id === pkg.id ? "opacity-75" : ""}`}
					>
						{pkg.popular && (
							<div className='badge badge-lg text-xs bg-gradient absolute -top-2 left-1/2 transform -translate-x-1/2'>
								Most Popular
							</div>
						)}
						<div className='text-center pb-3'>
							<div className='flex items-center justify-center mb-2'>
								<LuCoins className='w-8 h-8 text-blue-400' />
							</div>
							<h2 className='text-2xl font-bold'>
								{pkg.coins} {pkg.bonus && <span className='text-green-600'>+{pkg.bonus}</span>} Coins
							</h2>
							<p className='text-3xl font-bold text-blue-400 mt-2'>${pkg.price}</p>
							{pkg.bonus && <div className='badge badge-secondary mt-2'>Bonus: {pkg.bonus} coins</div>}
						</div>
						<div className='space-y-2 mt-4'>
							<div className='flex justify-between text-sm'>
								<span>Base Coins:</span>
								<span className='font-semibold'>{pkg.coins}</span>
							</div>
							{pkg.bonus && (
								<div className='flex justify-between text-sm text-green-600'>
									<span>Bonus Coins:</span>
									<span className='font-semibold'>+{pkg.bonus}</span>
								</div>
							)}
							<div className='flex justify-between text-sm font-semibold border-t pt-2'>
								<span>Total Coins:</span>
								<span className='text-blue-400'>{pkg.coins + (pkg.bonus || 0)}</span>
							</div>
							<div className='flex justify-between text-sm text-gray-500'>
								<span>Price per coin:</span>
								<span>${(pkg.price / (pkg.coins + (pkg.bonus || 0))).toFixed(3)}</span>
							</div>
						</div>
						<button
							className='btn w-full mt-4 bg-gradient hover:opacity-80'
							onClick={() => handlePurchase(pkg)}
							disabled={processing}
						>
							{processing && selectedPackage?.id === pkg.id ? (
								<div className='flex items-center gap-2'>
									<Loader size='sm' />
									Processing...
								</div>
							) : (
								<div className='flex items-center gap-2'>
									<LuCreditCard className='w-4 h-4' />
									Purchase Now
								</div>
							)}
						</button>
					</div>
				))}
			</div>

			<div className='card shadow-md rounded-lg p-4'>
				<div className='card-title flex items-center gap-2'>
					<LuCreditCard className='w-5 h-5' />
					Payment Information
				</div>
				<div className='card-content space-y-4 mt-4'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div className='flex items-center gap-3'>
							<div className='w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center'>
								<LuCheck className='w-4 h-4 text-green-600' />
							</div>
							<div>
								<p className='font-semibold'>Secure Payment</p>
								<p className='text-sm text-gray-500'>SSL encrypted transactions</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
								<LuCreditCard className='w-4 h-4 text-blue-400' />
							</div>
							<div>
								<p className='font-semibold'>Multiple Methods</p>
								<p className='text-sm text-gray-500'>Credit/Debit cards accepted</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center'>
								<LuCoins className='w-4 h-4 text-purple-600' />
							</div>
							<div>
								<p className='font-semibold'>Instant Delivery</p>
								<p className='text-sm text-gray-500'>Coins added immediately</p>
							</div>
						</div>
					</div>
					<div className='bg-base-200 p-4 rounded-lg'>
						<h4 className='font-semibold mb-2'>How it works:</h4>
						<ol className='list-decimal list-inside space-y-1 text-sm text-gray-500'>
							<li>Select a coin package that suits your needs</li>
							<li>Complete the secure payment process</li>
							<li>Coins are instantly added to your account</li>
							<li>Start creating tasks or purchasing services</li>
						</ol>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PurchaseCoin;
