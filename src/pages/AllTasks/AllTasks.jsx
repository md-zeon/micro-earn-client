import { useState, useMemo } from "react";
import PageTitle from "../../components/PageTitle";
import { LuDollarSign, LuUsers, LuCalendarDays } from "react-icons/lu";
import { useLoaderData, useNavigate } from "react-router";
import Container from "../../components/Container";

const AllTasks = () => {
	const tasks = useLoaderData();
	const navigate = useNavigate();
	const [sortOption, setSortOption] = useState("default");
	const [searchTerm, setSearchTerm] = useState("");

	// Sorting and filtering logic
	const sortedAndFilteredTasks = useMemo(() => {
		let result = [...tasks];

		// Filter by search term
		if (searchTerm) {
			result = result.filter(
				(task) =>
					task.task_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					task.task_detail.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		// Sort based on option
		switch (sortOption) {
			case "price-asc":
				result.sort((a, b) => a.payable_amount - b.payable_amount);
				break;
			case "price-desc":
				result.sort((a, b) => b.payable_amount - a.payable_amount);
				break;
			case "deadline-soon":
				result.sort((a, b) => new Date(a.completion_deadline) - new Date(b.completion_deadline));
				break;
			default:
				// Default sorting (by creation date, newest first)
				result.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
		}

		return result;
	}, [tasks, sortOption, searchTerm]);

	return (
		<div className='py-8 px-4 sm:px-6'>
			<PageTitle
				title='All Tasks'
				description='Browse and apply for available micro-tasks to earn coins.'
			/>

			<Container>
				<h1 className='text-3xl font-bold mb-2'>Available Tasks</h1>
				<p className='text-gray-600 mb-8'>Browse and apply for available micro-tasks to earn coins.</p>

				{/* Search and Sort Controls */}
				<div className='flex flex-col md:flex-row gap-4 mb-8'>
					<div className='flex-1'>
						<input
							type='text'
							placeholder='Search tasks...'
							className='input input-bordered w-full'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className='w-full md:w-auto'>
						<select
							className='select select-bordered w-full'
							value={sortOption}
							onChange={(e) => setSortOption(e.target.value)}
						>
							<option value='default'>Sort by: Newest</option>
							<option value='price-asc'>Price: Low to High</option>
							<option value='price-desc'>Price: High to Low</option>
							<option value='deadline-soon'>Deadline: Soonest</option>
						</select>
					</div>
				</div>

				{/* Task Cards Grid */}
				{sortedAndFilteredTasks.length === 0 ? (
					<div className='text-center py-12'>
						<h3 className='text-xl font-semibold mb-2'>No tasks found</h3>
						<p className='text-gray-600'>Try adjusting your search or filter criteria</p>
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{sortedAndFilteredTasks.map((task) => (
							<div
								key={task._id}
								className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-500'
							>
								<div className='card-body'>
									<h2 className='card-title text-xl font-semibold truncate line-clamp-1'>{task.task_title}</h2>
									<p className='text-sm text-gray-600'>Posted by: {task.buyer_name}</p>
									<div className='mt-4 space-y-2'>
										<div className='flex items-center gap-2'>
											<LuCalendarDays className='text-red-400' />
											<span className='text-sm'>
												Deadline: {new Date(task.completion_deadline).toLocaleDateString()}
											</span>
										</div>
										<div className='flex items-center gap-2'>
											<LuDollarSign className='text-green-400' />
											<span className='text-sm'>Payment: {task.payable_amount} Micro Coins</span>
										</div>
										<div className='flex items-center gap-2'>
											<LuUsers className='text-blue-400' />
											<span className='text-sm'>Workers Needed: {task.required_workers}</span>
										</div>
									</div>
									<div className='card-actions mt-4'>
										<button
											onClick={() => navigate(`/task-details/${task._id}`)}
											className='btn bg-gradient w-full'
										>
											View Details
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</Container>
		</div>
	);
};

export default AllTasks;
