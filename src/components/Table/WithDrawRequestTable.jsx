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

const WithDrawRequestTable = ({ withdrawRequests = [], handleApprove }) => {
  const hasPending = withdrawRequests?.some((w) => w?.status === "pending");

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Worker Email</TableHead>
            <TableHead>Amount (Coins)</TableHead>
            <TableHead>Payment System</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Status</TableHead>
            {hasPending && <TableHead>Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawRequests?.map((withdraw, idx) => (
            <TableRow key={withdraw._id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{withdraw.worker_email}</TableCell>
              <TableCell>{withdraw.withdrawal_coin}</TableCell>
              <TableCell className="capitalize">
                {withdraw.payment_system}
              </TableCell>
              <TableCell className="font-mono text-xs">
                {withdraw.account_number}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    withdraw?.status === "pending"
                      ? "secondary"
                      : withdraw?.status === "approved"
                        ? "default"
                        : "destructive"
                  }
                  className={
                    withdraw?.status === "pending"
                      ? "bg-gradient-warning"
                      : withdraw?.status === "approved"
                        ? "bg-gradient-success"
                        : ""
                  }
                >
                  {withdraw?.status}
                </Badge>
              </TableCell>
              {hasPending && (
                <TableCell>
                  {withdraw?.status === "pending" && (
                    <Button
                      size="sm"
                      className="bg-gradient-success"
                      onClick={() => handleApprove(withdraw)}
                    >
                      Approve
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WithDrawRequestTable;
