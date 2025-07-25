import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { LuUsers, LuDollarSign, LuCalendarDays } from "react-icons/lu";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAvailableCoins from "../../../hooks/useAvailableCoins";

const AddTask = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const { microCoins, refetch } = useAvailableCoins(); // users available coins

	const [requiredWorkers, setRequiredWorkers] = useState("");
	const [payableAmount, setPayableAmount] = useState("");
	const [taskImageUrl, setTaskImageUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [imgUploading, setImgUploading] = useState(false);
	const axiosSecure = useAxiosSecure();

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setImgUploading(true);
		try {
			const url = await imageUpload(file);
			setTaskImageUrl(url);
			toast.success("Image uploaded successfully");
		} catch (err) {
			console.error("Image upload failed",err);
			toast.error("Image upload failed");
		} finally {
			setImgUploading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const form = e.target;
		const newTask = {
			task_title: form.task_title.value,
			task_detail: form.task_detail.value,
			required_workers: requiredWorkers,
			payable_amount: payableAmount,
			completion_deadline: form.completion_deadline.value,
			submission_info: form.submission_info.value,
			task_image_url: taskImageUrl,
			posted_by: user?.email,
			buyer_name: user?.displayName,
		};

		if (totalCost > microCoins) {
			toast.error("Not enough coins. Please purchase more.");
			navigate("/dashboard/purchase-coins");
			setLoading(false);
			return;
		}

		try {
			await axiosSecure.post("/tasks", newTask);
			// deduct buyer's coins
			await axiosSecure.patch(`/update-coins/${user?.email}`, {
				coinsToUpdate: totalCost,
				status: "decrease",
			})
			refetch();
			toast.success("Task created");
			setLoading(false);
			navigate("/dashboard/my-tasks");
			form.reset();
			setRequiredWorkers("");
			setPayableAmount("");
			setTaskImageUrl("");
		} catch (err) {
			console.error("Task Creation Failed", err);
			toast.error("Task creation failed");
		} finally {
			setLoading(false);
		}
	};

	const totalCost = requiredWorkers * payableAmount;

	return (
		<div className='max-w-3xl mx-auto sm:px-4 py-6'>
			<div className='text-center mb-2'>
				<h1 className='text-3xl font-bold mb-2'> Add New Task</h1>
				<p className='text-gray-400'>Create a new task for workers to complete</p>
			</div>
			<div className='card bg-base-100'>
				<div className='card-body space-y-4'>
					<h2 className='card-title items-center gap-2'>Task Information:</h2>
					<form
						onSubmit={handleSubmit}
						className='space-y-4'
					>
						{/* Task Title */}
						<div>
							<label className='label'>Task Title *</label>
							<input
								type='text'
								name='task_title'
								placeholder='Enter task title'
								className='input input-bordered w-full'
								required
							/>
						</div>

						{/* Task Description */}
						<div>
							<label className='label'>Task Description *</label>
							<textarea
								name='task_detail'
								placeholder='Explain what workers need to do'
								className='textarea textarea-bordered w-full'
								rows='4'
								required
							></textarea>
						</div>

						{/* Workers and Payment */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div>
								<label className='label'>
									<LuUsers /> Required Workers *
								</label>
								<input
									type='number'
									name='required_workers'
									value={requiredWorkers}
									onChange={(e) => {
										const value = e.target.value;
										setRequiredWorkers(value === "" ? "" : parseInt(value));
									}}
									className='input input-bordered w-full'
									min='1'
									placeholder='e.g. 100'
									required
								/>
							</div>

							<div>
								<label className='label flex gap-2 items-center'>
									<LuDollarSign /> Payment per Worker *
								</label>
								<input
									type='number'
									name='payable_amount'
									value={payableAmount}
									onChange={(e) => {
										const value = e.target.value;
										setPayableAmount(value === "" ? "" : parseInt(value));
									}}
									className='input input-bordered w-full'
									min='1'
									placeholder='e.g. 10 (Micro Coins)'
									required
								/>
							</div>
						</div>

						{/* Deadline */}
						<div>
							<label className='label flex gap-2 items-center'>
								<LuCalendarDays /> Completion Deadline *
							</label>
							<input
								type='date'
								name='completion_deadline'
								className='input input-bordered w-full'
								min={new Date().toISOString().split("T")[0]}
								required
							/>
						</div>

						{/* Submission Info */}
						<div>
							<label className='label'>Submission Instructions *</label>
							<textarea
								name='submission_info'
								placeholder='What should the worker submit as proof?'
								className='textarea textarea-bordered w-full'
								rows='3'
								required
							></textarea>
						</div>

						{/* Task Image */}
						<div>
							<label className='label'>Task Image *</label>
							<input
								type='file'
								accept='image/*'
								onChange={handleImageChange}
								className='file-input file-input-bordered w-full'
								disabled={imgUploading}
								required
							/>
							{imgUploading && <p className='text-sm text-gray-400 mt-1'>Uploading...</p>}
							{taskImageUrl && (
								<img
									src={taskImageUrl}
									alt='Uploaded Preview'
									className='mt-2 h-40 object-contain rounded'
								/>
							)}
						</div>

						{/* Total Cost */}
						{totalCost > 0 && (
							<div className='bg-base-200 p-4 rounded-md text-right'>
								<p className='text-sm text-gray-500 mb-1'>
									{requiredWorkers} x {payableAmount} Micro Coins
								</p>
								<p className='text-xl font-bold text-gradient'>Total: {totalCost} Micro Coins</p>
							</div>
						)}

						{/* Submit Button */}
						<button
							type='submit'
							className='btn bg-gradient w-full'
							disabled={imgUploading}
						>
							{loading ? "Creating Task..." : "Create Task"}
						</button>
						<p className='text-center text-sm text-gray-500 mb-6'>
							Created by: {user?.displayName || "User"} ({user?.email})
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddTask;
