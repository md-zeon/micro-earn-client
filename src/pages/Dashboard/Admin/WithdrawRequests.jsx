import { useMemo, useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, Coins, HandCoins, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import WithDrawRequestTable from "../../../components/Table/WithDrawRequestTable";
import WithdrawRequestsSkeleton from "../../../components/ui/WithdrawRequestsSkeleton";
import useWithdrawRequests from "../../../hooks/useWithdrawRequests";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const totalCoins = (requests) =>
  (requests ?? []).reduce((sum, w) => sum + (Number(w?.withdrawal_coin) || 0), 0);

const WithdrawRequests = () => {
  const {
    pendingRequests,
    approvedRequests,
    isWithdrawLoading,
    refetch,
  } = useWithdrawRequests();
  const axiosSecure = useAxiosSecure();
  const [selectedWithdraw, setSelectedWithdraw] = useState(null);
  const [isApproving, setIsApproving] = useState(false);

  const pendingCount = pendingRequests?.length ?? 0;
  const approvedCount = approvedRequests?.length ?? 0;

  const stats = useMemo(() => {
    const totalPendingCoins = totalCoins(pendingRequests);
    const totalApprovedCoins = totalCoins(approvedRequests);
    const pendingValue = totalPendingCoins / 20;
    const approvedValue = totalApprovedCoins / 20;
    return { totalPendingCoins, totalApprovedCoins, pendingValue, approvedValue };
  }, [pendingRequests, approvedRequests]);

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

  if (isWithdrawLoading) return <WithdrawRequestsSkeleton />;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Withdraw Requests"
        description="Manage worker withdrawal requests."
      />
      <PageHeader
        eyebrow="Payments"
        title="Withdraw Requests"
        description="Approve pending payouts and review previously approved ones."
        actions={
          pendingCount > 0 ? (
            <Badge className="gap-1 bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/25 dark:text-amber-400">
              <Wallet className="size-3.5" aria-hidden="true" />
              {pendingCount} pending
            </Badge>
          ) : (
            <Badge variant="secondary" className="gap-1">
              <BadgeCheck className="size-3.5" aria-hidden="true" />
              All caught up
            </Badge>
          )
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Pending Requests", value: pendingCount, icon: Wallet, tone: "text-amber-600 dark:text-amber-400" },
          { label: "Approved", value: approvedCount, icon: BadgeCheck, tone: "text-emerald-600 dark:text-emerald-400" },
          { label: "Pending Coins", value: stats.totalPendingCoins.toLocaleString(), icon: Coins, tone: "text-foreground" },
          { label: "Pending Value", value: `$${stats.pendingValue.toFixed(2)}`, icon: HandCoins, tone: "text-violet-600 dark:text-violet-400" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardContent className="flex items-center justify-between gap-2 px-4 py-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className={`text-xl font-bold tabular-nums ${item.tone}`}>
                    {item.value}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
                >
                  <Icon className="size-4" />
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending" className="gap-1.5">
            <Wallet className="size-3.5" aria-hidden="true" />
            Pending
            <Badge variant="secondary" className="h-5 rounded-full px-1.5 tabular-nums">
              {pendingCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-1.5">
            <BadgeCheck className="size-3.5" aria-hidden="true" />
            Approved
            <Badge variant="secondary" className="h-5 rounded-full px-1.5 tabular-nums">
              {approvedCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          <WithDrawRequestTable
            withdrawRequests={pendingRequests ?? []}
            handleApprove={setSelectedWithdraw}
            caption="Pending withdrawal requests"
          />
        </TabsContent>

        <TabsContent value="approved" className="mt-4">
          <WithDrawRequestTable
            withdrawRequests={approvedRequests ?? []}
            allowApprove={false}
            caption="Approved withdrawal requests"
          />
        </TabsContent>
      </Tabs>

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

export default WithdrawRequests;
