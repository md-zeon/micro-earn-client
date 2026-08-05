import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";

const CheckoutForm = ({ pkg, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  const totalPrice = pkg?.price;
  const totalCoins = (pkg?.coins || 0) + (pkg?.bonus || 0);

  useEffect(() => {
    if (totalPrice) {
      axiosSecure
        .post("/payments/create-payment-intent", {
          amount: totalPrice,
          buyer_email: user?.email,
          buyer_name: user?.displayName,
          coins: totalCoins,
        })
        .then((res) => setClientSecret(res?.data?.clientSecret))
        .catch(() => toast.error("Failed to initialize payment."));
    }
  }, [axiosSecure, totalPrice, user?.email, user?.displayName, totalCoins]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret || !user) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodErr, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      });

    if (methodErr) {
      setCardError(methodErr?.message);
      return;
    }
    setCardError("");
    setProcessing(true);

    const { paymentIntent, error: confirmErr } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod?.id,
        receipt_email: user?.email,
      });

    if (confirmErr) {
      setCardError(confirmErr?.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      // Payment successful!
      await onSuccess(pkg, paymentIntent?.id); // Call parent function to update DB & coins
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color:
                typeof document !== "undefined" &&
                document.documentElement.classList.contains("dark")
                  ? "#e4e4e7"
                  : "#27272a",
              "::placeholder": { color: "#a1a1aa" },
            },
            invalid: { color: "#ef4444" },
          },
        }}
      />
      {cardError && <p className="text-red-500 text-sm">{cardError}</p>}
      <Button
        type="submit"
        className="w-full bg-gradient"
        disabled={!stripe || !clientSecret || processing}
      >
        {processing ? "Processing..." : `Confirm Payment ($${totalPrice})`}
      </Button>
    </form>
  );
};

export default CheckoutForm;
