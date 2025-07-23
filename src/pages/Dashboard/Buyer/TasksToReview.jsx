import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import ReviewSubmissionModal from "../../../components/Modals/ReviewSubmissionModal";
const TasksToReview = () => {
	const [submissions, setSubmissions] = useState([]);

	// Mock submissions data
	useEffect(() => {
		const mockSubmissions = [
			{
				id: "1",
				task_title: "Watch YouTube video and comment",
				worker_name: "Alice Johnson",
				worker_email: "alice@example.com",
				payable_amount: 10,
				status: "pending",
				submission_date: "2024-01-15",
				submission_details:
					"I watched the entire YouTube video about React best practices and left a thoughtful comment about the useEffect hook usage. The video was very informative and I learned new techniques for optimizing React components.",
				submission_files: ["https://example.com/screenshot1.png", "https://example.com/comment-proof.png"],
			},
			{
				id: "2",
				task_title: "Test mobile app functionality",
				worker_name: "Bob Smith",
				worker_email: "bob@example.com",
				payable_amount: 25,
				status: "pending",
				submission_date: "2024-01-14",
				submission_details:
					"I thoroughly tested the mobile app on both iOS and Android devices. Found 3 minor bugs in the navigation system and documented them with screenshots. The app performs well overall with smooth animations and responsive design.",
				submission_files: ["https://example.com/bug-report.pdf", "https://example.com/test-results.png"],
			},
		];
		setSubmissions(mockSubmissions);
	}, []);
	const pendingSubmissions = submissions.filter((s) => s.status === "pending");

	const handleApprove = (submissionId) => {
		setSubmissions((prev) => prev.map((sub) => (sub.id === submissionId ? { ...sub, status: "approved" } : sub)));
	};

	const handleReject = (submissionId) => {
		setSubmissions((prev) => prev.map((sub) => (sub.id === submissionId ? { ...sub, status: "rejected" } : sub)));
	};
	return (
		<div className='mt-8'>
			<h2 className='text-2xl font-bold mb-4'>Tasks to Review</h2>
			<p className='text-gray-500 mb-4'>Review and approve worker submissions</p>
			<div className='space-y-4'>
				{pendingSubmissions.length === 0 ? (
					<p className='text-gray-500 text-center py-4'>No pending submissions to review.</p>
				) : (
					pendingSubmissions.map((submission) => (
						<div
							key={submission.id}
							className='card shadow-md p-4 rounded-lg flex flex-row items-center justify-between'
						>
							<div className='space-y-1'>
								<p className='font-medium'>{submission.task_title}</p>
								<p className='text-sm text-gray-500'>Submitted by {submission.worker_name}</p>
								<p className='text-sm text-gray-500'>Amount: {submission.payable_amount} coins</p>
							</div>
							<div className='flex items-center space-x-2'>
								<button
									className='btn bg-gradient btn-sm'
									onClick={() => handleApprove(submission.id)}
								>
									Approve
								</button>
								<button
									className='btn bg-gradient-error btn-sm'
									onClick={() => handleReject(submission.id)}
								>
									Reject
								</button>
								<button
									className='btn btn-outline btn-sm'
									onClick={() => document.getElementById(`view-modal-${submission.id}`).showModal()}
								>
									<LuEye className='w-4 h-4 mr-1' /> View
								</button>
							</div>
							{/* View Modal */}
							<ReviewSubmissionModal submission={submission} />
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default TasksToReview;
