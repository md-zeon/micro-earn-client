// components/Skeletons/WithdrawalsSkeleton.jsx
import { LuCoins, LuDollarSign } from "react-icons/lu";

const WithdrawalsSkeleton = () => {
	return (
		<div className='sm:px-4 py-8 min-h-screen space-y-6 animate-pulse'>
			<div className='h-8 w-48 bg-gray-300 rounded mx-auto' />

			{/* Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{[...Array(2)].map((_, i) => (
					<div key={i} className='bg-base-100 rounded-xl shadow-md p-6 border border-gray-500 space-y-3'>
						<div className='flex items-center gap-4'>
							<div className='w-10 h-10 bg-gray-300 rounded-full'></div>
							<div className='h-6 w-1/2 bg-gray-300 rounded'></div>
						</div>
						<div className='h-4 w-1/3 bg-gray-200 rounded'></div>
					</div>
				))}
			</div>

			{/* Withdrawal Form */}
			<div className='bg-base-100 rounded-xl shadow-md p-6 border border-gray-500 space-y-4'>
				<div className='h-6 w-1/3 bg-gray-300 rounded'></div>
				<div className='h-10 bg-gray-200 rounded'></div>
				<div className='h-10 bg-gray-200 rounded'></div>
				<div className='h-32 bg-gray-200 rounded'></div>
				<div className='h-12 bg-gray-300 rounded'></div>
			</div>

			{/* Withdrawal History */}
			<div className='bg-base-100 rounded-xl shadow-md p-6 border border-gray-500 space-y-4'>
				<div className='h-6 w-1/2 bg-gray-300 rounded'></div>
				{[...Array(3)].map((_, i) => (
					<div key={i} className='flex justify-between items-center'>
						<div className='h-4 w-1/3 bg-gray-200 rounded'></div>
						<div className='h-4 w-20 bg-gray-200 rounded'></div>
					</div>
				))}
			</div>
		</div>
	);
};

export default WithdrawalsSkeleton;
