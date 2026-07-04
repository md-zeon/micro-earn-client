import { useState } from "react";
import { toast } from "sonner";
import StatsCard from "../../../components/shared/StatsCard";
import useAdminStats from "../../../hooks/useAdminStats";
import useWithdrawRequests from "../../../hooks/useWithdrawRequests";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  LuUsers,
  LuCoins,
  LuCreditCard,
  LuUserCheck,
  LuUserRound,
} from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import WithdrawRequestTable from "../../../components/Table/WithDrawRequestTable";
import PageTitle from "../../../components/PageTitle";
import AdminOverview from "../../../components/Dashboard/AdminOverview";
import DashboardSkeleton from "../../../components/ui/DashboardSkeleton";
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

const AdminDashboard = ({ greeting }) => {
  const { user } = useAuth();
  const { adminStats: stats, isLoading: isStatsLoading } = useAdminStats();
  const {
    pendingRequests: withdrawRequests,
    isWithdrawLoading,
    refetch,
  } = useWithdrawRequests();
  const axiosSecure = useAxiosSecure();
  const [selectedWithdraw, setSelectedWithdraw] = useState(null);

  if (isStatsLoading || isWithdrawLoading)
    return <DashboardSkeleton statsCount={4} showTable={true} />;

  const handleApprove = (withdraw) => {
    setSelectedWithdraw(withdraw);
  };

  const confirmApprove = async () => {
    if (!selectedWithdraw) return;
    try {
      await axiosSecure.patch(
        `/admin/approve-withdraw/${selectedWithdraw._id}`,
        {
          status: "approved",
        },
      );
      await axiosSecure.patch(
        `/user/update-coins/${selectedWithdraw.worker_email}`,
        {
          coinsToUpdate: selectedWithdraw.withdrawal_coin,
          status: "decrease",
        },
      );
      toast.success("Withdrawal Approved");
      refetch();
    } catch (err) {
      console.error("Error approving withdrawal:", err);
      toast.error("Failed to approve withdrawal");
    } finally {
      setSelectedWithdraw(null);
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle
        title="Admin Dashboard"
        description="Admin panel to manage MicroEarn users, tasks, and withdrawals in real-time."
      />
      <div className="sm:px-4">
        <div className="flex items-center justify-between flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {greeting}, {user?.displayName || "Admin"}!
            </h1>
            <p className="text-muted-foreground">
              Monitor platform activity and manage users.
            </p>
          </div>
          <Link to="/dashboard/profile">
            <Button className="bg-gradient hidden sm:inline-flex">
              <LuUserRound className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          label="Total Workers"
          Icon={LuUsers}
          value={stats?.totalWorkers}
          subtitle="Active workers on platform"
        />
        <StatsCard
          label="Total Buyers"
          Icon={LuUserCheck}
          value={stats?.totalBuyers}
          subtitle="Active buyers on platform"
        />
        <StatsCard
          label="Platform Coins"
          Icon={LuCoins}
          value={stats?.totalCoins}
          subtitle="Total coins in circulation"
        />
        <StatsCard
          label="Total Payments"
          Icon={LuCreditCard}
          value={`$${stats?.totalPayments?.toFixed(2)}`}
          subtitle="Total payments processed"
        />
      </div>

      <AdminOverview />

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Withdrawal Requests</h2>
        <p className="text-muted-foreground text-xs mb-4">
          Pending withdrawal requests from workers
        </p>
        <WithdrawRequestTable
          withdrawRequests={withdrawRequests}
          handleApprove={handleApprove}
        />
      </div>

      <AlertDialog
        open={!!selectedWithdraw}
        onOpenChange={() => setSelectedWithdraw(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will approve the withdrawal request for{" "}
              <strong>{selectedWithdraw?.withdrawal_coin}</strong> coins from{" "}
              {selectedWithdraw?.worker_email}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-success text-white hover:opacity-90"
              onClick={confirmApprove}
            >
              Yes, approve it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
