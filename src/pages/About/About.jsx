import { motion } from "motion/react";
import { Link } from "react-router";
import {
  LuArrowRight,
  LuBadgeDollarSign,
  LuBriefcase,
  LuCheck,
  LuClock,
  LuCoins,
  LuGlobe,
  LuShieldCheck,
  LuSparkles,
  LuTarget,
  LuUser,
  LuUserCheck,
  LuZap,
} from "react-icons/lu";
import aboutImg from "../../assets/about.svg";
import CountUp from "../../components/shared/CountUp";
import CTA from "../../components/Home/CTA";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const facts = [
  {
    icon: <LuCoins className="size-5" />,
    value: 20,
    suffix: " coins",
    label: "= $1 real money",
    accent: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: <LuUserCheck className="size-5" />,
    value: 2,
    suffix: "",
    label: "roles — worker & buyer",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: <LuClock className="size-5" />,
    value: 24,
    suffix: "–48 hrs",
    label: "max approval time",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: <LuShieldCheck className="size-5" />,
    value: 100,
    suffix: "%",
    label: "Stripe-protected payments",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
];

const beliefs = [
  "Workers should be paid fairly and fast.",
  "Buyers deserve verified, honest help.",
  "Transparency builds trust — always.",
  "Anyone, anywhere, should be able to earn.",
];

const values = [
  {
    icon: <LuBadgeDollarSign className="size-6" />,
    title: "Earn real rewards",
    description:
      "Complete tasks and earn coins. Withdraw your coins as real money — 20 coins = $1.",
  },
  {
    icon: <LuUserCheck className="size-6" />,
    title: "Two clear roles",
    description:
      "Register as a Buyer to post tasks, or as a Worker to complete them and earn.",
  },
  {
    icon: <LuShieldCheck className="size-6" />,
    title: "Secure & transparent",
    description:
      "All transactions are handled securely via Stripe. Role-based dashboards and submission validations ensure fairness.",
  },
  {
    icon: <LuGlobe className="size-6" />,
    title: "Global access",
    description:
      "Work and earn from anywhere — built for a global workforce of freelancers and digital employers.",
  },
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 size-80 rounded-full bg-teal-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                About MicroEarn
              </span>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
                Earning should be simple.{" "}
                <span className="text-gradient">We make it happen.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                MicroEarn is a micro-task platform that connects buyers and
                workers around the globe. Post tasks or earn coins completing
                them — securely, efficiently, and from anywhere.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="h-13 w-full gap-2 rounded-full sm:w-auto"
                  >
                    <LuZap className="size-4" />
                    Start earning as a worker
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 w-full gap-2 rounded-full sm:w-auto"
                  >
                    <LuBriefcase className="size-4" />
                    Post tasks as a buyer
                  </Button>
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <LuCheck className="size-4 text-emerald-500" />
                  No fees to join
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <LuCheck className="size-4 text-emerald-500" />
                  Withdraw from 200 coins
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <LuCheck className="size-4 text-emerald-500" />
                  Stripe protected
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 -rotate-2 rounded-[2rem] bg-gradient opacity-30 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/40 p-6 backdrop-blur md:p-8">
                <img
                  src={aboutImg}
                  alt="About MicroEarn"
                  className="mx-auto w-full max-w-md object-contain"
                />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-2 md:-right-6"
              >
                <Badge className="rounded-full bg-amber-500/15 px-3 py-1.5 text-sm font-semibold text-amber-600 backdrop-blur dark:text-amber-400">
                  <LuCoins className="mr-1.5 size-4" />
                  20 coins = $1
                </Badge>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-4 -left-2 md:-left-6"
              >
                <Badge className="rounded-full bg-emerald-500/15 px-3 py-1.5 text-sm font-semibold text-emerald-600 backdrop-blur dark:text-emerald-400">
                  <LuShieldCheck className="mr-1.5 size-4" />
                  Secure & verified
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="relative py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {facts.map((fact, i) => (
              <motion.div key={fact.label} {...reveal(i * 0.08)}>
                <Card className="flex h-full flex-col items-center justify-center p-6 text-center transition-colors duration-300 hover:border-emerald-500/40">
                  <div
                    className={`flex size-10 items-center justify-center rounded-xl ${fact.accent}`}
                  >
                    {fact.icon}
                  </div>
                  <div className="mt-4 text-3xl font-bold tracking-tight tabular-nums">
                    <CountUp value={fact.value} suffix={fact.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {fact.label}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute top-1/4 -left-24 size-72 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...reveal()}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
                <LuTarget className="size-3.5" />
                Our mission
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl">
                A marketplace built on trust and fairness
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                MicroEarn started with a simple idea: anyone with an internet
                connection should be able to earn real money with the time they
                already have. No gatekeepers, no complicated dashboards — just
                clear tasks, fair pay, and payments you can rely on.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                For every worker earning coins, there's a buyer getting honest,
                verified help. We keep both sides in balance with transparent
                pricing, strict submission reviews, and payments held securely
                until work is approved.
              </p>
              <Link
                to="/all-tasks"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400"
              >
                Explore live tasks
                <LuArrowRight className="size-4" />
              </Link>
            </motion.div>

            <motion.div {...reveal(0.12)}>
              <Card className="relative overflow-hidden bg-gradient p-8 text-white shadow-2xl shadow-emerald-500/30 md:p-10">
                <div className="grid-pattern absolute inset-0 opacity-40" />
                <div className="absolute -top-16 -right-16 size-56 rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <LuSparkles className="size-5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    What we believe
                  </h3>
                </div>

                <ul className="relative mt-6 space-y-4">
                  {beliefs.map((belief) => (
                    <li
                      key={belief}
                      className="flex items-start gap-3 leading-relaxed text-white/85"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                        <LuCheck className="size-3.5" />
                      </span>
                      {belief}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div {...reveal()} className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Two sides, one platform
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Built for workers and buyers alike
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              Whether you're looking to earn in your spare time or get tasks
              done fast, MicroEarn gives both sides the tools to succeed.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <motion.div {...reveal(0.05)}>
              <Card className="group flex h-full flex-col p-8 transition-colors duration-300 hover:border-emerald-500/40 md:p-10">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient text-white shadow-lg shadow-emerald-500/25">
                  <LuUser className="size-6" />
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">
                  For workers
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Turn free time into income with micro-tasks that fit your
                  schedule — no fixed hours, no pressure.
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
                  {[
                    "Browse verified, high-paying tasks",
                    "Earn coins and withdraw as real money",
                    "Get paid within 24–48 hours of approval",
                    "Work from anywhere in the world",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <LuCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/all-tasks" className="mt-8">
                  <Button className="w-full rounded-full">
                    Browse tasks
                    <LuArrowRight className="size-4" />
                  </Button>
                </Link>
              </Card>
            </motion.div>

            <motion.div {...reveal(0.15)}>
              <Card className="group flex h-full flex-col p-8 transition-colors duration-300 hover:border-emerald-500/40 md:p-10">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <LuBriefcase className="size-6" />
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">
                  For buyers
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Delegate the repetitive digital work and get reliable results
                  from a global pool of verified workers.
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
                  {[
                    "Post tasks in minutes with flexible budgets",
                    "Review submissions and approve only good work",
                    "Pay only for approved results, held securely",
                    "Scale help up or down as your needs change",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <LuCheck className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="mt-8">
                  <Button variant="outline" className="w-full rounded-full">
                    Post your first task
                    <LuArrowRight className="size-4" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute -bottom-20 -right-20 size-80 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4">
          <motion.div {...reveal()} className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              What we stand for
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl">
              The values behind every task
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              Four principles guide how we build, review, and pay.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {values.map((value, i) => (
              <motion.div key={value.title} {...reveal(i * 0.08)}>
                <Card className="group h-full p-7 transition-colors duration-300 hover:border-emerald-500/40">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 transition-colors duration-300 group-hover:bg-gradient group-hover:text-white dark:text-emerald-400">
                    {value.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default About;
