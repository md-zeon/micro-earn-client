import { CalendarDays, Coins, FileText } from "lucide-react";
import { Button } from "../ui/button";
import StatusBadge from "./StatusBadge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

const formatDate = (value) => {
	if (!value) return "N/A";
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
};

const SubmissionDetailsDialog = ({ submission }) => {
	const details = submission?.submission_details?.trim();

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button
						variant="ghost"
						size="sm"
						className="gap-1.5 text-sky-500 hover:bg-sky-500/10 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300"
					/>
				}
			>
				<FileText className="size-3.5" aria-hidden="true" />
				View
			</DialogTrigger>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<div className="flex items-start justify-between gap-3 pr-6">
						<div className="space-y-1.5">
							<DialogTitle>
								{submission?.task_title || "Task Submission"}
							</DialogTitle>
							<DialogDescription>
								Submission details
							</DialogDescription>
						</div>
						<StatusBadge status={submission?.status} />
					</div>
				</DialogHeader>

				<div className="grid grid-cols-2 gap-3">
					<div className="rounded-lg border bg-muted/30 p-3">
						<p className="flex items-center gap-1.5 text-xs text-muted-foreground">
							<CalendarDays className="size-3.5" aria-hidden="true" />
							Submitted on
						</p>
						<p className="mt-1 font-medium">
							{formatDate(submission?.submission_date)}
						</p>
					</div>
					<div className="rounded-lg border bg-muted/30 p-3">
						<p className="flex items-center gap-1.5 text-xs text-muted-foreground">
							<Coins className="size-3.5" aria-hidden="true" />
							Payment
						</p>
						<p className="mt-1 font-semibold text-emerald-600 dark:text-emerald-400">
							{submission?.payable_amount ?? 0} coins
						</p>
					</div>
				</div>

				<div className="space-y-1.5">
					<p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
						Details
					</p>
					<div className="max-h-64 overflow-y-auto rounded-lg border bg-muted/30 p-3">
						<p className="text-sm whitespace-pre-line">
							{details || "No details provided."}
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SubmissionDetailsDialog;
