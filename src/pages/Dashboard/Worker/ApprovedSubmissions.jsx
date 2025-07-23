import { LuDollarSign, LuFileText } from "react-icons/lu";
import Loader from "../../../components/Loader";
import useWorkerSubmissions from "../../../hooks/useWorkerSubmissions";

const ApprovedSubmissions = () => {
	const { submissions: data, isLoading } = useWorkerSubmissions();

	if (isLoading) return <Loader />;

	const submissions = data.filter((submission) => submission.status === "approved");

	return (
		<div className='max-w-7xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-6 text-center text-gradient'>Approved Submissions</h1>

			{submissions.length === 0 ? (
				<div className='text-center text-gray-500'>No approved submissions yet.</div>
			) : (
				<div className='overflow-x-auto shadow rounded-lg'>
					<table className='table table-zebra w-full'>
						<thead>
							<tr className='text-sm text-gray-600'>
								<th>#</th>
								<th>Task</th>
								<th>Submitted On</th>
								<th>Payment</th>
								<th>Status</th>
								<th>Details</th>
							</tr>
						</thead>
						<tbody>
							{submissions.map((submission, index) => (
								<tr key={submission._id}>
									<td>{index + 1}</td>
									<td className='font-medium'>{submission.task_title}</td>
									<td>{new Date(submission.submission_date).toLocaleDateString()}</td>
									<td className='flex items-center gap-1 text-green-500 font-semibold'>
										<LuDollarSign className='inline' />
										{submission.payable_amount}
									</td>
									<td>
										<span className='badge badge-success'>Approved</span>
									</td>
									<td>
										<div
											className='tooltip tooltip-left'
											data-tip={submission.submission_details}
										>
											<button className='btn btn-sm btn-ghost text-blue-500'>
												<LuFileText className='w-5 h-5' />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default ApprovedSubmissions;
