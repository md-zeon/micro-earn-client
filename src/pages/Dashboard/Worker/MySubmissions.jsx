import { useQuery } from "@tanstack/react-query";
import { LuDollarSign, LuFileText } from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader";

const MySubmissions = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data: submissions = [], isLoading } = useQuery({
		queryKey: ["my-submissions", user?.email],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/submissions`);
			return data;
		},
		enabled: !!user?.email,
	});

	if (isLoading) return <Loader />;

	return (
		<div className='max-w-7xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-6 text-center text-gradient'>My Submissions</h1>

			{submissions.length === 0 ? (
				<div className='text-center text-gray-500'>No submissions yet.</div>
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
								<tr key={submission?._id}>
									<td>{index + 1}</td>
									<td className='font-medium'>{submission?.task_title}</td>
									<td>{new Date(submission?.submission_date).toLocaleDateString()}</td>
									<td className='flex items-center gap-1 text-green-500 font-semibold'>
										<LuDollarSign className='inline' />
										{submission.payable_amount}
									</td>
									<td>
										<span
											className={`badge ${
												submission.status === "pending"
													? "badge-warning"
													: submission.status === "approved"
													? "badge-success"
													: "badge-error"
											}`}
										>
											{submission.status}
										</span>
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

export default MySubmissions;
