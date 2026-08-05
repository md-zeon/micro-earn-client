import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MIN_COINS = 200;

const WithdrawalForm = ({
  coinToWithdraw,
  setCoinToWithdraw,
  onSubmit,
  loading,
  maxCoins = 0,
}) => {
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const amount = Number(coinToWithdraw) || 0;
  const belowMinimum = amount > 0 && amount < MIN_COINS;
  const exceedsBalance = amount > maxCoins;
  const invalid = belowMinimum || exceedsBalance;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ coinToWithdraw: amount, paymentSystem, accountNumber });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="payment-system">Payment System</Label>
        <Select
          value={paymentSystem}
          onValueChange={(v) => {
            setPaymentSystem(v);
            setAccountNumber("");
          }}
        >
          <SelectTrigger id="payment-system">
            <SelectValue placeholder="Select payment system" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bank">Bank Transfer</SelectItem>
            <SelectItem value="bkash">bKash</SelectItem>
            <SelectItem value="nagad">Nagad</SelectItem>
            <SelectItem value="rocket">Rocket</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="account-number">Account Number</Label>
        <Input
          id="account-number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter your account number"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coin-amount">Coins to Withdraw</Label>
        <Input
          id="coin-amount"
          type="number"
          value={coinToWithdraw}
          onChange={(e) => setCoinToWithdraw(e.target.value)}
          placeholder="Enter amount"
          min={MIN_COINS}
          max={maxCoins}
          required
        />
        {belowMinimum ? (
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="bg-gradient-error">
              Minimum {MIN_COINS} coins required
            </Badge>
          </div>
        ) : exceedsBalance ? (
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="bg-gradient-error">
              You only have {maxCoins} coins
            </Badge>
          </div>
        ) : amount > 0 ? (
          <p className="text-sm text-muted-foreground">
            You will receive ${(amount / 20).toFixed(2)}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient"
        disabled={loading || !paymentSystem || !accountNumber || amount <= 0 || invalid}
      >
        {loading ? "Processing..." : "Submit Withdrawal Request"}
      </Button>
    </form>
  );
};

export default WithdrawalForm;
