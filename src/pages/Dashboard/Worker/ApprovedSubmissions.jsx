import { BadgeCheck } from "lucide-react";
import useWorkerSubmissions from "../../../hooks/useWorkerSubmissions";
import PageTitle from "../../../components/PageTitle";
import DashboardSkeleton from "../../../components/ui/DashboardSkeleton";
import StatusBadge from "../../../components/shared/StatusBadge";
import SubmissionDetailsDialog from "../../../components/shared/SubmissionDetailsDialog";
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

const ApprovedSubmissions = () => {
	const { submissions: data, isLoading } = useWorkerSubmissions();

	if (isLoading)
		return (
			<DashboardSkeleton
				statsCount={0}
				showTable={true}
			/>
		);

	const submissions = data.filter(
		(submission) => submission.status === "approved",
	);

	return (
		<div className="space-y-6">
			<PageTitle
				title="Approved Submissions"
				description="View your approved task submissions and earnings."
			/>

			<div>
				<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
					Approved Submissions
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					{submissions.length} approved submission
					{submissions.length === 1 ? "" : "s"} with pending payout.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<BadgeCheck className="size-4 text-emerald-500" />
						Approved Work
					</CardTitle>
					<CardDescription>
						Submissions accepted by buyers. Coins are credited on payout.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{submissions.length === 0 ? (
						<div className="py-10 text-center">
							<p className="text-sm text-muted-foreground">
								No approved submissions yet.
							</p>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>#</TableHead>
									<TableHead>Task</TableHead>
									<TableHead>Submitted On</TableHead>
									<TableHead>Payment</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Details</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{submissions.map((submission, index) => (
									<TableRow key={submission._id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell className="font-medium">
											{submission.task_title}
										</TableCell>
										<TableCell className="text-muted-foreground">
											{new Date(
												submission.submission_date,
											).toLocaleDateString()}
										</TableCell>
										<TableCell>
											<span className="font-semibold text-emerald-600 dark:text-emerald-400">
												{submission.payable_amount} coins
											</span>
										</TableCell>
										<TableCell>
											<StatusBadge status="approved" />
										</TableCell>
										<TableCell>
											<SubmissionDetailsDialog submission={submission} />
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

export default ApprovedSubmissions;
