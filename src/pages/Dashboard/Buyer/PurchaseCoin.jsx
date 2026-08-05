import { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Coins, Sparkles, ArrowRight } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAvailableCoins from "../../../hooks/useAvailableCoins";
import useAuth from "../../../hooks/useAuth";
import CoinPackage from "../../../components/Dashboard/CoinPackage";
import PaymentInformation from "../../../components/Dashboard/PaymentInformation";
import PageHeader from "../../../components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import PurchaseCoinSkeleton from "../../../components/ui/PurchaseCoinSkeleton";
import PageTitle from "../../../components/PageTitle";

const PurchaseModal = lazy(() =>
  import("../../../components/Modals/PurchaseModal"),
);

const coinPackages = [
  { id: "starter", coins: 100, price: 10 },
  { id: "popular", coins: 300, price: 25, popular: true, bonus: 50 },
  { id: "value", coins: 600, price: 45, bonus: 100 },
  { id: "pro", coins: 800, price: 60, bonus: 150 },
  { id: "premium", coins: 1200, price: 80, bonus: 300 },
  { id: "elite", coins: 2000, price: 130, bonus: 500 },
];

const PurchaseCoin = () => {
  const axiosSecure = useAxiosSecure();
  const { microCoins, refetch: refetchCoins, isMicroCoinsLoading: coinsLoading } =
    useAvailableCoins();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePurchase = async (pkg, receivedTransactionId) => {
    setProcessing(true);
    try {
      const totalCoins = pkg.coins + (pkg.bonus || 0);

      await axiosSecure.post("/payments", {
        transaction_id: receivedTransactionId,
        buyer_email: user?.email,
        buyer_name: user?.displayName,
        coins_purchased: totalCoins,
        amount_paid: pkg?.price,
        payment_date: new Date().toISOString(),
        payment_method: "stripe",
        status: "completed",
      });

      refetchCoins();
      setIsModalOpen(false);
      setSelectedPackage(null);
      toast.success(`${totalCoins} coins have been added to your account.`);
      navigate("/dashboard/add-task");
    } catch (err) {
      console.error("Purchase Error:", err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (coinsLoading) return <PurchaseCoinSkeleton />;

  return (
    <div className="w-full space-y-8">
      <PageTitle
        title="Purchase Coins"
        description="Buy coins to pay workers for completing your tasks."
      />

      <PageHeader
        eyebrow="Wallet"
        title="Purchase Coins"
        description="Top up your balance to create tasks and reward workers."
        actions={
          <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-4 py-2">
            <Coins className="size-5 text-amber-500" aria-hidden="true" />
            <div>
              <p className="text-xs text-muted-foreground">Available balance</p>
              <p className="text-sm font-semibold tabular-nums">
                {microCoins ?? 0} coins
              </p>
            </div>
          </div>
        }
      />

      {/* Package grid */}
      <section
        aria-label="Coin packages"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {coinPackages.map((pkg) => (
          <CoinPackage
            key={pkg.id}
            pkg={pkg}
            selectedPackage={selectedPackage}
            processing={processing}
            setSelectedPackage={setSelectedPackage}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </section>

      {/* Quick tip */}
      <Card className="border-primary/20 bg-gradient-soft">
        <CardContent className="flex flex-col items-center gap-2 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <Sparkles className="size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">Larger packages save you more</p>
              <p className="text-xs text-muted-foreground">
                Buy the 2000-coin Elite package and earn 500 bonus coins (25% extra).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const elite = coinPackages.find((p) => p.id === "elite");
              setSelectedPackage(elite);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View Elite package
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </CardContent>
      </Card>

      <PaymentInformation />

      {isModalOpen && selectedPackage && (
        <Suspense fallback={null}>
          <PurchaseModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedPackage(null);
            }}
            package={selectedPackage}
            onPurchase={handlePurchase}
          />
        </Suspense>
      )}
    </div>
  );
};

export default PurchaseCoin;
