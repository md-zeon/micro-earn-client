import { useState, useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import Loader from "../../../components/Loader";
import { LuPlus, LuListTodo, LuClock, LuDollarSign, LuUsers } from "react-icons/lu";
import useBuyerTasks from "../../../hooks/useBuyerTasks";
import StatsCard from "../../../components/shared/StatsCard";
import TasksToReview from "./TasksToReview";

const BuyerDashboard = () => {
	const { user, loading: authLoading } = useAuth();
	const { microCoins, isMicroCoinsLoading: coinsLoading } = useAvailableCoins();
	const { tasks, isTasksLoading } = useBuyerTasks();
	const [greeting, setGreeting] = useState("");

	useEffect(() => {
		const hour = new Date().getHours();
		if (hour < 12) setGreeting("Good Morning");
		else if (hour < 17) setGreeting("Good Afternoon");
		else setGreeting("Good Evening");
	}, []);

	const totalTasks = tasks.length;
	const totalPendingWorkers = tasks.reduce((sum, task) => sum + task.required_workers, 0);
	const totalPaymentsPaid = tasks.reduce(
		(sum, task) => sum + (task.total_workers - task.required_workers) * task.payable_amount,
		0,
	);

	if (authLoading || coinsLoading || isTasksLoading) return <Loader />;

	return (
		<div>
			{/* Header */}
			<header className='p-4'>
				<div className='max-w-6xl mx-auto flex items-center justify-between flex-wrap'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight mb-2'>{greeting},</h1>
						<p>{user?.displayName || "Buyer"}! Manage your tasks and workers.</p>
					</div>
					<Link
						to='/dashboard/add-task'
						className='btn bg-gradient'
					>
						<LuPlus className='w-4 h-4 mr-2' />
						Add New Task
					</Link>
				</div>
			</header>

			{/* Main Content */}
			<main className='max-w-6xl mx-auto py-8 px-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{/* Total Tasks Card */}
					<StatsCard
						label='Total Tasks'
						Icon={LuListTodo}
						value={totalTasks}
						subtitle="Tasks you've created"
						color="text-base-content"
					/>

					{/* Pending Workers Card */}
					<StatsCard
						label='Pending Workers'
						Icon={LuUsers}
						value={totalPendingWorkers}
						subtitle='Workers needed for tasks'
						color="text-base-content"
					/>

					{/* Total Payments Card */}
					<StatsCard
						label='Total Payments'
						Icon={LuDollarSign}
						value={totalPaymentsPaid}
						subtitle='Paid to workers'
						suffix='coins'
						color="text-base-content"
					/>

					{/* Available Coins Card */}
					<StatsCard
						label='Available Coins'
						Icon={LuClock}
						value={microCoins || 0}
						subtitle='Ready to use'
						color="text-base-content"
					/>
				</div>

				{/* Tasks to Review Section */}
				<TasksToReview />
			</main>
		</div>
	);
};

export default BuyerDashboard;
