const UpdateTaskModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
	if (!isOpen) return null;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className='modal modal-open'>
			<div className='modal-box'>
				<h3 className='font-bold text-lg'>Update Task</h3>
				<form
					onSubmit={onSubmit}
					className='space-y-4 mt-4'
				>
					<div>
						<label className='label'>Task Title *</label>
						<input
							type='text'
							name='task_title'
							value={formData.task_title}
							onChange={handleChange}
							className='input input-bordered w-full'
							required
						/>
					</div>
					<div>
						<label className='label'>Task Description *</label>
						<textarea
							name='task_detail'
							value={formData.task_detail}
							onChange={handleChange}
							className='textarea textarea-bordered w-full'
							rows='4'
							required
						/>
					</div>
					<div>
						<label className='label'>Submission Instructions *</label>
						<textarea
							name='submission_info'
							value={formData.submission_info}
							onChange={handleChange}
							className='textarea textarea-bordered w-full'
							rows='3'
							required
						/>
					</div>
					<div className='modal-action'>
						<button
							type='submit'
							className='btn bg-gradient'
						>
							Save Changes
						</button>
						<button
							type='button'
							className='btn btn-ghost'
							onClick={onClose}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateTaskModal;
