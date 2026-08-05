import { ShieldCheck, CreditCard, Zap, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "SSL encrypted transactions",
    color: "text-emerald-600 bg-emerald-500/10",
  },
  {
    icon: CreditCard,
    title: "Card Accepted",
    desc: "All major credit & debit cards",
    color: "text-blue-600 bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    desc: "Coins added immediately",
    color: "text-amber-600 bg-amber-500/10",
  },
];

const STEPS = [
  "Select a coin package that suits your needs",
  "Complete the secure payment process",
  "Coins are instantly added to your account",
  "Start creating tasks and paying workers",
];

const PaymentInformation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Payment Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="flex items-start gap-3">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-full ${color}`}
              >
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <p className="mb-2 text-sm font-semibold">How it works:</p>
          <ol className="space-y-1.5">
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="size-3 text-primary" aria-hidden="true" />
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentInformation;
