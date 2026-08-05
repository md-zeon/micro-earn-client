import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ReviewSubmissionModal = ({
  submission,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!submission) return null;

  return (
    <Dialog open={!!submission} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Submission Details</DialogTitle>
          <DialogDescription>
            Review this submission and approve or reject it. Approval credits
            the worker's coins immediately.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <div>
            <strong>Task:</strong> {submission.task_title}
          </div>
          <div>
            <strong>Worker:</strong>{" "}
            {submission.worker_name || submission.worker_email}
          </div>
          <div>
            <strong>Details:</strong>
            <p className="text-muted-foreground mt-1">
              {submission.submission_details}
            </p>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="destructive" onClick={() => onReject(submission)}>
            Reject
          </Button>
          <Button
            className="bg-gradient-success"
            onClick={() => onApprove(submission)}
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewSubmissionModal;
