import { useState } from "react";
import { Coins, CreditCard, User, PackageCheck } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Form/CheckoutForm";
import useAuth from "../../hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const loadStripeLazy = () =>
  import("@stripe/stripe-js").then(({ loadStripe }) =>
    loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY),
  );

const PurchaseModal = ({ isOpen, onClose, package: pkg, onPurchase }) => {
  const { user } = useAuth();
  const [stripePromise] = useState(() => loadStripeLazy());

  if (!isOpen || !pkg) return null;

  const totalCoins = pkg.coins + (pkg.bonus || 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="size-5 text-primary" aria-hidden="true" />
            Confirm Purchase
          </DialogTitle>
          <DialogDescription>
            Complete the secure payment to add coins to your account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order summary */}
          <div className="rounded-xl bg-muted/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <PackageCheck className="size-4" aria-hidden="true" />
                Package
              </span>
              <p className="font-medium">
                {totalCoins}{" "}
                <span className="inline-flex items-center gap-0.5 text-muted-foreground">
                  coins
                  <Coins className="size-3.5 text-amber-500" aria-hidden="true" />
                </span>
              </p>
            </div>
            {pkg.bonus > 0 && (
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Bonus</span>
                <p className="font-medium text-emerald-600 dark:text-emerald-400">
                  +{pkg.bonus} coins
                </p>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Amount due</span>
              <p className="text-lg font-bold tabular-nums text-primary">
                ${pkg.price}
              </p>
            </div>
          </div>

          {/* Buyer info */}
          <div className="rounded-xl bg-muted/50 p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-medium">
              <User className="size-4 text-muted-foreground" aria-hidden="true" />
              Buyer Information
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Name</span>
              <p className="font-medium">{user?.displayName}</p>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Email</span>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>

          {/* Stripe Checkout Form */}
          <Elements stripe={stripePromise}>
            <CheckoutForm pkg={pkg} onSuccess={onPurchase} />
          </Elements>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;
