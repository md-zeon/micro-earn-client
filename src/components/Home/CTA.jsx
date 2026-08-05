import { Link } from "react-router";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import FadeContent from "@/components/effects/FadeContent";
import SpotlightCard from "@/components/effects/SpotlightCard";
import { LuArrowRight, LuBriefcase, LuRocket } from "react-icons/lu";

const CTA = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <FadeContent>
          <SpotlightCard
            spotlightColor="rgba(255, 255, 255, 0.22)"
            className="relative overflow-hidden rounded-[2rem] bg-gradient px-8 py-16 text-center text-white shadow-2xl shadow-emerald-500/30 md:px-16 md:py-20"
          >
            <div className="grid-pattern absolute inset-0 opacity-40" />
            <div className="absolute -top-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 size-64 rounded-full bg-teal-300/20 blur-3xl" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-12 hidden rotate-12 text-white/20 lg:block"
          >
            <LuRocket className="size-10" />
          </motion.div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-white" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Join 10,000+ active users
            </span>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
              Ready to turn your spare time into real income?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
              Whether you want to earn from micro-tasks or get work done
              quickly, MicroEarn makes it simple. Sign up free and start today.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/register">
                <Button
                  size="lg"
                  className="h-13 w-full gap-2 rounded-full bg-white px-8 text-base font-semibold text-emerald-700 shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/90 sm:w-auto"
                >
                  <LuRocket className="size-4" />
                  Start earning as a worker
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 w-full gap-2 rounded-full border-white/40 bg-white/5 px-8 text-base text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:text-white sm:w-auto"
                >
                  <LuBriefcase className="size-4" />
                  Post tasks as a buyer
                </Button>
              </Link>
            </div>

            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-white/90">
              <LuArrowRight className="size-4 rotate-90" />
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
