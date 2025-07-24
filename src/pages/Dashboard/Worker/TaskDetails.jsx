import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
	LuCalendarDays,
	LuDollarSign,
	LuUsers,
	LuUser,
	LuMessageSquareWarning,
	LuUpload,
	LuCoins,
} from "react-icons/lu";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader";
import { imageUpload } from "../../../api/utils";

const TaskDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const [submissionDetails, setSubmissionDetails] = useState("");
	const [loading, setLoading] = useState(false);
	const [proofImage, setProofImage] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);

	const { data: task, isLoading } = useQuery({
		queryKey: ["task", id],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/tasks/${id}`);
			return data;
		},
	});

	const deadlinePassed = new Date(task?.completion_deadline) < new Date() + 1;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!submissionDetails.trim()) {
			toast.error("Submission details cannot be empty");
			return;
		}
		let proof_img_url = "";
		if (proofImage) {
			try {
				proof_img_url = await imageUpload(proofImage);
			} catch (err) {
				console.error("Image upload error:", err);
				toast.error("Failed to upload proof image! Please try again.");
				return;
			}
		}

		setLoading(true);
		const submission = {
			task_id: task._id,
			task_title: task.task_title,
			payable_amount: task.payable_amount,
			worker_email: user?.email,
			submission_details: submissionDetails,
			worker_name: user?.displayName,
			buyer_name: task.buyer_name,
			buyer_email: task.posted_by,
			submission_date: new Date().toISOString(),
			proof_img: proof_img_url,
		};

		try {
			await axiosSecure.post("/submissions", submission);
			await axiosSecure.patch(`/update-workers/${task._id}`, { status: "decrease" });
			toast.success("Submission successful!");
			navigate("/dashboard/my-submissions");
		} catch (err) {
			console.error("Submission error:", err);
			toast.error("Failed to submit task! Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (isLoading) return <Loader />;
	if (!task) return <div className='text-center text-gray-500'>Task not found</div>;

	return (
		<div className='px-4 py-8 space-y-8'>
			{/* Back Button */}
			<button
				onClick={() => navigate("/dashboard/tasks-list")}
				className='btn btn-sm bg-gradient flex items-center gap-2'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-4 w-4'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M15 19l-7-7 7-7'
					/>
				</svg>
				Back to Tasks
			</button>

			{/* Content */}
			<div className='flex flex-col lg:flex-row gap-8'>
				{/* Left: Task Content */}
				<div className='flex-1 bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl border border-gray-500 space-y-6'>
					{/* Title */}
					<h1 className='text-2xl lg:text-3xl font-bold mb-2'>{task.task_title}</h1>
					{/* Task Image */}
					<div className='border border-gray-500 rounded-lg p-3 my-6 overflow-hidden'>
						{task.task_image_url && (
							<img
								src={task.task_image_url}
								alt={task.task_title}
								className='w-full h-64 object-cover hover:scale-105 cursor-pointer transition-transform duration-300 ease-linear rounded-lg'
							/>
						)}
					</div>
					<div>
						<h2 className='text-xl font-semibold mb-2'>Description</h2>
						<p className='text-gray-700'>{task.task_detail}</p>
					</div>
					<div>
						<h2 className='text-xl font-semibold mb-2'>Submission Requirements</h2>
						<p className='text-gray-700'>{task.submission_info}</p>
					</div>
				</div>

				{/* Right: Info Sidebar */}
				<div className='lg:w-1/3 space-y-6'>
					<div className='bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl border border-gray-500'>
						<h2 className='text-xl font-semibold mb-4'>Task Information</h2>
						<div className='space-y-4 text-sm'>
							<div className='flex items-center justify-between'>
								<span className='flex items-center gap-2 text-gray-600'>
									<LuDollarSign /> Payment
								</span>
								<span className='badge badge-outline border-blue-500 text-blue-500'>
									{task.payable_amount} <LuCoins className='inline' />
								</span>
							</div>
							<div className='flex items-center justify-between'>
								<span className='flex items-center gap-2 text-gray-600'>
									<LuCalendarDays /> Deadline
								</span>
								<span>{new Date(task.completion_deadline).toLocaleDateString()}</span>
							</div>
							<div className='flex items-center justify-between'>
								<span className='flex items-center gap-2 text-gray-600'>
									<LuUsers /> Workers Needed
								</span>
								<span>{task.required_workers}</span>
							</div>
							<div className='flex items-center justify-between'>
								<span className='flex items-center gap-2 text-gray-600'>
									<LuUser /> Posted By
								</span>
								<span>{task.buyer_name}</span>
							</div>
						</div>
					</div>

					<div className='bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl border border-gray-500'>
						<h2 className='text-xl font-semibold mb-2'>
							<LuMessageSquareWarning className='inline' /> Notes
						</h2>
						<ul className='list-disc list-inside text-gray-600 text-sm space-y-1'>
							<li>Complete all requirements before submitting</li>
							<li>Submissions are reviewed within 24-48 hours</li>
							<li>Payment is released upon approval</li>
							<li>Rejected submissions won't be paid</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Submission */}
			<div className='bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl'>
				<h2 className='text-2xl font-semibold mb-4'>
					<LuUpload className='inline' /> Submit Your Work
				</h2>
				{/* Deadline Message */}
				{deadlinePassed && (
					<p className='text-red-600 font-medium mb-4'>
						This task is no longer accepting submissions (Deadline passed).
					</p>
				)}
				
				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					{/* File Upload */}
					<div>
						<label className='block font-medium mb-1'>Upload Screenshot (optional):</label>
						<input
							type='file'
							accept='image/*'
							onChange={(e) => {
								const file = e.target.files[0];
								setProofImage(file);
								setPreviewUrl(URL.createObjectURL(file));
							}}
							className='file-input w-full'
						/>
						{previewUrl && (
							<div className='mt-3'>
								<p className='text-sm font-medium text-gray-600 mb-1'>Image Preview:</p>
								<img
									src={previewUrl}
									alt='Preview'
									className='rounded-lg border border-gray-300 max-h-64'
								/>
							</div>
						)}
					</div>

					{/* Textarea */}
					<div>
						<label className='block font-medium mb-1'>Submission Details:</label>
						<textarea
							name='submission_details'
							value={submissionDetails}
							onChange={(e) => setSubmissionDetails(e.target.value)}
							placeholder='Describe your completed task, include necessary links or proof...'
							className='textarea textarea-bordered w-full h-32'
						/>
					</div>
					<button
						type='submit'
						className='btn bg-gradient w-full'
						disabled={loading || deadlinePassed || task.required_workers <= 0}
					>
						{loading ? "Submitting..." : "Submit Work"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default TaskDetails;
