import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useBuyerSubmissions from "../../../hooks/useBuyerSubmissions";
import { toast } from "sonner";
import DashboardSkeleton from "../../../components/ui/DashboardSkeleton";
import PageTitle from "../../../components/PageTitle";
import { Button } from "@/components/ui/button";
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const TasksToReview = () => {
  const { submissions, isLoading, refetch } = useBuyerSubmissions();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const buyerSubmissions = submissions?.filter(
    (s) => s.buyer_email === user?.email && s.status === "pending",
  );

  const handleApprove = async (submission) => {
    try {
      // Update Submission status
      await axiosSecure.patch("/submissions/status-update", {
        submissionId: submission._id,
        status: "approved",
      });

      // Update worker coins
      await axiosSecure.patch(`/user/update-coins/${submission.worker_email}`, {
        coinsToUpdate: submission.payable_amount,
        status: "increase",
      });
      refetch();
      toast.success("Submission approved and coins rewarded!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve submission.");
    }
  };

  const handleReject = async (submission) => {
    try {
      // Update Submission status
      await axiosSecure.patch("/submissions/status-update", {
        submissionId: submission._id,
        status: "rejected",
      });

      // update required workers by 1
      await axiosSecure.patch(`/tasks/update-workers/${submission.task_id}`, {
        status: "increase",
      });
      refetch();
      toast.success("Submission rejected!");
      setSelectedSubmission(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject submission.");
    }
  };

  if (isLoading) return <DashboardSkeleton statsCount={0} showTable={true} />;

  return (
    <div className="mt-12">
      <PageTitle
        title="Tasks to Review"
        description="Review and approve task submissions from workers."
      />
      <h2 className="text-xl font-bold mb-4">Tasks To Review</h2>
      {buyerSubmissions?.length === 0 ? (
        <p>No submissions to review.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Worker</TableHead>
                <TableHead>Task Title</TableHead>
                <TableHead>Payable</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buyerSubmissions?.map((s) => (
                <TableRow key={s._id}>
                  <TableCell>{s.worker_name}</TableCell>
                  <TableCell>{s.task_title}</TableCell>
                  <TableCell>{s.payable_amount}</TableCell>
                  <TableCell className="capitalize">{s.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubmission(s)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-success"
                        onClick={() => handleApprove(s)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(s)}
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

      {/* Modal */}
      <Dialog
        open={!!selectedSubmission}
        onOpenChange={() => setSelectedSubmission(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Worker:</strong> {selectedSubmission?.worker_name}
            </p>
            <p>
              <strong>Email:</strong> {selectedSubmission?.worker_email}
            </p>
            <p>
              <strong>Task:</strong> {selectedSubmission?.task_title}
            </p>
            <p>
              <strong>Submission Text:</strong>
            </p>
            <p className="p-3 rounded bg-muted">
              {selectedSubmission?.submission_details ||
                "No text submission provided."}
            </p>
            {selectedSubmission?.proof_img && (
              <div>
                <p className="mt-4 mb-1">
                  <strong>Proof Image:</strong>
                </p>
                <img
                  src={selectedSubmission.proof_img}
                  alt="Proof"
                  className="rounded-lg border border-border shadow-md max-h-[400px] mx-auto"
                />
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="destructive"
              onClick={() => {
                handleReject(selectedSubmission);
              }}
            >
              Reject
            </Button>
            <Button
              className="bg-gradient-success"
              onClick={() => {
                handleApprove(selectedSubmission);
              }}
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TasksToReview;
