import { Link } from "react-router";
import {
  DollarSign,
  Coins,
  CreditCard,
  ReceiptText,
  ArrowUpRight,
} from "lucide-react";
import StatsCard from "../../../components/shared/StatsCard";
import PaymentTable from "../../../components/Table/PaymentTable";
import RecentActivity from "../../../components/Dashboard/RecentActivity";
import EmptyState from "../../../components/shared/EmptyState";
import PageHeader from "../../../components/shared/PageHeader";
import useBuyerPayments from "../../../hooks/useBuyerPayments";
import DashboardSkeleton from "../../../components/ui/DashboardSkeleton";
import { Button } from "@/components/ui/button";
import PageTitle from "../../../components/PageTitle";

const PaymentHistory = () => {
  const { payments, isPaymentsLoading } = useBuyerPayments();

  const totalSpent = payments.reduce(
    (sum, p) => sum + (p.amount_paid || p.amount || 0),
    0,
  );
  const totalCoinsPurchased = payments.reduce(
    (sum, p) => sum + (p.coins_purchased || p.coins || 0),
    0,
  );

  if (isPaymentsLoading) {
    return <DashboardSkeleton statsCount={3} showTable={true} />;
  }

  return (
    <div className="w-full space-y-8">
      <PageTitle
        title="Payment History"
        description="View your complete payment and transaction history."
      />

      <PageHeader
        eyebrow="Billing"
        title="Payment History"
        description="Track every coin purchase and transaction on your account."
        actions={
          <Button
            render={<Link to="/dashboard/purchase-coin" />}
            className="bg-gradient shadow-lg shadow-emerald-500/20"
          >
            Buy Coins
            <ArrowUpRight className="size-4" data-icon="inline-end" />
          </Button>
        }
      />

      {/* Stats */}
      <section
        aria-label="Payment statistics"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <StatsCard
          label="Total Spent"
          Icon={DollarSign}
          value={`$${totalSpent}`}
          subtitle="Lifetime purchases"
          color="text-blue-600 dark:text-blue-400"
        />
        <StatsCard
          label="Total Coins Purchased"
          Icon={Coins}
          value={totalCoinsPurchased}
          suffix="coins"
          subtitle="Includes bonuses"
          color="text-amber-600 dark:text-amber-400"
        />
        <StatsCard
          label="Transactions"
          Icon={CreditCard}
          value={payments.length}
          subtitle="Completed purchases"
          color="text-emerald-600 dark:text-emerald-400"
        />
      </section>

      {/* Transaction table */}
      <section aria-label="Transaction history" className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <ReceiptText className="size-5 text-muted-foreground" aria-hidden="true" />
          Transaction History
        </h2>

        {payments.length === 0 ? (
          <EmptyState
            icon={<ReceiptText />}
            title="No transactions yet"
            description="When you purchase coins, your transactions will appear here."
            action={
              <Button
                render={<Link to="/dashboard/purchase-coin" />}
                className="bg-gradient"
              >
                <Coins className="size-4" data-icon="inline-start" />
                Purchase Coins
              </Button>
            }
          />
        ) : (
          <PaymentTable payments={payments} />
        )}
      </section>

      {/* Recent activity */}
      <section aria-label="Recent activity">
        <RecentActivity payments={payments} />
      </section>
    </div>
  );
};

export default PaymentHistory;
