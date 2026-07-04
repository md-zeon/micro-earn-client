import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PaymentTable = ({ payments = [] }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Coins</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment, idx) => (
            <TableRow key={payment._id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell className="font-mono text-xs">
                {payment.transactionId || payment._id}
              </TableCell>
              <TableCell>${payment.amount_paid || payment.amount}</TableCell>
              <TableCell>{payment.coins || payment.coins_purchased}</TableCell>
              <TableCell>
                {new Date(
                  payment.createdAt || payment.date,
                ).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-gradient-success text-white lowercase"
                >
                  {payment.status || "completed"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentTable;
