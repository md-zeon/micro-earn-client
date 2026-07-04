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

const WithdrawalForm = ({
  coinToWithdraw,
  setCoinToWithdraw,
  onSubmit,
  loading,
}) => {
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ coinToWithdraw, paymentSystem, accountNumber });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Payment System</Label>
        <Select value={paymentSystem} onValueChange={setPaymentSystem}>
          <SelectTrigger>
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
        <Label>Account Number</Label>
        <Input
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter your account number"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Coins to Withdraw</Label>
        <Input
          type="number"
          value={coinToWithdraw}
          onChange={(e) => setCoinToWithdraw(e.target.value)}
          placeholder="Enter amount"
          min="200"
          required
        />
        {coinToWithdraw < 200 && (
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Minimum 200 coins required
            </p>
            <Badge variant="destructive" className="bg-gradient-error">
              Minimum 200 coins required
            </Badge>
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient"
        disabled={
          loading || !coinToWithdraw || !paymentSystem || !accountNumber
        }
      >
        {loading ? "Processing..." : "Submit Withdrawal Request"}
      </Button>
    </form>
  );
};

export default WithdrawalForm;
