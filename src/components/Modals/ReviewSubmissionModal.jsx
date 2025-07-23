const ReviewSubmissionModal = ({ submission }) => {
	return (
		<dialog
			id={`view-modal-${submission.id}`}
			className='modal'
		>
			<div className='modal-box w-11/12 max-w-2xl'>
				<h3 className='font-bold text-lg'>Submission Details</h3>
				<div className='space-y-4 mt-4'>
					<div>
						<h4 className='font-semibold text-sm text-gray-500'>Task</h4>
						<p className='font-medium'>{submission.task_title}</p>
					</div>
					<div>
						<h4 className='font-semibold text-sm text-gray-500'>Worker</h4>
						<p>
							{submission.worker_name} ({submission.worker_email})
						</p>
					</div>
					<div>
						<h4 className='font-semibold text-sm text-gray-500'>Amount</h4>
						<p>{submission.payable_amount} coins</p>
					</div>
					<div>
						<h4 className='font-semibold text-sm text-gray-500'>Submission Date</h4>
						<p>{new Date(submission.submission_date).toLocaleDateString()}</p>
					</div>
					<div>
						<h4 className='font-semibold text-sm text-gray-500'>Details</h4>
						<p className='text-sm leading-relaxed'>{submission.submission_details}</p>
					</div>
					{submission.submission_files && submission.submission_files.length > 0 && (
						<div>
							<h4 className='font-semibold text-sm text-gray-500'>Attached Files</h4>
							<div className='space-y-2'>
								{submission.submission_files.map((file, index) => (
									<a
										key={index}
										href={file}
										target='_blank'
										rel='noopener noreferrer'
										className='text-blue-600 hover:underline text-sm block'
									>
										📎 File {index + 1}
									</a>
								))}
							</div>
						</div>
					)}
				</div>
				<div className='modal-action'>
					<button
						className='btn bg-gradient-error'
						onClick={() => document.getElementById(`view-modal-${submission.id}`).close()}
					>
						Close
					</button>
				</div>
			</div>
		</dialog>
	);
};

export default ReviewSubmissionModal;
