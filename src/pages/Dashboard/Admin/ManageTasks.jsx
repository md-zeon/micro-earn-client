import { useState } from "react";
import { toast } from "sonner";
import useAdminTasks from "../../../hooks/useAdminTasks";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ManageTasksSkeleton from "../../../components/ui/ManageTasksSkeleton";
import PageTitle from "../../../components/PageTitle";
import { Badge } from "@/components/ui/badge";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ManageTasks = () => {
  const { tasks, isLoading, refetch } = useAdminTasks();
  const axiosSecure = useAxiosSecure();
  const [actionTarget, setActionTarget] = useState(null);
  const [actionType, setActionType] = useState(null); // 'approve' | 'reject' | 'delete'

  const handleApprove = (task) => {
    setActionTarget(task);
    setActionType("approve");
  };

  const handleReject = (task) => {
    setActionTarget(task);
    setActionType("reject");
  };

  const handleDelete = (task) => {
    setActionTarget(task);
    setActionType("delete");
  };

  const confirmAction = async () => {
    if (!actionTarget) return;
    try {
      if (actionType === "approve") {
        await axiosSecure.patch(`/admin/approve-task/${actionTarget._id}`);
        toast.success("Task approved");
      } else if (actionType === "reject") {
        await axiosSecure.patch(`/admin/reject-task/${actionTarget._id}`);
        toast.success("Task rejected");
      } else if (actionType === "delete") {
        await axiosSecure.delete(`/admin/delete-task/${actionTarget._id}`);
        toast.success("Task deleted");
      }
      refetch();
    } catch (err) {
      toast.error(`Failed to ${actionType} task`);
    } finally {
      setActionTarget(null);
      setActionType(null);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: "bg-gradient-warning",
      active: "bg-gradient-success",
      completed: "bg-gradient",
      rejected: "bg-gradient-error",
    };
    return (
      <Badge variant="secondary" className={variants[status] || ""}>
        {status}
      </Badge>
    );
  };

  if (isLoading) return <ManageTasksSkeleton />;

  return (
    <div className="space-y-8">
      <PageTitle
        title="Manage Tasks"
        description="Oversee and moderate all tasks on the platform."
      />
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Task Title</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((task, idx) => (
              <TableRow key={task._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium">{task.task_title}</TableCell>
                <TableCell>{task.buyer_name || task.buyer_email}</TableCell>
                <TableCell>${task.payable_amount}</TableCell>
                <TableCell>{getStatusBadge(task.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {task.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-gradient-success"
                          onClick={() => handleApprove(task)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(task)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(task)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!actionTarget}
        onOpenChange={() => {
          setActionTarget(null);
          setActionType(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "approve" && (
                <>
                  This will approve the task{" "}
                  <strong>{actionTarget?.task_title}</strong>.
                </>
              )}
              {actionType === "reject" && (
                <>
                  This will reject the task{" "}
                  <strong>{actionTarget?.task_title}</strong>.
                </>
              )}
              {actionType === "delete" && (
                <>
                  This will permanently delete the task{" "}
                  <strong>{actionTarget?.task_title}</strong>. This action
                  cannot be undone.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={
                actionType === "approve"
                  ? "bg-gradient-success text-white hover:opacity-90"
                  : "bg-gradient-error text-white hover:opacity-90"
              }
              onClick={confirmAction}
            >
              {actionType === "approve"
                ? "Approve"
                : actionType === "reject"
                  ? "Reject"
                  : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageTasks;
