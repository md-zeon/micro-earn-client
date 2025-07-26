import { LuCoins, LuPen, LuTrash2, LuUser } from "react-icons/lu";

const MyTaskTable = ({ tasks, onUpdateClick, onDeleteClick }) => {
	return (
		<div className='overflow-x-auto'>
			<table className='table w-full'>
				<thead>
					<tr className='bg-base-300'>
						<th>Task Title</th>
						<th>Workers</th>
						<th>Payment</th>
						<th>Deadline</th>
						<th>Cost</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map((task) => {
						const totalCost = task.required_workers * task.payable_amount;
						return (
							<tr
								key={task._id}
								className='bg-base-100 hover:bg-base-200'
							>
								<td className='opacity-80'>{task.task_title}</td>
								<td className='opacity-80'>
									<LuUser className='inline' /> {task.required_workers}
								</td>
								<td className='opacity-80'>
									{task.payable_amount} <LuCoins className='inline text-green-400' />
								</td>
								<td className='opacity-80'>{new Date(task.completion_deadline).toLocaleDateString()}</td>
								<td className='opacity-80'>
									{totalCost} <LuCoins className='inline text-blue-400' />
								</td>
								<td>
									<div className='flex gap-2'>
										<button
											className='btn btn-sm btn-circle btn-ghost text-gray-600 hover:text-blue-600'
											onClick={() => onUpdateClick(task)}
										>
											<LuPen />
										</button>
										<button
											className='btn btn-sm btn-circle btn-ghost text-gray-600 hover:text-red-600'
											onClick={() => onDeleteClick(task)}
										>
											<LuTrash2 />
										</button>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default MyTaskTable;