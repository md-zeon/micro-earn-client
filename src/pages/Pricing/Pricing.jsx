import { useNavigate } from "react-router";
import {
  ArrowRight,
  Check,
  Coins,
  CreditCard,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Container from "../../components/Container";
import SectionHeading from "../../components/Home/SectionHeading";
import FadeContent from "@/components/effects/FadeContent";
import SpotlightCard from "@/components/effects/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useAuth from "../../hooks/useAuth";

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    price: 10,
    coins: 100,
    bonus: 0,
    tagline: "Perfect for trying out your first task.",
    features: [
      "100 coins to post tasks",
      "No bonus coins",
      "1 active task at a time",
      "Email support",
    ],
    popular: false,
  },
  {
    id: "popular",
    name: "Pro",
    price: 25,
    coins: 300,
    bonus: 50,
    tagline: "For buyers running several tasks each month.",
    features: [
      "350 coins (300 + 50 bonus)",
      "Up to 5 active tasks",
      "Priority email support",
      "Larger packages save more",
    ],
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    price: 80,
    coins: 1200,
    bonus: 300,
    tagline: "For teams that post tasks at scale.",
    features: [
      "1500 coins (1200 + 300 bonus)",
      "Unlimited active tasks",
      "Dedicated support",
      "Best value per dollar",
    ],
    popular: false,
  },
];

const FAQS = [
  {
    question: "How do coins work?",
    answer:
      "Coins are MicroEarn's built-in currency. You use them to post tasks — each task costs the reward you set per worker multiplied by the number of workers required. Buy a package, and the coins land in your balance instantly.",
  },
  {
    question: "What happens after I pay?",
    answer:
      "Your coins are added to your account immediately after a successful Stripe payment. You can see your balance in the dashboard and start posting tasks right away.",
  },
  {
    question: "Can I get a refund for unused coins?",
    answer:
      "Coins that have already been spent on tasks cannot be refunded. If you have unused coins and believe you're eligible for a refund, contact our support team and we'll review your case.",
  },
  {
    question: "Do I need an account to buy coins?",
    answer:
      "Yes. You'll need to sign in with your MicroEarn account so the coins can be credited to your balance. New here? Registration takes under a minute.",
  },
  {
    question: "How do I pay workers?",
    answer:
      "You never transfer coins directly. When a worker's submission is approved, the platform pays them from the coins you committed when posting the task — no extra work on your side.",
  },
];

const TRUST_FEATURES = [
  {
    icon: Lock,
    title: "Secure Payment",
    desc: "SSL-encrypted checkout powered by Stripe",
  },
  {
    icon: CreditCard,
    title: "Cards Accepted",
    desc: "All major credit & debit cards",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    desc: "Coins added to your balance immediately",
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard/purchase-coin");
      return;
    }
    navigate("/login", {
      state: { from: { pathname: "/dashboard/purchase-coin" } },
    });
  };

  return (
    <Container className="py-16 md:py-24">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        description="Buy coin packages to post tasks and pay workers. The bigger the package, the more you save."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TIERS.map((tier) => {
          const totalCoins = tier.coins + tier.bonus;
          const valuePerDollar = (totalCoins / tier.price).toFixed(1);

          const card = (
            <Card className="relative flex h-full flex-col overflow-visible p-7">
              {tier.popular && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 gap-1 bg-gradient text-white shadow-md">
                  <Sparkles className="size-3 fill-current" aria-hidden="true" />
                  Most Popular
                </Badge>
              )}

              <div className="flex size-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                <Coins className="size-6" aria-hidden="true" />
              </div>

              <h3 className="mt-4 text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{tier.tagline}</p>

              <div className="mt-5">
                <span className="text-4xl font-bold tabular-nums tracking-tight">
                  ${tier.price}
                </span>
                <span className="ml-1 text-sm font-medium text-muted-foreground">
                  one-time
                </span>
              </div>

              <p className="mt-3 text-sm font-semibold tabular-nums">
                {totalCoins} coins
              </p>
              <p className="text-xs text-muted-foreground">
                {tier.bonus ? (
                  <>
                    {tier.coins} +{" "}
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      {tier.bonus} bonus
                    </span>
                  </>
                ) : (
                  "No bonus included"
                )}
              </p>

              <Badge
                variant="secondary"
                className="mt-3 w-fit gap-1 tabular-nums"
              >
                <Check className="size-3 text-emerald-500" aria-hidden="true" />
                {valuePerDollar} coins / $
              </Badge>

              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                      <Check className="size-3 text-emerald-500" aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="mt-7 w-full bg-gradient shadow-lg shadow-emerald-500/20"
                onClick={handleGetStarted}
                aria-label={`Buy ${totalCoins} coins for $${tier.price}`}
              >
                Get started
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </Card>
          );

          return (
            <FadeContent key={tier.id}>
              {tier.popular ? (
                <SpotlightCard className="h-full rounded-xl" spotlightClassName="rounded-xl">
                  {card}
                </SpotlightCard>
              ) : (
                card
              )}
            </FadeContent>
          );
        })}
      </div>

      <FadeContent className="mt-8">
        <p className="text-center text-sm text-muted-foreground">
          Need a custom package?{" "}
          <a
            href="/contact"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Contact us
          </a>{" "}
          for a tailored plan.
        </p>
      </FadeContent>

      <FadeContent className="mt-14">
        <div className="grid grid-cols-1 gap-6 rounded-2xl border bg-muted/30 p-6 sm:grid-cols-3 sm:p-8">
          {TRUST_FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeContent>

      <FadeContent className="mt-14">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Frequently asked questions
          </h2>
          <Accordion className="mt-8">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </FadeContent>

      <FadeContent className="mt-16 text-center">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <ShieldCheck className="size-4 text-emerald-500" aria-hidden="true" />
            Payments are securely processed by Stripe.
          </div>
          <Button size="lg" className="bg-gradient shadow-lg shadow-emerald-500/20" onClick={handleGetStarted}>
            Ready to hire workers?
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </FadeContent>
    </Container>
  );
};

export default Pricing;
