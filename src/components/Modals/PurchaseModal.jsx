import { LuCoins, LuCreditCard, LuX } from "react-icons/lu";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Form/CheckoutForm";
import useAuth from "../../hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PurchaseModal = ({
  isOpen,
  onClose,
  package: pkg,
  onPurchase,
  stripePromise,
}) => {
  const { user } = useAuth();
  if (!isOpen || !pkg) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LuCreditCard className="w-5 h-5" />
            Confirm Purchase
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-muted rounded-xl p-6">
            <h4 className="font-semibold mb-2">Payment Details</h4>
            <div className="flex justify-between items-center">
              <span>Package:</span>
              <p>
                {pkg.coins}{" "}
                {pkg.bonus && (
                  <span className="text-green-600">+{pkg.bonus}</span>
                )}{" "}
                Micro coins
                <LuCoins className="inline ml-2" />
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Amount:</h4>
              <p className="font-bold text-blue-400 mt-1">${pkg.price}</p>
            </div>
          </div>
          {/* User Info */}
          <div className="bg-muted rounded-xl p-6">
            <h4 className="font-semibold mb-2">Buyer Information</h4>
            <div className="flex justify-between items-center">
              <span>Name:</span>
              <p>{user?.displayName}</p>
            </div>
            <div className="flex justify-between items-center">
              <span>Email:</span>
              <p>{user?.email}</p>
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
