import { useMemo } from "react";
import { Wallet, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/shared/StatusBadge";
import { formatDateTime } from "@/lib/date";

const RecentActivity = ({ payments = [], limit = 5 }) => {
  const recent = useMemo(
    () =>
      [...payments]
        .sort(
          (a, b) =>
            new Date(b.payment_date || b.createdAt) -
            new Date(a.payment_date || a.createdAt),
        )
        .slice(0, limit),
    [payments, limit],
  );

  if (recent.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wallet className="size-4" aria-hidden="true" />
            No purchases yet. Buy coins to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {recent.map((payment) => {
          const date =
            payment.payment_date || payment.createdAt || payment.date;
          return (
            <div
              key={payment._id}
              className="flex items-center justify-between gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                  <CreditCard className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    Purchased {payment.coins_purchased || payment.coins || 0} coins
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {formatDateTime(date)}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <p className="text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                  ${payment.amount_paid || payment.amount || 0}
                </p>
                <StatusBadge status={payment.status || "completed"} />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
