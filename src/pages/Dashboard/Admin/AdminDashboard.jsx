import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import {
  ArrowRight,
  Coins,
  CreditCard,
  ShieldCheck,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
import StatsCard from "../../../components/shared/StatsCard";
import PageHeader from "../../../components/shared/PageHeader";
import PageTitle from "../../../components/PageTitle";
import AdminOverview from "../../../components/Dashboard/AdminOverview";
import WithDrawRequestTable from "../../../components/Table/WithDrawRequestTable";
import useAdminStats from "../../../hooks/useAdminStats";
import useWithdrawRequests from "../../../hooks/useWithdrawRequests";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import DashboardSkeleton from "../../../components/ui/DashboardSkeleton";

const AdminDashboard = ({ greeting }) => {
  const { user } = useAuth();
  const { adminStats: stats, isLoading: isStatsLoading } = useAdminStats();
  const {
    pendingRequests,
    approvedRequests,
    isWithdrawLoading,
    refetch,
  } = useWithdrawRequests();
  const axiosSecure = useAxiosSecure();
  const [selectedWithdraw, setSelectedWithdraw] = useState(null);
  const [isApproving, setIsApproving] = useState(false);

  const isLoading = isStatsLoading || isWithdrawLoading;

  const pendingCount = pendingRequests?.length ?? 0;
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const confirmApprove = async () => {
    if (!selectedWithdraw) return;
    setIsApproving(true);
    try {
      await axiosSecure.patch(
        `/admin/approve-withdraw/${selectedWithdraw._id}`,
      );
      toast.success("Withdrawal approved");
      refetch();
    } catch (err) {
      console.error("Error approving withdrawal:", err);
      toast.error("Failed to approve withdrawal");
    } finally {
      setIsApproving(false);
      setSelectedWithdraw(null);
    }
  };

  if (isLoading) return <DashboardSkeleton statsCount={4} showTable={true} />;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Admin Dashboard"
        description="Monitor platform health and manage users, tasks, and withdrawals."
      />

      {/* Greeting hero */}
      <section
        aria-label="Admin overview"
        className="relative overflow-hidden rounded-xl bg-linear-to-br from-emerald-600 via-teal-600 to-teal-700 p-6 text-white shadow-lg shadow-emerald-600/20 sm:p-8"
      >
        <div className="grid-pattern absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium text-emerald-100/90 uppercase tracking-wider">
              {today}
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {greeting}, {user?.displayName?.split(" ")[0] || "Admin"}!
            </h1>
            <p className="max-w-lg text-sm text-emerald-50/90">
              Here is what&apos;s happening on MicroEarn today.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge
                variant="secondary"
                className="bg-white/15 text-white ring-1 ring-white/20 backdrop-blur"
              >
                <ShieldCheck className="size-3" aria-hidden="true" />
                Admin Panel
              </Badge>
              {pendingCount > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-white/15 text-white ring-1 ring-white/20 backdrop-blur"
                >
                  <Wallet className="size-3" aria-hidden="true" />
                  {pendingCount} pending withdrawal{pendingCount === 1 ? "" : "s"}
                </Badge>
              )}
            </div>
          </div>
          <Link to="/dashboard/profile">
            <Button
              variant="secondary"
              className="w-full bg-white/95 text-emerald-700 hover:bg-white md:w-auto"
            >
              <UserRound aria-hidden="true" />
              View Profile
            </Button>
          </Link>
        </div>
      </section>

      {/* KPI cards */}
      <section aria-label="Platform metrics" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Total Workers"
          Icon={Users}
          tone="emerald"
          value={stats?.totalWorkers}
          subtitle="Active workers on platform"
        />
        <StatsCard
          label="Total Buyers"
          Icon={UserRound}
          tone="sky"
          value={stats?.totalBuyers}
          subtitle="Active buyers on platform"
        />
        <StatsCard
          label="Platform Coins"
          Icon={Coins}
          tone="amber"
          value={stats?.totalCoins}
          subtitle="Coins in circulation"
        />
        <StatsCard
          label="Total Payments"
          Icon={CreditCard}
          tone="violet"
          value={`$${Number(stats?.totalPayments ?? 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          subtitle="Payments processed"
        />
      </section>

      {/* Charts */}
      <AdminOverview />

      {/* Pending withdrawals */}
      <section aria-label="Pending withdrawal requests">
        <Card className="overflow-hidden">
          <CardHeader className="flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Wallet className="size-4 text-muted-foreground" aria-hidden="true" />
              <CardTitle>Withdrawal Requests</CardTitle>
              {pendingCount > 0 && (
                <Badge className="bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/25 dark:text-amber-400">
                  {pendingCount} pending
                </Badge>
              )}
            </div>
            <Link
              to="/dashboard/withdraw-requests"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <WithDrawRequestTable
              withdrawRequests={pendingRequests ?? []}
              handleApprove={setSelectedWithdraw}
            />
          </CardContent>
        </Card>
      </section>

      <AlertDialog
        open={!!selectedWithdraw}
        onOpenChange={(open) => {
          if (!open) setSelectedWithdraw(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve this withdrawal?</AlertDialogTitle>
            <AlertDialogDescription>
              This will approve the withdrawal of{" "}
              <strong>{Number(selectedWithdraw?.withdrawal_coin ?? 0).toLocaleString()}</strong>{" "}
              coins (${Number(selectedWithdraw?.withdrawal_amount ?? 0).toFixed(2)}) for{" "}
              <strong>{selectedWithdraw?.worker_email}</strong>. The coins will be
              deducted from the worker&apos;s balance.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isApproving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmApprove}
              disabled={isApproving}
              className="bg-emerald-600 text-white hover:bg-emerald-500"
            >
              {isApproving ? "Approving..." : "Approve"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
