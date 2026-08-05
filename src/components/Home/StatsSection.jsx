import { motion } from "motion/react";
import { LuCircleCheck, LuListTodo, LuUsers, LuWallet } from "react-icons/lu";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CountUp from "../shared/CountUp";
import SectionHeading from "./SectionHeading";
import usePlatformStats from "@/hooks/usePlatformStats";

const StatsSection = () => {
  const { stats, isLoading } = usePlatformStats();
  const safeStats = stats ?? {
    totalWorkers: 0,
    totalBuyers: 0,
    totalTasks: 0,
    totalCoins: 0,
  };

  const statItems = [
    {
      icon: <LuUsers className="size-6" />,
      label: "Active workers",
      value: safeStats.totalWorkers,
      suffix: "+",
    },
    {
      icon: <LuListTodo className="size-6" />,
      label: "Tasks completed",
      value: safeStats.totalTasks,
      suffix: "+",
    },
    {
      icon: <LuWallet className="size-6" />,
      label: "Coins earned",
      value: safeStats.totalCoins,
      suffix: "+",
    },
    {
      icon: <LuCircleCheck className="size-6" />,
      label: "Satisfied buyers",
      value: safeStats.totalBuyers,
      suffix: "+",
    },
  ];

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Platform statistics"
          title="Our community in numbers"
          description="Join thousands of people already earning and getting work done on MicroEarn."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
            >
              <Card className="group relative overflow-hidden p-6 transition-colors duration-300 hover:border-emerald-500/40">
                <div className="absolute -top-10 -right-10 size-28 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/20" />
                <div className="relative">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {item.icon}
                  </div>
                  <div className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
                    {isLoading ? (
                      <Skeleton className="h-9 w-20" />
                    ) : (
                      <span className="text-gradient">
                        <CountUp value={item.value} suffix={item.suffix} />
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
