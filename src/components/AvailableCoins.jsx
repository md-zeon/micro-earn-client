import useAvailableCoins from "../hooks/useAvailableCoins";
import { Badge } from "@/components/ui/badge";
import { LuCoins } from "react-icons/lu";

const AvailableCoins = () => {
  const { microCoins, isMicroCoinsLoading } = useAvailableCoins();

  if (isMicroCoinsLoading) {
    return <div className="h-6 w-20 bg-muted animate-pulse rounded" />;
  }

  return (
    <Badge variant="secondary" className="gap-1">
      <LuCoins className="h-3 w-3 text-emerald-500" />
      {microCoins ?? 0}
      <span className="hidden sm:inline text-xs">Micro Coins</span>
    </Badge>
  );
};

export default AvailableCoins;
