import { use, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TasksToReview = () => {
	const [submissions, setSubmissions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchBuyerSubmissions = async () => {
			try {
				const response = await axiosSecure.get("/buyer-submissions");
				setSubmissions(response.data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchBuyerSubmissions();
	}, []);
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const [selectedSubmission, setSelectedSubmission] = useState(null);

	const buyerSubmissions = submissions?.filter((s) => s.buyer_email === user?.email && s.status === "pending");

	const handleApprove = async (submission) => {
		try {
			// Update Submission status
			await axiosSecure.patch("/submission/status-update", {
				submissionId: submission._id,
				status: "approved",
			});

			// Update worker coins
			await axiosSecure.patch(`/update-coins/${submission.worker_email}`, {
				coinsToUpdate: submission.payable_amount,
				status: "increase",
			});

			toast.success("Submission approved and coins rewarded!");
			refetch();
		} catch (error) {
			console.error(error);
			toast.error("Failed to approve submission.");
		}
	};

	const handleReject = async (submission) => {
		try {
			// Update Submission status
			await axiosSecure.patch("/submission/status-update", {
				submissionId: submission._id,
				status: "rejected",
			});

			// update required workers by 1
			await axiosSecure.patch(`/update-workers/${submission.task_id}`, {
				status: "increase",
			});
		} catch (error) {
			console.error(error);
			toast.error("Failed to reject submission.");
		}
	};

	if (isLoading) return <Loader />;

	return (
		<div className='mt-12'>
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
							{buyerSubmissions.map((s) => (
								<tr key={s._id}>
									<td>{s.worker_name}</td>
									<td>{s.task_title}</td>
									<td>{s.payable_amount}</td>
									<td className='capitalize'>{s.status}</td>
									<td className='flex gap-2'>
										<button
											onClick={() => setSelectedSubmission(s)}
											className='btn btn-sm btn-outline'
										>
											View
										</button>
										<button
											onClick={() => handleApprove(s)}
											className='btn btn-sm btn-success'
										>
											Approve
										</button>
										<button
											onClick={() => handleReject(s)}
											className='btn btn-sm btn-error'
										>
											Reject
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{/* Modal */}
			{selectedSubmission && (
				<div className='modal modal-open'>
					<div className='modal-box'>
						<h3 className='font-bold text-lg mb-4'>Submission Detail</h3>
						<p>
							<strong>Worker:</strong> {selectedSubmission.worker_name}
						</p>
						<p>
							<strong>Task:</strong> {selectedSubmission.task_title}
						</p>
						<p>
							<strong>Proof:</strong>
						</p>
						<img
							src={selectedSubmission.proof_img}
							alt='Proof'
							className='mt-2 rounded'
						/>
						<div className='modal-action'>
							<button
								onClick={() => setSelectedSubmission(null)}
								className='btn'
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
