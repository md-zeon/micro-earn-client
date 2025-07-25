import { LuDollarSign, LuClock, LuCheck } from "react-icons/lu";

const WithdrawalHistory = ({ history = [] }) => {
	const getStatusColor = (status) => {
		switch (status) {
			case "approved":
				return "bg-green-100 text-green-800 border-green-200";
			case "rejected":
				return "bg-red-100 text-red-800 border-red-200";
			case "pending":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	if (history.length === 0) {
		return (
			<div className='text-center py-8'>
				<LuDollarSign className='w-16 h-16 mx-auto mb-4' />
				<h3 className='text-lg font-semibold mb-2'>No withdrawal history</h3>
				<p>Your withdrawal requests will appear here.</p>
			</div>
		);
	}

	return (
		<div className='overflow-x-auto'>
			<table className='table w-full'>
				<thead>
					<tr className='text-gray-500'>
						<th className='px-4 py-3 text-left'>Amount ($)</th>
						<th className='px-4 py-3 text-left'>Coins</th>
						<th className='px-4 py-3 text-left'>Payment Method</th>
						<th className='px-4 py-3 text-left'>Date</th>
						<th className='px-4 py-3 text-left'>Status</th>
					</tr>
				</thead>
				<tbody>
					{history.map((req) => (
						<tr
							key={req._id}
							className='hover:bg-base-100'
						>
							<td className='px-4 py-4 font-medium'>${req.withdrawal_amount}</td>
							<td className='px-4 py-4'>{req.withdrawal_coin} coins</td>
							<td className='px-4 py-4 capitalize'>{req.payment_system}</td>
							<td className='px-4 py-4'>{new Date(req.withdraw_date).toLocaleDateString()}</td>
							<td className='px-4 py-4'>
								<div className={`badge ${getStatusColor(req.status)} flex items-center gap-1`}>
									{req.status === "pending" && <LuClock className='w-3 h-3' />}
									{req.status === "approved" && <LuCheck className='w-3 h-3' />}
									{req.status}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default WithdrawalHistory;
