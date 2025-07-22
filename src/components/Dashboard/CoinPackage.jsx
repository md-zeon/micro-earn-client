import { LuCoins, LuCreditCard } from "react-icons/lu";

const CoinPackage = ({ pkg, handlePurchase, selectedPackage, processing }) => {
	return (
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
	);
};

export default CoinPackage;
