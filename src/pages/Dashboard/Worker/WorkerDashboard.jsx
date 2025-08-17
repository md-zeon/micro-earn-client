import { LuCoins, LuCreditCard, LuFileCheck2, LuFileClock, LuListChecks } from "react-icons/lu";
import useWorkerSubmissions from "../../../hooks/useWorkerSubmissions";
import StatsCard from "../../../components/shared/StatsCard";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import DashboardSkeleton from "../../../components/ui/DashBoardSkeleton";
import PageTitle from "../../../components/PageTitle";
import WorkerOverview from "../../../components/Dashboard/WorkerOverview";
import useAvailableCoins from "../../../hooks/useAvailableCoins";

const WorkerDashboard = ({ greeting }) => {
	const { submissions, isLoading } = useWorkerSubmissions();
	const { user } = useAuth();
	const { microCoins } = useAvailableCoins();

	if (isLoading)
		return (
			<DashboardSkeleton
				statsCount={3}
				showTable={true}
			/>
		);

	// Calculate Stats
	const totalSubmissions = submissions?.length ?? 0;
	const pendingSubmissions = submissions?.filter((s) => s?.status === "pending")?.length ?? 0;
	const totalEarnings =
		submissions?.filter((s) => s?.status === "approved")?.reduce((sum, item) => sum + (item?.payable_amount ?? 0), 0) ??
		0;

	const approvedSubmissions = submissions?.filter((s) => s?.status === "approved") ?? [];

	return (
		<div className='space-y-8'>
			<PageTitle
				title='Worker Dashboard'
				description='Track your tasks, earnings, and submissions on MicroEarn.'
			/>
			<div className='px-4'>
				<div className='flex items-center justify-between flex-wrap'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight mb-2'>
							{greeting}, {user?.displayName || "Worker"}!
						</h1>
						<p>Here's your task overview.</p>
					</div>
					<Link
						to='/dashboard/withdrawals'
						className='btn bg-gradient hidden sm:inline-flex'
					>
						<LuCreditCard className='w-4 h-4 mr-2' />
						Withdraw Money
					</Link>
				</div>
			</div>

			{/* Stats */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				<StatsCard
					label='Total Submissions'
					value={totalSubmissions}
					color='text-accent'
					Icon={LuListChecks}
					subtitle="Tasks you have submitted"
				/>
				<StatsCard
					label='Pending Submissions'
					value={pendingSubmissions}
					color='text-warning'
					Icon={LuFileClock}
					subtitle="Tasks that are still being reviewed"
				/>
				<StatsCard
					label='Total Earnings'
					value={totalEarnings}
					suffix='Micro Coins'
					color='text-success'
					Icon={LuCoins}
					subtitle="Money earned for completed tasks"
				/>
				<StatsCard
					label='Available Coins'
					value={microCoins}
					suffix='Micro Coins'
					color='text-info'
					Icon={LuCoins}
					subtitle="Coins available to spend"
				/>
			</div>

			{/* Dashboard Overview */}
			<WorkerOverview />

			{/* Approved Submissions Table */}
			<div className='overflow-x-auto bg-base-200 rounded-lg shadow-md p-4'>
				<h2 className='text-xl font-semibold mb-3 flex items-center gap-2'>
					<LuFileCheck2 className='text-success' /> Approved Submissions
				</h2>

				{(approvedSubmissions?.length ?? 0) === 0 ? (
					<p className='text-sm text-gray-400'>No approved submissions yet.</p>
				) : (
					<table className='table'>
						<thead>
							<tr>
								<th>#</th>
								<th>Task Title</th>
								<th>Payable Amount</th>
								<th>Buyer Name</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{approvedSubmissions?.map((submission, idx) => (
								<tr key={submission?._id}>
									<td>{idx + 1}</td>
									<td>{submission?.task_title}</td>
									<td>${submission?.payable_amount}</td>
									<td>{submission?.buyer_name}</td>
									<td>
										<span className='badge bg-gradient-success capitalize'>{submission?.status}</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default WorkerDashboard;
