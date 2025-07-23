import { LuCalendar, LuCreditCard, LuCoins } from "react-icons/lu";

const PaymentTable = ({ payments }) => {
	return (
		<div className='overflow-x-auto '>
			<table className='table w-full'>
				<thead>
					<tr className='bg-base-300'>
						<th>Date</th>
						<th>Coins Purchased</th>
						<th>Amount Paid</th>
						<th>Payment Method</th>
						<th>Status</th>
						<th>Transaction ID</th>
					</tr>
				</thead>
				<tbody>
					{payments.map((payment) => (
						<tr key={payment._id}>
							<td className='flex items-center gap-1'>
								<LuCalendar className='inline' />
								<span>{new Date(payment.payment_date).toLocaleDateString()}</span>
							</td>
							<td>
								<LuCoins className='inline text-blue-600' /> {payment.coins_purchased}
							</td>
							<td className='text-green-600 font-semibold'>${payment.amount_paid}</td>
							<td className='flex items-center gap-2'>
								<LuCreditCard className='inline' /> {payment.method || "Stripe"}
							</td>
							<td>
								<span className='badge bg-gradient-success badge-outline lowercase'>{payment.status || "completed"}</span>
							</td>
							<td>
								<span className=''>{payment.transaction_id || "N/A"}</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PaymentTable;
