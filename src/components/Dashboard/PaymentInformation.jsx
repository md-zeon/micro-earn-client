import { LuCoins, LuCreditCard, LuCheck } from "react-icons/lu";
const PaymentInformation = () => {
	return (
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
	);
};

export default PaymentInformation;
