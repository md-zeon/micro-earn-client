const WithdrawRequestTable = ({ withdrawRequests, handleApprove }) => {
	if (withdrawRequests.length <= 0) {
		return (
			<div className='mt-10'>
				<p className='text-gray-500 text-center font-semibold mb-4'>No pending withdraw requests</p>
			</div>
		);
	}

	return (
		<div className='overflow-x-auto'>
			<table className='table w-full'>
				<thead>
					<tr>
						<th>User</th>
						<th>Email</th>
						<th>Withdrawal Amount</th>
						<th>Withdraw Date</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{withdrawRequests.map((withdraw) => (
						<tr key={withdraw._id}>
							<td>{withdraw.worker_name}</td>
							<td>{withdraw.worker_email}</td>
							<td className='text-green-500'>{withdraw.withdrawal_amount} $</td>
							<td>{new Date(withdraw.withdraw_date).toLocaleDateString()}</td>
							<td>
								<span
									className={`badge ${withdraw.status === "pending" ? "bg-gradient-warning" : "bg-gradient-success"}`}
								>
									{withdraw.status}
								</span>
							</td>
							<td>
								<button
									onClick={() => handleApprove(withdraw)}
									className='btn bg-gradient-success btn-sm'
									disabled={withdraw.status === "approved"}
								>
									Approve
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default WithdrawRequestTable;
