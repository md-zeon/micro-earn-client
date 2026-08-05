import { Link } from "react-router";
import { Wallet, ListChecks, FileClock, HandCoins, ArrowRight } from "lucide-react";
import useWorkerSubmissions from "../../../hooks/useWorkerSubmissions";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import StatsCard from "../../../components/shared/StatsCard";
import useAuth from "../../../hooks/useAuth";
import PageTitle from "../../../components/PageTitle";
import WorkerOverview from "../../../components/Dashboard/WorkerOverview";
import DashboardSkeleton from "../../../components/ui/DashboardSkeleton";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../../../components/ui/card";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

const WorkerDashboard = ({ greeting }) => {
	const { submissions, isLoading } = useWorkerSubmissions();
	const { user } = useAuth();
	const { microCoins } = useAvailableCoins();

	if (isLoading)
		return (
			<DashboardSkeleton
				statsCount={4}
				showTable={true}
			/>
		);

	const totalSubmissions = submissions?.length ?? 0;
	const pendingSubmissions =
		submissions?.filter((s) => s?.status === "pending")?.length ?? 0;
	const totalEarnings =
		submissions
			?.filter((s) => s?.status === "approved")
			?.reduce((sum, item) => sum + (item?.payable_amount ?? 0), 0) ?? 0;

	const approvedSubmissions =
		submissions?.filter((s) => s?.status === "approved") ?? [];

	return (
		<div className="space-y-8">
			<PageTitle
				title="Worker Dashboard"
				description="Track your tasks, earnings, and submissions on MicroEarn."
			/>

			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
						{greeting}, {user?.displayName || "Worker"}!
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Here&apos;s your task overview for today.
					</p>
				</div>
				<Button
					className="bg-gradient"
					render={<Link to="/dashboard/withdrawals" />}
				>
					<Wallet />
					Withdraw Money
					<ArrowRight />
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatsCard
					label="Total Submissions"
					value={totalSubmissions}
					tone="primary"
					Icon={ListChecks}
					subtitle="Tasks you have submitted"
				/>
				<StatsCard
					label="Pending Submissions"
					value={pendingSubmissions}
					tone="warning"
					Icon={FileClock}
					subtitle="Tasks still being reviewed"
				/>
				<StatsCard
					label="Total Earnings"
					value={totalEarnings}
					suffix="Micro Coins"
					tone="success"
					Icon={HandCoins}
					subtitle="Earned from approved tasks"
				/>
				<StatsCard
					label="Available Coins"
					value={microCoins}
					suffix="Micro Coins"
					tone="info"
					Icon={Wallet}
					subtitle="Coins available to withdraw"
				/>
			</div>

			<WorkerOverview />

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						Approved Submissions
					</CardTitle>
					<CardDescription>
						Your most recently approved task submissions.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{approvedSubmissions?.length === 0 ? (
						<div className="py-10 text-center">
							<p className="text-sm text-muted-foreground">
								No approved submissions yet.
							</p>
							<Button
								variant="outline"
								className="mt-4"
								render={<Link to="/dashboard/tasks-list" />}
							>
								Browse Tasks
							</Button>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>#</TableHead>
									<TableHead>Task Title</TableHead>
									<TableHead>Payable Amount</TableHead>
									<TableHead>Buyer Name</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{approvedSubmissions?.map((submission, idx) => (
									<TableRow key={submission?._id}>
										<TableCell>{idx + 1}</TableCell>
										<TableCell className="font-medium">
											{submission?.task_title}
										</TableCell>
										<TableCell>
											{submission?.payable_amount} coins
										</TableCell>
										<TableCell>{submission?.buyer_name}</TableCell>
										<TableCell>
											<Badge variant="default" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
												Approved
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default WorkerDashboard;
