import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormField from "@/components/Form/FormField";

const MIN_COINS = 200;

const WithdrawalForm = ({ onSubmit, loading, maxCoins = 0 }) => {
  const withdrawalSchema = useMemo(
    () =>
      z.object({
        paymentSystem: z.string().min(1, "Select a payment system"),
        accountNumber: z
          .string()
          .trim()
          .min(6, "Account number must be at least 6 characters"),
        coinToWithdraw: z.coerce
          .number()
          .int("Enter a whole number of coins")
          .min(MIN_COINS, `Minimum ${MIN_COINS} coins required`)
          .max(maxCoins, `You only have ${maxCoins} coins`),
      }),
    [maxCoins],
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(withdrawalSchema),
    mode: "onTouched",
    defaultValues: {
      paymentSystem: "",
      accountNumber: "",
      coinToWithdraw: "",
    },
  });

  const amount = Number(watch("coinToWithdraw")) || 0;

  const onSubmitForm = async (data) => {
    try {
      await onSubmit({
        coinToWithdraw: data.coinToWithdraw,
        paymentSystem: data.paymentSystem,
        accountNumber: data.accountNumber.trim(),
      });
      reset();
    } catch {
      // Parent handler is responsible for the error toast.
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4" noValidate>
      <FormField
        label="Payment System"
        id="payment-system"
        error={errors.paymentSystem?.message}
        required
      >
        <Controller
          name="paymentSystem"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setValue("accountNumber", "");
              }}
            >
              <SelectTrigger
                id="payment-system"
                className="w-full"
                aria-invalid={!!errors.paymentSystem}
                aria-describedby={
                  errors.paymentSystem ? "payment-system-error" : undefined
                }
              >
                <SelectValue placeholder="Select payment system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="bkash">bKash</SelectItem>
                <SelectItem value="nagad">Nagad</SelectItem>
                <SelectItem value="rocket">Rocket</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </FormField>

      <FormField
        label="Account Number"
        id="account-number"
        error={errors.accountNumber?.message}
        required
      >
        <Input
          placeholder="Enter your account number"
          autoComplete="off"
          {...register("accountNumber")}
        />
      </FormField>

      <FormField
        label="Coins to Withdraw"
        id="coin-amount"
        error={errors.coinToWithdraw?.message}
        required
        hint={
          amount > 0
            ? `You will receive $${(amount / 20).toFixed(2)}`
            : undefined
        }
      >
        <Input
          type="number"
          placeholder="Enter amount"
          min={MIN_COINS}
          max={maxCoins}
          {...register("coinToWithdraw")}
        />
      </FormField>

      <Button
        type="submit"
        className="w-full bg-gradient"
        disabled={loading}
      >
        {loading ? "Processing..." : "Submit Withdrawal Request"}
      </Button>
    </form>
  );
};

export default WithdrawalForm;
