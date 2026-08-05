import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  BadgeCheck,
  Ban,
  CalendarDays,
  ClipboardList,
  Coins,
  ListChecks,
  Trash2,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import PageHeader from "../../../components/shared/PageHeader";
import PageTitle from "../../../components/PageTitle";
import StatusBadge from "../../../components/shared/StatusBadge";
import DataTable from "../../../components/shared/DataTable";
import ManageTableSkeleton from "../../../components/ui/ManageTableSkeleton";
import useAdminTasks from "../../../hooks/useAdminTasks";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { formatDate } from "../../../lib/date";

const ACTION_COPY = {
  approve: {
    title: "Approve this task?",
    description: (t) =>
      `This will publish "${t?.task_title}" so workers can start earning. The buyer will be notified.`,
    confirm: "Approve task",
    busy: "Approving...",
  },
  reject: {
    title: "Reject this task?",
    description: (t) =>
      `This will mark "${t?.task_title}" as rejected and notify the buyer to review it.`,
    confirm: "Reject task",
    busy: "Rejecting...",
  },
  delete: {
    title: "Delete this task?",
    description: (t) =>
      `This will permanently delete "${t?.task_title}". Active tasks are refunded to the buyer. This action cannot be undone.`,
    confirm: "Delete task",
    busy: "Deleting...",
  },
};

const ManageTasks = () => {
  const { tasks, isLoading, refetch } = useAdminTasks();
  const axiosSecure = useAxiosSecure();
  const [actionTarget, setActionTarget] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [isBusy, setIsBusy] = useState(false);

  const summary = useMemo(() => {
    const counts = {
      total: tasks.length,
      active: 0,
      completed: 0,
      pending: 0,
      rejected: 0,
    };
    tasks.forEach((t) => {
      const key = t?.status;
      if (counts[key] !== undefined) counts[key] += 1;
      else counts.total += 0;
    });
    return counts;
  }, [tasks]);

  const runAction = async (task, type) => {
    setActionTarget(task);
    setActionType(type);
  };

  const confirmAction = async () => {
    if (!actionTarget || !actionType) return;
    setIsBusy(true);
    try {
      const url = `/admin/${actionType}-task/${actionTarget._id}`;
      if (actionType === "delete") {
        await axiosSecure.delete(url);
      } else {
        await axiosSecure.patch(url);
      }
      toast.success(`Task ${actionType === "approve" ? "approved" : actionType === "reject" ? "rejected" : "deleted"}`);
      refetch();
    } catch {
      toast.error(`Failed to ${actionType} task`);
    } finally {
      setIsBusy(false);
      setActionTarget(null);
      setActionType(null);
    }
  };

  if (isLoading) return <ManageTableSkeleton />;

  const columns = [
    {
      key: "task",
      header: "Task",
      cell: (t) => (
        <div className="flex max-w-64 items-start gap-3">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <ClipboardList className="size-4" aria-hidden="true" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-medium line-clamp-1">{t?.task_title || "Untitled task"}</span>
            <span className="text-xs text-muted-foreground line-clamp-1">
              {t?.buyer_name || t?.posted_by}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "payable_amount",
      header: "Amount",
      cell: (t) => (
        <span className="inline-flex items-center gap-1.5 tabular-nums font-medium">
          <Coins className="size-3.5 text-amber-500" aria-hidden="true" />
          {Number(t?.payable_amount ?? 0).toLocaleString()}
        </span>
      ),
    },
    {
      key: "workers",
      header: "Workers",
      cell: (t) => (
        <span className="inline-flex items-center gap-1.5 tabular-nums text-muted-foreground">
          <Users className="size-3.5" aria-hidden="true" />
          {Number(t?.required_workers ?? 0)}/{Number(t?.total_workers ?? 0)}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      key: "completion_deadline",
      header: "Deadline",
      cell: (t) => (
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          {formatDate(t?.completion_deadline)}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      key: "status",
      header: "Status",
      cell: (t) => <StatusBadge status={t?.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (t) => (
        <div className="flex items-center gap-1.5">
          {t?.status === "pending" && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="gap-1 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-emerald-400"
                onClick={(e) => {
                  e.stopPropagation();
                  runAction(t, "approve");
                }}
              >
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Approve</span>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="gap-1 text-amber-600 hover:bg-amber-500/10 hover:text-amber-600 dark:text-amber-400"
                onClick={(e) => {
                  e.stopPropagation();
                  runAction(t, "reject");
                }}
              >
                <Ban className="size-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Reject</span>
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            aria-label={`Delete task ${t?.task_title}`}
            onClick={() => runAction(t, "delete")}
          >
            <Trash2 aria-hidden="true" />
          </Button>
        </div>
      ),
    },
  ];

  const copy = ACTION_COPY[actionType];

  return (
    <div className="space-y-6">
      <PageTitle
        title="Manage Tasks"
        description="Oversee and moderate all tasks on the platform."
      />
      <PageHeader
        eyebrow="Moderation"
        title="Manage Tasks"
        description="Approve new tasks, reject unsuitable ones, and remove content that violates policy."
        actions={
          <Badge variant="secondary" className="gap-1 px-3 py-1">
            <ListChecks className="size-3.5" aria-hidden="true" />
            {summary.total} tasks
          </Badge>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { label: "Total", value: summary.total, tone: "text-foreground" },
          { label: "Pending", value: summary.pending, tone: "text-amber-600 dark:text-amber-400" },
          { label: "Active", value: summary.active, tone: "text-emerald-600 dark:text-emerald-400" },
          { label: "Completed", value: summary.completed, tone: "text-sky-600 dark:text-sky-400" },
          { label: "Rejected", value: summary.rejected, tone: "text-red-600 dark:text-red-400" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="flex flex-col gap-1 px-4 py-3">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className={`text-xl font-bold tabular-nums ${item.tone}`}>
                {item.value}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <DataTable
        data={tasks}
        columns={columns}
        caption="Platform tasks"
        searchKeys={["task_title", "buyer_name", "posted_by"]}
        searchPlaceholder="Search by title or buyer..."
        statusFilter={{
          key: "status",
          label: "Filter by status",
          options: [
            { label: "Pending", value: "pending" },
            { label: "Active", value: "active" },
            { label: "Completed", value: "completed" },
            { label: "Rejected", value: "rejected" },
          ],
        }}
        emptyIcon={<ClipboardList />}
        emptyTitle="No tasks found"
        emptyDescription="Try adjusting your search or status filter."
      />

      <AlertDialog
        open={!!actionTarget}
        onOpenChange={(open) => {
          if (!open) {
            setActionTarget(null);
            setActionType(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{copy?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {copy?.description(actionTarget)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isBusy}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              disabled={isBusy}
              className={
                actionType === "approve"
                  ? "bg-emerald-600 text-white hover:bg-emerald-500"
                  : "bg-red-600 text-white hover:bg-red-500"
              }
            >
              {isBusy ? copy?.busy : copy?.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageTasks;
