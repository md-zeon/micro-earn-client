import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Eye,
  Loader2,
  Inbox,
  Link2,
  FileQuestion,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useBuyerSubmissions from "../../../hooks/useBuyerSubmissions";
import DashboardSkeleton from "../../../components/ui/DashboardSkeleton";
import PageHeader from "../../../components/shared/PageHeader";
import StatsCard from "../../../components/shared/StatsCard";
import EmptyState from "../../../components/shared/EmptyState";
import StatusBadge from "../../../components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PageTitle from "../../../components/PageTitle";
import { formatDateTime } from "../../../lib/date";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("") || "?";

const TasksToReview = () => {
  const { submissions, isLoading, refetch } = useBuyerSubmissions();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const pendingSubmissions = useMemo(
    () =>
      (submissions || []).filter(
        (s) => s.buyer_email === user?.email && s.status === "pending",
      ),
    [submissions, user?.email],
  );

  const allSubmissions = useMemo(
    () => (submissions || []).filter((s) => s.buyer_email === user?.email),
    [submissions, user?.email],
  );

  const approvedCount = allSubmissions.filter(
    (s) => s.status === "approved",
  ).length;
  const rejectedCount = allSubmissions.filter(
    (s) => s.status === "rejected",
  ).length;

  const setSubmissionStatus = async (submission, status) => {
    setBusyId(submission._id);
    try {
      await axiosSecure.patch("/submissions/status-update", {
        submissionId: submission._id,
        status,
      });

      toast.success(
        status === "approved"
          ? `Submission approved — ${submission.payable_amount} coins rewarded`
          : "Submission rejected",
      );

      if (selectedSubmission?._id === submission._id) {
        setSelectedSubmission(null);
      }
      refetch();
    } catch (error) {
      console.error("Submission status update error:", error);
      toast.error(
        status === "approved"
          ? "Failed to approve submission"
          : "Failed to reject submission",
      );
    } finally {
      setBusyId(null);
    }
  };

  if (isLoading) return <DashboardSkeleton statsCount={3} showTable={true} />;

  return (
    <div className="w-full space-y-8">
      <PageTitle
        title="Tasks to Review"
        description="Review and approve task submissions from workers."
      />

      <PageHeader
        eyebrow="Review"
        title="Tasks to Review"
        description="Check submissions, then approve to pay workers or reject to re-open the slot."
      />

      {/* Stats */}
      <section
        aria-label="Submission statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <StatsCard
          label="Pending Reviews"
          Icon={ClipboardCheck}
          value={pendingSubmissions.length}
          subtitle="Awaiting your decision"
          color="text-amber-600 dark:text-amber-400"
        />
        <StatsCard
          label="Approved"
          Icon={CheckCircle2}
          value={approvedCount}
          subtitle="Workers paid"
          color="text-emerald-600 dark:text-emerald-400"
        />
        <StatsCard
          label="Rejected"
          Icon={XCircle}
          value={rejectedCount}
          subtitle="Slots re-opened"
          color="text-muted-foreground"
        />
      </section>

      {/* Table / empty state */}
      {pendingSubmissions.length === 0 ? (
        <EmptyState
          icon={<Inbox />}
          title="No submissions to review"
          description="When a worker submits proof of completion, it will appear here for you to approve."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Worker</TableHead>
                <TableHead>Task Title</TableHead>
                <TableHead className="text-right">Payable</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingSubmissions.map((s) => (
                <TableRow key={s._id}>
                  <TableCell className="min-w-52">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarImage src={s.worker_photo} alt={s.worker_name} />
                        <AvatarFallback className="text-xs">
                          {getInitials(s.worker_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {s.worker_name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {s.worker_email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="min-w-40">
                    <p className="line-clamp-1 text-sm font-medium">
                      {s.task_title}
                    </p>
                  </TableCell>

                  <TableCell className="text-right font-medium tabular-nums">
                    {s.payable_amount}{" "}
                    <span className="text-xs text-muted-foreground">
                      coins
                    </span>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground tabular-nums">
                    {formatDateTime(s.updatedAt)}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={s.status} />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubmission(s)}
                      >
                        <Eye className="size-3.5" data-icon="inline-start" />
                        Review
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-success"
                        disabled={busyId === s._id}
                        onClick={() => setSubmissionStatus(s, "approved")}
                      >
                        {busyId === s._id ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          "Approve"
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={busyId === s._id}
                        onClick={() => setSubmissionStatus(s, "rejected")}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Review dialog */}
      <Dialog
        open={!!selectedSubmission}
        onOpenChange={() => setSelectedSubmission(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Submission Review</DialogTitle>
            <DialogDescription>
              Verify the work was completed before approving.
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Worker</p>
                  <p className="truncate text-sm font-medium">
                    {selectedSubmission.worker_name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {selectedSubmission.worker_email}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Reward</p>
                  <p className="text-sm font-medium tabular-nums">
                    {selectedSubmission.payable_amount} coins
                  </p>
                  <p className="text-xs text-muted-foreground">on approval</p>
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Task
                </p>
                <p className="text-sm font-medium">
                  {selectedSubmission.task_title}
                </p>
              </div>

              <Separator />

              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Submission Notes
                </p>
                {selectedSubmission.submission_details ? (
                  <p className="whitespace-pre-wrap rounded-lg bg-muted/50 p-3 text-sm leading-relaxed">
                    {selectedSubmission.submission_details}
                  </p>
                ) : (
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileQuestion className="size-4" />
                    No text submission provided.
                  </p>
                )}
              </div>

              {selectedSubmission.proof_img && (
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Proof Image
                  </p>
                  <a href={selectedSubmission.proof_img} target="_blank" rel="noreferrer">
                    <img
                      src={selectedSubmission.proof_img}
                      alt="Worker submission proof"
                      className="mx-auto max-h-80 rounded-lg border object-contain shadow-sm"
                    />
                  </a>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Link2 className="size-3" />
                    Click image to open full size
                  </p>
                </div>
              )}

              <Separator />

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Badge variant="secondary" className="gap-1.5">
                  <ClipboardCheck className="size-3.5" />
                  Status: {selectedSubmission.status}
                </Badge>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setSelectedSubmission(null)}
            >
              Close
            </Button>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                disabled={busyId === selectedSubmission?._id}
                onClick={() =>
                  selectedSubmission &&
                  setSubmissionStatus(selectedSubmission, "rejected")
                }
              >
                {busyId === selectedSubmission?._id ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Reject"
                )}
              </Button>
              <Button
                className="bg-gradient-success"
                disabled={busyId === selectedSubmission?._id}
                onClick={() =>
                  selectedSubmission &&
                  setSubmissionStatus(selectedSubmission, "approved")
                }
              >
                {busyId === selectedSubmission?._id ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Approve & Pay"
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TasksToReview;
