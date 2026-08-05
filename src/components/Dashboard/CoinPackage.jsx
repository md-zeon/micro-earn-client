import { Coins, Check, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CoinPackage = ({
  pkg,
  selectedPackage,
  processing,
  setSelectedPackage,
  setIsModalOpen,
}) => {
  const totalCoins = pkg.coins + (pkg.bonus || 0);
  const valuePerDollar = (totalCoins / pkg.price).toFixed(1);
  const isSelected = selectedPackage?.id === pkg.id;
  const isProcessing = processing && isSelected;

  return (
    <Card
      className={cn(
        "relative flex flex-col overflow-visible p-6 transition-all duration-200 hover:shadow-lg",
        isSelected && "border-primary shadow-lg shadow-primary/10",
      )}
    >
      {pkg.popular && (
        <Badge
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 gap-1 bg-gradient text-white shadow-md"
        >
          <Star className="size-3 fill-current" aria-hidden="true" />
          Most Popular
        </Badge>
      )}

      <div className="flex flex-1 flex-col items-center gap-2 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
          <Coins className="size-6" aria-hidden="true" />
        </div>
        <div className="mt-1">
          <h3 className="text-xl font-semibold tabular-nums">
            {totalCoins} coins
          </h3>
          <p className="text-xs text-muted-foreground">
            {pkg.bonus ? (
              <>
                {pkg.coins} +{" "}
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {pkg.bonus} bonus
                </span>
              </>
            ) : (
              "No bonus included"
            )}
          </p>
        </div>

        <p className="text-3xl font-bold tabular-nums text-primary">
          ${pkg.price}
        </p>

        <Badge variant="secondary" className="gap-1 tabular-nums">
          <Check className="size-3 text-emerald-500" aria-hidden="true" />
          {valuePerDollar} coins / $
        </Badge>
      </div>

      <Button
        className="mt-5 w-full bg-gradient shadow-lg shadow-emerald-500/20"
        onClick={() => {
          setSelectedPackage(pkg);
          setIsModalOpen(true);
        }}
        disabled={processing}
        aria-label={`Buy ${totalCoins} coins for $${pkg.price}`}
      >
        {isProcessing ? (
          <>
            <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
            Processing...
          </>
        ) : (
          "Buy Now"
        )}
      </Button>
    </Card>
  );
};

export default CoinPackage;
