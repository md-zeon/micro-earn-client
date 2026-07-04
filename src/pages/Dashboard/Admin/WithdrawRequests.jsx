import { useState } from "react";
import { toast } from "sonner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import WithdrawRequestTable from "../../../components/Table/WithDrawRequestTable";
import PageTitle from "../../../components/PageTitle";
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
import useWithdrawRequests from "../../../hooks/useWithdrawRequests";

const WithdrawRequests = () => {
  const {
    pendingRequests: withdrawRequests,
    isWithdrawLoading,
    refetch,
  } = useWithdrawRequests();
  const axiosSecure = useAxiosSecure();
  const [selectedWithdraw, setSelectedWithdraw] = useState(null);

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
        title="Withdraw Requests"
        description="Manage withdrawal requests from workers."
      />
      <WithdrawRequestTable
        withdrawRequests={withdrawRequests}
        handleApprove={handleApprove}
      />

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

export default WithdrawRequests;
