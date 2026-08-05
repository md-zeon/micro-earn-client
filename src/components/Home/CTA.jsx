import { Link } from "react-router";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import FadeContent from "@/components/effects/FadeContent";
import SpotlightCard from "@/components/effects/SpotlightCard";
import { ArrowRight, Briefcase, Rocket } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <FadeContent>
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.12)"
            className="relative overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-gradient-soft px-8 py-16 text-center text-foreground shadow-xl shadow-emerald-500/10 md:px-16 md:py-20"
          >
            <div className="grid-pattern absolute inset-0 opacity-30" />
            <div className="absolute -top-20 -left-20 size-64 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 size-64 rounded-full bg-teal-400/10 blur-3xl" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-12 hidden rotate-12 text-emerald-500/20 lg:block"
          >
            <Rocket className="size-10" />
          </motion.div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 backdrop-blur-sm dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Join 10,000+ active users
            </span>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
              Ready to turn your spare time into real income?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Whether you want to earn from micro-tasks or get work done
              quickly, MicroEarn makes it simple. Sign up free and start today.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/register">
                <Button
                  size="lg"
                  className="h-13 w-full gap-2 rounded-full bg-gradient px-8 text-base font-semibold shadow-lg shadow-emerald-500/25 transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
                >
                  <Rocket className="size-4" />
                  Start earning as a worker
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 w-full gap-2 rounded-full border-foreground/15 bg-background/40 px-8 text-base backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/5 sm:w-auto"
                >
                  <Briefcase className="size-4" />
                  Post tasks as a buyer
                </Button>
              </Link>
            </div>

            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ArrowRight className="size-4 rotate-90" />
              No fees to join · Cancel anytime · Withdraw from 200 coins
            </p>
          </div>
          </SpotlightCard>
        </FadeContent>
      </div>
    </section>
  );
};

export default CTA;
