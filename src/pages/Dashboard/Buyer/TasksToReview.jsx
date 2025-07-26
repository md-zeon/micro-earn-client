import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useBuyerSubmissions from "../../../hooks/useBuyerSubmissions";
import Swal from "sweetalert2";
import DashboardSkeleton from "../../../components/ui/DashboardSkeleton";
import PageTitle from "../../../components/PageTitle";

const TasksToReview = () => {
	const { submissions, isLoading, refetch } = useBuyerSubmissions();
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const [selectedSubmission, setSelectedSubmission] = useState(null);

	const buyerSubmissions = submissions?.filter((s) => s.buyer_email === user?.email && s.status === "pending");

	const handleApprove = async (submission) => {
		try {
			// Update Submission status
			await axiosSecure.patch("/submissions/status-update", {
				submissionId: submission._id,
				status: "approved",
			});

			// Update worker coins
			await axiosSecure.patch(`/update-coins/${submission.worker_email}`, {
				coinsToUpdate: submission.payable_amount,
				status: "increase",
			});
			refetch();
			Swal.fire({
				icon: "success",
				title: "Approved",
				text: "Submission approved and coins rewarded!",
				showCancelButton: false,
				buttonsStyling: false,
				customClass: {
					confirmButton: "btn mr-5 bg-gradient",
				},
				confirmButtonText: "Ok",
			});
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: "Failed to approve submission.",
				buttonsStyling: false,
				customClass: {
					confirmButton: "btn mr-5 bg-gradient-error",
				},
			});
		}
	};

	const handleReject = async (submission) => {
		try {
			const result = await Swal.fire({
				icon: "warning",
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				showCancelButton: true,
				buttonsStyling: false,
				customClass: {
					confirmButton: "btn mr-5 bg-gradient-success",
					cancelButton: "btn bg-gradient-error",
				},
				confirmButtonText: "Yes, reject it!",
			});
			if (result.isConfirmed) {
				// Update Submission status
				await axiosSecure.patch("/submissions/status-update", {
					submissionId: submission._id,
					status: "rejected",
				});

				// update required workers by 1
				await axiosSecure.patch(`/update-workers/${submission.task_id}`, {
					status: "increase",
				});
				refetch();
				Swal.fire({
					icon: "success",
					title: "Success!",
					text: "Submission Rejected!",
					buttonsStyling: false,
					customClass: {
						confirmButton: "btn mr-5 btn-sm bg-gradient",
					},
				});
			}
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Failed to reject submission.",
				buttonsStyling: false,
				customClass: {
					confirmButton: "btn mr-5 btn-sm bg-gradient-error",
				},
			});
		}
	};

	if (isLoading)
		return (
			<DashboardSkeleton
				statsCount={0}
				showTable={true}
			/>
		);

	return (
		<div className='mt-12'>
			<PageTitle
				title='Tasks to Review'
				description='Review and approve task submissions from workers.'
			/>
			<h2 className='text-xl font-bold mb-4'>Tasks To Review</h2>
			{buyerSubmissions?.length === 0 ? (
				<p>No submissions to review.</p>
			) : (
				<div className='overflow-x-auto'>
					<table className='table'>
						<thead>
							<tr>
								<th>Worker</th>
								<th>Task Title</th>
								<th>Payable</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{buyerSubmissions?.map((s) => (
								<tr key={s._id}>
									<td>
										<p className='w-max'>{s.worker_name}</p>
									</td>
									<td>
										<p className='w-max'>{s.task_title}</p>
									</td>
									<td>{s.payable_amount}</td>
									<td className='capitalize'>{s.status}</td>
									<td>
										<div className='flex gap-2 items-center'>
											<button
												onClick={() => setSelectedSubmission(s)}
												className='btn btn-sm btn-outline'
											>
												View
											</button>
											<button
												onClick={() => handleApprove(s)}
												className='btn btn-sm bg-gradient-success'
											>
												Approve
											</button>
											<button
												onClick={() => handleReject(s)}
												className='btn btn-sm bg-gradient-error'
											>
												Reject
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{/* Modal */}
			{selectedSubmission && (
				<div className='modal modal-open z-50'>
					<div className='modal-box w-11/12 max-w-2xl border border-gray-500 rounded-xl shadow-xl'>
						<h3 className='text-2xl font-bold mb-4 text-center'>Submission Details</h3>

						<div className='space-y-2 text-sm'>
							<p>
								<strong>Worker:</strong> {selectedSubmission.worker_name}
							</p>
							<p>
								<strong>Email:</strong> {selectedSubmission.worker_email}
							</p>
							<p>
								<strong>Task:</strong> {selectedSubmission.task_title}
							</p>
							<p>
								<strong>Submission Text:</strong>
							</p>
							<p className='p-3 rounded bg-base-300'>
								{selectedSubmission.submission_details || "No text submission provided."}
							</p>
							{selectedSubmission.proof_img && (
								<div>
									<p className='mt-4 mb-1'>
										<strong>Proof Image:</strong>
									</p>
									<img
										src={selectedSubmission.proof_img}
										alt='Proof'
										className='rounded-lg border border-gray-300 shadow-md max-h-[400px] mx-auto'
									/>
								</div>
							)}
						</div>

						<div className='modal-action flex gap-4 items-center mt-6'>
							<button
								onClick={() => {
									handleReject(selectedSubmission);
									setSelectedSubmission(null);
								}}
								className='btn-sm text-sm btn sm:btn-md bg-gradient-error'
							>
								Reject
							</button>
							<button
								onClick={() => {
									handleApprove(selectedSubmission);
									setSelectedSubmission(null);
								}}
								className='btn-sm text-sm btn sm:btn-md bg-gradient-success'
							>
								Approve
							</button>
							<button
								onClick={() => setSelectedSubmission(null)}
								className='btn-sm text-sm btn sm:btn-md'
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TasksToReview;
