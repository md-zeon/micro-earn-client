import { useState } from "react";
import { Copy, Check, CreditCard } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatDate } from "@/lib/date";

const CopyId = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const shortId = value?.slice(0, 12) + "…";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
      {shortId}
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Copy transaction ID"
              onClick={handleCopy}
            />
          }
        >
          {copied ? (
            <Check className="size-3 text-emerald-500" />
          ) : (
            <Copy className="size-3" />
          )}
        </TooltipTrigger>
        <TooltipContent>Copy transaction ID</TooltipContent>
      </Tooltip>
    </span>
  );
};

const PaymentTable = ({ payments = [] }) => {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Coins</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment._id}>
              <TableCell className="min-w-44">
                <CopyId
                  value={payment.transaction_id || payment.transactionId || payment._id}
                />
              </TableCell>
              <TableCell className="text-right font-medium tabular-nums">
                ${payment.amount_paid || payment.amount || 0}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                <span className="inline-flex items-center gap-1 font-medium">
                  <CreditCard className="size-3.5 text-amber-500" aria-hidden="true" />
                  {payment.coins_purchased || payment.coins || 0}
                </span>
              </TableCell>
              <TableCell className="whitespace-nowrap text-sm text-muted-foreground tabular-nums">
                {formatDate(payment.payment_date || payment.createdAt || payment.date, {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})}
              </TableCell>
              <TableCell className="text-sm capitalize text-muted-foreground">
                {payment.payment_method || "card"}
              </TableCell>
              <TableCell>
                <StatusBadge status={payment.status || "completed"} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTable;
