import { motion } from "motion/react";
import {
  LuBadgeCheck,
  LuClock3,
  LuHeartHandshake,
  LuWallet,
  LuZap,
} from "react-icons/lu";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import SectionHeading from "./SectionHeading";

const reasons = [
  {
    icon: <LuClock3 className="size-5" />,
    title: "Work on your schedule",
    description:
      "No fixed hours, no deadlines pressure. Complete tasks whenever it suits you.",
  },
  {
    icon: <LuBadgeCheck className="size-5" />,
    title: "Trusted & secure",
    description:
      "Every buyer and task is verified. Payments are protected end to end.",
  },
  {
    icon: <LuHeartHandshake className="size-5" />,
    title: "Community driven",
    description:
      "Join a thriving network of earners who share tips and grow together.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute top-20 -right-20 size-80 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-teal-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Why MicroEarn"
          title="Built for people who value their time"
          description="We combine the trust of a marketplace with the speed of modern fintech — so you can earn and hire with total confidence."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Featured card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <Card className="relative flex h-full flex-col overflow-hidden bg-gradient p-8 text-white shadow-2xl shadow-emerald-500/30 md:p-10">
              <div className="grid-pattern absolute inset-0 opacity-40" />
              <div className="absolute -top-16 -right-16 size-56 rounded-full bg-white/10 blur-3xl" />

              <div className="relative flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                  <LuZap className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    Fast, transparent payouts
                  </h3>
                  <p className="text-sm text-white/70">
                    Your earnings, on your terms
                  </p>
                </div>
              </div>

              <p className="relative mt-6 max-w-md leading-relaxed text-white/85">
                Once a task is approved, coins land in your wallet instantly.
                Request a withdrawal any time and get paid quickly — with zero
                hidden fees.
              </p>

              {/* Mock payout card */}
              <div className="relative mt-8 rounded-2xl bg-white/10 p-5 backdrop-blur-md ring-1 ring-white/15">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">This week's earnings</span>
                  <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium">
                    Live
                  </span>
                </div>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-3xl font-bold tracking-tight">$128.40</span>
                  <span className="mb-1 flex items-center gap-1 text-xs font-medium text-emerald-300">
                    <LuZap className="size-3" /> +24%
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-white/70">
                    <span>Withdrawal progress</span>
                    <span>64%</span>
                  </div>
                  <Progress
                    value={64}
                    className="bg-white/15 [&_[data-slot=progress-indicator]]:bg-white"
                  />
                </div>
              </div>

              <p className="relative mt-6 text-xs text-white/60">
                200 coin minimum · Stripe & bank transfer supported
              </p>
            </Card>
          </motion.div>

          {/* Small cards */}
          {reasons.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
            >
              <Card className="group h-full p-7 transition-colors duration-300 hover:border-emerald-500/40">
                <div className="flex size-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 transition-colors duration-300 group-hover:bg-gradient group-hover:text-white dark:text-emerald-400">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}

          {/* Coins card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: 0.36,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6 }}
          >
            <Card className="group flex h-full flex-col items-center justify-center gap-3 border-dashed p-7 text-center transition-colors duration-300 hover:border-emerald-500/40">
              <div className="flex size-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <LuWallet className="size-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Simple coin system
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                20 coins = $1. Transparent value, no surprise deductions.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
