import { Link } from "react-router";
import { Plus, ListTodo, CircleDashed, Inbox, Coins, ArrowRight } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import useBuyerTasks from "../../../hooks/useBuyerTasks";
import useBuyerSubmissions from "../../../hooks/useBuyerSubmissions";
import StatsCard from "../../../components/shared/StatsCard";
import StatusBadge from "../../../components/shared/StatusBadge";
import EmptyState from "../../../components/shared/EmptyState";
import PageHeader from "../../../components/shared/PageHeader";
import DashboardSkeleton from "../../../components/ui/DashboardSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageTitle from "../../../components/PageTitle";
import BuyerOverview from "../../../components/Dashboard/BuyerOverview";

const BuyerDashboard = ({ greeting }) => {
  const { user, loading: authLoading } = useAuth();
  const { microCoins, isMicroCoinsLoading: coinsLoading } = useAvailableCoins();
  const { tasks, isTasksLoading } = useBuyerTasks();
  const { submissions, isLoading: submissionsLoading } = useBuyerSubmissions();

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((t) => t.status === "active").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  const pendingSubmissions =
    submissions?.filter((s) => s.status === "pending") || [];
  const recentToReview = pendingSubmissions.slice(0, 5);

  const loading = authLoading || coinsLoading || isTasksLoading;

  return (
    <div className="w-full space-y-8">
      <PageTitle
        title="Buyer Dashboard"
        description="Manage your tasks, review worker submissions, and handle payments on MicroEarn."
      />

      {loading ? (
        <DashboardSkeleton statsCount={4} showTable={false} title={false} />
      ) : (
        <>
          <PageHeader
            eyebrow="Overview"
            title={`${greeting}, ${user?.displayName || "Buyer"}!`}
            description="Here's what's happening with your tasks and submissions today."
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

          {/* Metric cards */}
          <section aria-label="Key metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              label="Total Tasks"
              Icon={ListTodo}
              value={totalTasks}
              subtitle="Tasks you've posted"
              color="text-primary"
            />
            <StatsCard
              label="Active Tasks"
              Icon={CircleDashed}
              value={activeTasks}
              subtitle={`${completedTasks} completed so far`}
              color="text-emerald-600 dark:text-emerald-400"
            />
            <StatsCard
              label="Pending Reviews"
              Icon={Inbox}
              value={pendingSubmissions.length}
              subtitle="Submissions awaiting your decision"
              color="text-amber-600 dark:text-amber-400"
            />
            <StatsCard
              label="Available Coins"
              Icon={Coins}
              value={microCoins ?? 0}
              suffix="coins"
              subtitle="Ready to spend on tasks"
              color="text-sky-600 dark:text-sky-400"
            />
          </section>

          {/* Charts */}
          <BuyerOverview />

          {/* Pending submissions to review */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-base">Submissions To Review</CardTitle>
              {pendingSubmissions.length > 0 && (
                <CardAction>
                  <Button
                    render={<Link to="/dashboard/tasks-to-review" />}
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                  >
                    View all
                    <ArrowRight className="size-4" data-icon="inline-end" />
                  </Button>
                </CardAction>
              )}
            </CardHeader>
            <CardContent>
              {submissionsLoading ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
                  ))}
                </div>
              ) : recentToReview.length === 0 ? (
                <EmptyState
                  icon={<Inbox />}
                  title="All caught up"
                  description="No pending submissions right now. New worker submissions will appear here for quick review."
                />
              ) : (
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {recentToReview.map((s) => (
                    <li key={s._id} className="flex items-center gap-3 rounded-lg border bg-card p-3">
                      <Avatar className="size-9">
                        <AvatarImage src={s.worker_photo || undefined} alt="" />
                        <AvatarFallback>
                          {s.worker_name?.charAt(0)?.toUpperCase() || "W"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{s.task_title || "Task submission"}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {s.worker_name} · {s.payable_amount} coins
                        </p>
                      </div>
                      <StatusBadge status="pending" />
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default BuyerDashboard;
