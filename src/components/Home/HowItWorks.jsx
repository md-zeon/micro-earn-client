import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CircleCheck,
  ClipboardList,
  Coins,
  UserCheck,
} from "lucide-react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import FadeContent from "@/components/effects/FadeContent";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: <ClipboardList className="size-6" />,
    title: "Post or find a task",
    description:
      "Buyers list simple tasks with clear instructions and coin rewards. Workers browse and pick the work they want.",
    tag: "For everyone",
  },
  {
    icon: <UserCheck className="size-6" />,
    title: "Complete the work",
    description:
      "Workers finish tasks and submit proof. Buyers review submissions and approve the quality with one click.",
    tag: "Verified review",
  },
  {
    icon: <Coins className="size-6" />,
    title: "Get paid instantly",
    description:
      "Approved tasks credit coins to your wallet. Withdraw as real money whenever you hit the payout threshold.",
    tag: "Fast payouts",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="absolute -top-24 left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps to your first payout"
          description="A simple, transparent flow designed so anyone can start earning in minutes — no skills required."
        />

          <div className="relative mt-16">
            {/* Connector line */}
            <div
              ref={lineRef}
              className="absolute top-7 left-0 hidden h-px w-full origin-left bg-gradient-to-r from-emerald-500/20 via-emerald-500/60 to-emerald-500/20 lg:block"
            />

            <FadeContent className="grid gap-6 lg:grid-cols-3">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="group relative flex h-full flex-col rounded-3xl border border-border/70 bg-card/70 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-emerald-500/40">
                    <div className="flex items-center justify-between">
                      <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient text-white shadow-lg shadow-emerald-500/25">
                        {step.icon}
                        <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border-2 border-card bg-background text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          {index + 1}
                        </span>
                      </div>
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        {step.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>

                    {index === steps.length - 1 && (
                      <Link to="/register" className="mt-6 inline-flex">
                        <Button
                          variant="ghost"
                          className="gap-2 rounded-full p-0 text-emerald-600 hover:bg-transparent hover:text-emerald-500 dark:text-emerald-400"
                        >
                          Create your account
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </FadeContent>
          </div>

          <p className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CircleCheck className="size-4 text-emerald-500" />
            20 coins = $1. Withdraw from 200 coins via secure methods.
          </p>
      </div>
    </section>
  );
};

export default HowItWorks;
