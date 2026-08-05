import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Search, Plus, ListTodo, CircleDashed, CheckCircle2, Coins, Inbox } from "lucide-react";
import { toast } from "sonner";
import useBuyerTasks from "../../../hooks/useBuyerTasks";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import MyTaskTable from "../../../components/Table/MyTaskTable";
import StatsCard from "../../../components/shared/StatsCard";
import EmptyState from "../../../components/shared/EmptyState";
import PageHeader from "../../../components/shared/PageHeader";
import DashboardSkeleton from "../../../components/ui/DashboardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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
import PageTitle from "../../../components/PageTitle";

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

const MyTasks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, isTasksLoading, refetch } = useBuyerTasks();
  const { refetch: refetchCoins } = useAvailableCoins();
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesSearch =
        !q || (task.task_title || "").toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [tasks, search, statusFilter]);

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((t) => t.status === "active").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const totalInvestment = tasks.reduce(
    (sum, t) => sum + (t.required_workers || 0) * (t.payable_amount || 0),
    0,
  );

  const handleDelete = (task) => {
    setDeleteTarget(task);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await axiosSecure.delete(`/tasks/${deleteTarget._id}`);
      if (deleteTarget.status === "active") {
        const refundAmount =
          (deleteTarget.required_workers || 0) * (deleteTarget.payable_amount || 0);
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

  const handleEditClick = (task) => {
    navigate(`/dashboard/edit-task/${task._id}`);
  };

  if (isTasksLoading) {
    return <DashboardSkeleton statsCount={4} showTable={true} />;
  }

  return (
    <div className="w-full space-y-8">
      <PageTitle
        title="My Tasks"
        description="Manage your posted tasks and track their progress."
      />

      <PageHeader
        eyebrow="Tasks"
        title="My Tasks"
        description="Create, track, and manage the tasks you've posted."
        actions={
          <Button
            render={<Link to="/dashboard/add-task" />}
            className="bg-gradient shadow-lg shadow-emerald-500/20"
          >
            <Plus className="size-4" data-icon="inline-start" />
            Add New Task
          </Button>
        }
      />

      {/* Stats */}
      <section
        aria-label="Task statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatsCard label="Total Tasks" Icon={ListTodo} value={totalTasks} subtitle="All posted tasks" color="text-primary" />
        <StatsCard label="Active Tasks" Icon={CircleDashed} value={activeTasks} subtitle="Still accepting workers" color="text-emerald-600 dark:text-emerald-400" />
        <StatsCard label="Completed Tasks" Icon={CheckCircle2} value={completedTasks} subtitle="Fully fulfilled" color="text-sky-600 dark:text-sky-400" />
        <StatsCard label="Total Investment" Icon={Coins} value={totalInvestment} suffix="coins" subtitle="Reserved for these tasks" color="text-amber-600 dark:text-amber-400" />
      </section>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter tasks by status"
          className="flex w-fit items-center gap-1 rounded-lg bg-muted p-1"
        >
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setStatusFilter(f.key)}
              aria-pressed={statusFilter === f.key}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                statusFilter === f.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative sm:w-72">
          <Search
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
            className="pl-8"
          />
        </div>
      </div>

      {/* Table / empty state */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={search || statusFilter !== "all" ? <Search /> : <Inbox />}
          title={
            tasks.length === 0 ? "No tasks yet" : "No matching tasks"
          }
          description={
            tasks.length === 0
              ? "Post your first task to start hiring workers and get things done."
              : "Try adjusting your search or filters."
          }
          action={
            tasks.length === 0 ? (
              <Button
                render={<Link to="/dashboard/add-task" />}
                className="bg-gradient"
              >
                <Plus className="size-4" data-icon="inline-start" />
                Create a Task
              </Button>
            ) : undefined
          }
        />
      ) : (
        <MyTaskTable
          tasks={filteredTasks}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
        />
      )}

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-1">
                <strong>{deleteTarget?.task_title}</strong> will be permanently
                removed.
              </p>
              {deleteTarget?.status === "active" && (
                <p>
                  {deleteTarget.required_workers * deleteTarget.payable_amount}{" "}
                  coins for unfilled workers will be refunded to your account.
                </p>
              )}
              <p className="mt-1">This action cannot be undone.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-error text-white hover:opacity-90"
              onClick={confirmDelete}
            >
              Delete Task
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyTasks;
