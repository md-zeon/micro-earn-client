import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { LuCoins } from "react-icons/lu";

const CoinPackage = ({
  pkg,
  selectedPackage,
  processing,
  setSelectedPackage,
  setIsModalOpen,
}) => {
  return (
    <div
      className={`relative rounded-lg border p-6 transition-all duration-200 hover:shadow-lg bg-card
        ${
          selectedPackage?.id === pkg.id
            ? "border-primary ring-2 ring-primary"
            : "border-border"
        }
        ${processing && selectedPackage?.id === pkg.id ? "opacity-75" : ""}`}
    >
      {pkg.popular && (
        <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient text-white">
          Most Popular
        </Badge>
      )}

      <div className="text-center space-y-3">
        <h3 className="text-xl font-semibold">{pkg.coins} Micro Coins</h3>
        <p className="text-3xl font-bold text-blue-400">${pkg.price}</p>
        {pkg.bonus && (
          <Badge variant="secondary" className="bg-gradient-success text-white">
            Bonus: {pkg.bonus} coins
          </Badge>
        )}
      </div>

      <Button
        className="w-full mt-4 bg-gradient hover:opacity-80"
        onClick={() => {
          setSelectedPackage(pkg);
          setIsModalOpen(true);
        }}
        disabled={processing}
      >
        {processing && selectedPackage?.id === pkg.id ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <LuCoins className="h-4 w-4" />
            Buy Now
          </span>
        )}
      </Button>
    </div>
  );
};

export default CoinPackage;
