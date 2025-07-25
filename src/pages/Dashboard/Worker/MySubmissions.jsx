import { useState } from "react";
import { LuDollarSign, LuFileText } from "react-icons/lu";
import useWorkerSubmissions from "../../../hooks/useWorkerSubmissions";
import Container from "../../../components/Container";
import MySubmissionsSkeleton from "../../../components/ui/MySubmissionsSkeleton";

const itemsPerPage = 5;

const MySubmissions = () => {
	const { submissions, isLoading } = useWorkerSubmissions();
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredStatus, setFilteredStatus] = useState("all");

	if (isLoading) return <MySubmissionsSkeleton />;

	// Filter logic
	const filteredSubmissions =
		filteredStatus === "all" ? submissions : submissions.filter((s) => s.status === filteredStatus);

	// Pagination logic
	const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedSubmissions = filteredSubmissions.slice(startIndex, startIndex + itemsPerPage);

	const handleStatusChange = (status) => {
		setFilteredStatus(status);
		setCurrentPage(1);
	};

	return (
		<Container>
			<div className='px-4 py-3'>
				<h1 className='text-3xl font-bold mb-6 text-center text-gradient'>My Submissions</h1>

				{/* Filter Controls */}
				<div className='flex flex-wrap items-center justify-between mb-4'>
					<div className='gap-2 flex items-center justify-center sm:justify-start flex-wrap'>
						<button
							onClick={() => handleStatusChange("all")}
							className={`btn btn-sm ${filteredStatus === "all" ? "bg-gradient" : "btn-outline"}`}
						>
							All
						</button>
						<button
							onClick={() => handleStatusChange("pending")}
							className={`btn btn-sm ${
								filteredStatus === "pending" ? "bg-gradient-warning text-white" : "btn-outline"
							}`}
						>
							Pending
						</button>
						<button
							onClick={() => handleStatusChange("approved")}
							className={`btn btn-sm ${filteredStatus === "approved" ? "bg-gradient-success" : "btn-outline"}`}
						>
							Approved
						</button>
						<button
							onClick={() => handleStatusChange("rejected")}
							className={`btn btn-sm ${filteredStatus === "rejected" ? "bg-gradient-error text-white" : "btn-outline"}`}
						>
							Rejected
						</button>
					</div>
				</div>

				{/* Submissions Table */}
				{filteredSubmissions.length === 0 ? (
					<div className='text-center text-gray-500'>No submissions found.</div>
				) : (
					<div className='overflow-x-auto overflow-y-hidden shadow rounded-lg'>
						<table className='table table-zebra w-full'>
							<thead>
								<tr className='text-sm text-gray-600'>
									<th>#</th>
									<th>Task Title</th>
									<th>Submitted</th>
									<th>Payment</th>
									<th>Status</th>
									<th>Details</th>
								</tr>
							</thead>
							<tbody>
								{paginatedSubmissions.map((submission, index) => (
									<tr key={submission?._id}>
										<td>{startIndex + index + 1}</td>
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
														? "bg-gradient-warning"
														: submission.status === "approved"
														? "bg-gradient-success"
														: "bg-gradient-error"
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

				{/* Pagination Controls */}
				{totalPages > 1 && (
					<div className='flex justify-center mt-6'>
						<div className='join'>
							{Array.from({ length: totalPages }, (_, i) => (
								<button
									key={i}
									className={`join-item btn ${currentPage === i + 1 ? "btn-active bg-gradient" : "bg-base-gradient"}`}
									onClick={() => setCurrentPage(i + 1)}
								>
									{i + 1}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</Container>
	);
};

export default MySubmissions;
