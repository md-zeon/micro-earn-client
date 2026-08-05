import useAvailableCoins from "../hooks/useAvailableCoins";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";

const AvailableCoins = () => {
  const { microCoins, isMicroCoinsLoading } = useAvailableCoins();

  if (isMicroCoinsLoading) {
    return <div className="h-6 w-20 bg-muted animate-pulse rounded" />;
  }

  return (
    <Badge variant="secondary" className="gap-1">
      <Coins className="h-3 w-3 text-emerald-500" />
      {microCoins ?? 0}
      <span className="hidden sm:inline text-xs">Micro Coins</span>
    </Badge>
  );
};

export default AvailableCoins;
