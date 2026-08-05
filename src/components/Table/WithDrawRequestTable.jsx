import { BadgeCheck, Coins, HandCoins } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StatusBadge from "@/components/shared/StatusBadge";
import DataTable from "@/components/shared/DataTable";

const formatAccount = (account) =>
  account ? `•••• ${String(account).slice(-4)}` : "—";

/**
 * Shared withdrawal requests table used by the admin dashboard and the
 * Withdraw Requests page. Renders pending and approved requests with
 * search and pagination via the shared DataTable.
 */
const WithDrawRequestTable = ({
  withdrawRequests = [],
  approvedRequests = [],
  handleApprove,
  allowApprove = true,
  caption = "Withdrawal requests",
}) => {
  const requests = approvedRequests.length
    ? [...withdrawRequests, ...approvedRequests]
    : withdrawRequests;

  const columns = [
    {
      key: "worker",
      header: "Worker",
      cell: (w) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback>
              {w?.worker_name?.charAt(0)?.toUpperCase() ||
                w?.worker_email?.charAt(0)?.toUpperCase() ||
                "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight">
            <span className="font-medium">
              {w?.worker_name || "Unknown"}
            </span>
            <span className="text-xs text-muted-foreground">
              {w?.worker_email}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "withdrawal_coin",
      header: "Amount",
      cell: (w) => (
        <div className="flex items-center gap-1.5 tabular-nums">
          <Coins className="size-3.5 text-muted-foreground" aria-hidden="true" />
          <span className="font-medium">
            {Number(w?.withdrawal_coin ?? 0).toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">
            (${(Number(w?.withdrawal_amount ?? 0)).toFixed(2)})
          </span>
        </div>
      ),
    },
    {
      key: "payment_system",
      header: "Payment System",
      cell: (w) => (
        <Badge variant="secondary" className="gap-1 capitalize">
          <HandCoins className="size-3" aria-hidden="true" />
          {w?.payment_system ?? "—"}
        </Badge>
      ),
      hideOnMobile: true,
    },
    {
      key: "account_number",
      header: "Account",
      cell: (w) => (
        <span className="font-mono text-xs text-muted-foreground">
          {formatAccount(w?.account_number)}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      key: "status",
      header: "Status",
      cell: (w) => <StatusBadge status={w?.status} />,
    },
  ];

  if (allowApprove) {
    columns.push({
      key: "actions",
      header: "Action",
      cell: (w) =>
        w?.status === "pending" ? (
          <Button
            size="sm"
            variant="outline"
            className="gap-1 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-emerald-400"
            onClick={(e) => {
              e.stopPropagation();
              handleApprove?.(w);
            }}
          >
            <BadgeCheck className="size-3.5" aria-hidden="true" />
            Approve
          </Button>
        ) : null,
    });
  }

  return (
    <DataTable
      data={requests}
      columns={columns}
      caption={caption}
      searchKeys={["worker_email", "worker_name", "payment_system"]}
      searchPlaceholder="Search by worker, email or method..."
      statusFilter={{
        key: "status",
        label: "Filter by status",
        options: [
          { label: "Pending", value: "pending" },
          { label: "Approved", value: "approved" },
        ],
      }}
      emptyIcon={<HandCoins />}
      emptyTitle="No withdrawal requests"
      emptyDescription="There are no withdrawal requests matching your search."
    />
  );
};

export default WithDrawRequestTable;
