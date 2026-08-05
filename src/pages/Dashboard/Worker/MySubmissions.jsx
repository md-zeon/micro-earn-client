import { useState } from "react";
import { FileText } from "lucide-react";
import useWorkerSubmissions from "../../../hooks/useWorkerSubmissions";
import MySubmissionsSkeleton from "../../../components/ui/MySubmissionsSkeleton";
import PageTitle from "../../../components/PageTitle";
import StatusBadge from "../../../components/shared/StatusBadge";
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
import { Button } from "../../../components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "../../../components/ui/tooltip";
import { cn } from "../../../lib/utils";

const itemsPerPage = 5;

const FILTERS = [
	{ value: "all", label: "All" },
	{ value: "pending", label: "Pending" },
	{ value: "approved", label: "Approved" },
	{ value: "rejected", label: "Rejected" },
];

const MySubmissions = () => {
	const { submissions, isLoading } = useWorkerSubmissions();
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredStatus, setFilteredStatus] = useState("all");

	if (isLoading) return <MySubmissionsSkeleton />;

	const filteredSubmissions =
		filteredStatus === "all"
			? submissions
			: submissions?.filter((s) => s?.status === filteredStatus);

	const totalPages = Math.ceil((filteredSubmissions?.length ?? 0) / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedSubmissions = filteredSubmissions?.slice(
		startIndex,
		startIndex + itemsPerPage,
	);

	const handleStatusChange = (status) => {
		setFilteredStatus(status);
		setCurrentPage(1);
	};

	return (
		<div className="space-y-6">
			<PageTitle
				title="My Submissions"
				description="Track your task submissions and their approval status."
			/>

			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
						My Submissions
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						{filteredSubmissions?.length ?? 0} submission
						{(filteredSubmissions?.length ?? 0) === 1 ? "" : "s"} found
					</p>
				</div>

				<div className="flex flex-wrap gap-2">
					{FILTERS.map((filter) => (
						<Button
							key={filter.value}
							size="sm"
							variant={
								filteredStatus === filter.value ? "default" : "outline"
							}
							className={cn(
								filteredStatus === filter.value && "bg-gradient",
							)}
							onClick={() => handleStatusChange(filter.value)}
						>
							{filter.label}
						</Button>
					))}
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Submission History</CardTitle>
					<CardDescription>
						Review the status of every task you have submitted.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{(filteredSubmissions?.length ?? 0) === 0 ? (
						<div className="py-10 text-center">
							<p className="text-sm text-muted-foreground">
								No submissions found.
							</p>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>#</TableHead>
									<TableHead>Task Title</TableHead>
									<TableHead>Submitted</TableHead>
									<TableHead>Payment</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Details</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{paginatedSubmissions?.map((submission, index) => (
									<TableRow key={submission?._id}>
										<TableCell>{startIndex + index + 1}</TableCell>
										<TableCell className="font-medium">
											{submission?.task_title}
										</TableCell>
										<TableCell className="text-muted-foreground">
											{submission?.submission_date
												? new Date(submission.submission_date).toLocaleDateString()
												: "N/A"}
										</TableCell>
										<TableCell>
											<span className="font-semibold text-emerald-600 dark:text-emerald-400">
												{submission?.payable_amount} coins
											</span>
										</TableCell>
										<TableCell>
											<StatusBadge status={submission?.status} />
										</TableCell>
										<TableCell>
											<Tooltip>
												<TooltipTrigger render={<Button variant="ghost" size="icon" />}>
													<FileText className="size-4 text-sky-500" />
												</TooltipTrigger>
												<TooltipContent className="max-w-sm whitespace-pre-line">
													{submission?.submission_details || "No details provided"}
												</TooltipContent>
											</Tooltip>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			{totalPages > 0 && (
				<div className="flex flex-wrap items-center justify-center gap-2">
					<Button
						variant="outline"
						size="sm"
						disabled={currentPage === 1}
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					>
						Prev
					</Button>

					{Array.from({ length: totalPages }, (_, i) => i + 1)
						.filter((page) => {
							if (totalPages <= 5) return true;
							if (page === 1 || page === totalPages) return true;
							if (Math.abs(currentPage - page) <= 1) return true;
							return false;
						})
						.map((page, i, arr) => {
							const prevPage = arr[i - 1];
							const showEllipsis = prevPage && page - prevPage > 1;
							return (
								<div
									key={page}
									className="flex items-center gap-2"
								>
									{showEllipsis && (
										<span className="px-1 text-muted-foreground">...</span>
									)}
									<Button
										variant={currentPage === page ? "default" : "outline"}
										size="sm"
										className={cn(
											currentPage === page && "bg-gradient",
										)}
										onClick={() => setCurrentPage(page)}
									>
										{page}
									</Button>
								</div>
							);
						})}

					<Button
						variant="outline"
						size="sm"
						disabled={currentPage === totalPages}
						onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
					>
						Next
					</Button>
				</div>
			)}
		</div>
	);
};

export default MySubmissions;
