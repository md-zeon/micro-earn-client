import { useState } from "react";
import useBuyerTasks from "../../../hooks/useBuyerTasks";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "sonner";
import MyTaskTable from "../../../components/Table/MyTaskTable";
import StatsCard from "../../../components/shared/StatsCard";
import UpdateTaskModal from "../../../components/Modals/UpdateTaskModal";
import useAuth from "../../../hooks/useAuth";
import DashboardSkeleton from "../../../components/ui/DashboardSkeleton";
import PageTitle from "../../../components/PageTitle";
import { Button } from "@/components/ui/button";
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

const MyTasks = () => {
  const { user } = useAuth();
  const { tasks, isTasksLoading, refetch } = useBuyerTasks();
  const { refetch: refetchCoins } = useAvailableCoins();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({
    task_title: "",
    task_detail: "",
    submission_info: "",
  });

  // Handle Delete Task
  const handleDelete = (taskId, requiredWorkers, payableAmount, status) => {
    setDeleteTarget({ taskId, requiredWorkers, payableAmount, status });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await axiosSecure.delete(`/tasks/${deleteTarget.taskId}`);
      if (deleteTarget.status === "active") {
        const refundAmount =
          deleteTarget.requiredWorkers * deleteTarget.payableAmount;
        await axiosSecure.patch(`/user/update-coins/${user?.email}`, {
          coinsToUpdate: refundAmount,
          status: "increase",
        });
      }
      refetch();
      refetchCoins();
      toast.success("Task deleted successfully");
    } catch (err) {
      console.error("Delete Task Error:", err);
      toast.error("Failed to delete task. Please try again.");
    } finally {
      setDeleteTarget(null);
    }
  };

  // Handle Update Task
  const handleUpdateClick = (task) => {
    setSelectedTask(task);
    setFormData({
      task_title: task.task_title,
      task_detail: task.task_detail,
      submission_info: task.submission_info,
    });
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/tasks/${selectedTask._id}`, formData);
      refetch();
      setIsModalOpen(false);
      toast.success("Task has been updated successfully");
    } catch (err) {
      console.error("Update Task Error:", err);
      toast.error("Failed to update task. Please try again.");
    }
  };

  if (isTasksLoading)
    return <DashboardSkeleton statsCount={4} showTable={true} />;

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((task) => task.status === "active").length;
  const totalInvestment = tasks.reduce(
    (sum, task) => sum + task.required_workers * task.payable_amount,
    0,
  );
  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  return (
    <div>
      <PageTitle
        title="My Tasks"
        description="Manage your posted tasks and track their progress."
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <Button className="bg-gradient-success rounded-full cursor-pointer">
          {tasks.length}
        </Button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard label="Total Tasks" value={totalTasks} />
        <StatsCard
          label="Active Tasks"
          value={activeTasks}
          color="text-blue-400"
        />
        <StatsCard
          label="Completed Tasks"
          value={completedTasks}
          color="text-green-400"
        />
        <StatsCard
          label="Total Investment"
          value={totalInvestment}
          color="text-blue-400"
          suffix="coins"
        />
      </div>

      {/* Task Table */}
      <MyTaskTable
        tasks={tasks}
        onUpdateClick={handleUpdateClick}
        onDeleteClick={(task) =>
          handleDelete(
            task._id,
            task.required_workers,
            task.payable_amount,
            task.status,
          )
        }
      />

      {/* Update Modal */}
      <UpdateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdateSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the task and refund coins for any uncompleted
              workers. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-error text-white hover:opacity-90"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyTasks;
