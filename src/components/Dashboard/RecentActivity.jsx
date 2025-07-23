import { LuCreditCard } from "react-icons/lu";

const RecentActivity = ({ payments }) => {
	return (
		<div className='p-6 rounded-2xl shadow-sm mt-10'>
			<h2 className='text-xl font-semibold mb-4'>Recent Activity</h2>
			<div className='space-y-3'>
				{payments.map((payment) => (
					<div
						key={payment._id}
						className='flex justify-between items-center p-4 rounded-xl hover:bg-base-200 transition gap-2'
					>
						{/* Left section: icon + info */}
						<div className='flex items-center gap-4'>
							<div className='bg-blue-100 text-blue-500 p-3 rounded-full'>
								<LuCreditCard className='text-xl' />
							</div>
							<div>
								<p className='font-medium'>Purchased {payment.coins_purchased} coins</p>
								<p className='text-sm text-gray-500'>{new Date(payment.payment_date).toLocaleDateString()}</p>
							</div>
						</div>

						{/* Right section: amount + status */}
						<div className='text-right'>
							<p className='text-green-600 font-semibold'>${payment.amount_paid}</p>
							<span className='text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full'>{payment.status}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecentActivity;
