import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LuUsers, LuCoins, LuListTodo, LuCheck } from "react-icons/lu";
import GlassCard from "../ui/GlassCard";
import Counter from "../shared/Counter";

const StatsSection = () => {
  const [stats, setStats] = useState({
    totalWorkers: 0,
    totalBuyers: 0,
    totalTasks: 0,
    totalCoins: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/statistics`,
        );
        const data = await response.json();
        setStats({ ...data });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    {
      icon: <LuUsers className="text-3xl text-primary" />,
      label: "Active Workers",
      value: stats.totalWorkers,
      suffix: "+",
    },
    {
      icon: <LuListTodo className="text-3xl text-primary" />,
      label: "Tasks Completed",
      value: stats.totalTasks,
      suffix: "+",
    },
    {
      icon: <LuCoins className="text-3xl text-primary" />,
      label: "Coins Earned",
      value: stats.totalCoins,
      suffix: "+",
    },
    {
      icon: <LuCheck className="text-3xl text-primary" />,
      label: "Satisfied Buyers",
      value: stats.totalBuyers,
      suffix: "+",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            Our Community in Numbers
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who are already earning and getting work
            done on MicroEarn.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 rounded-2xl shadow-lg text-center bg-card">
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-1">
                  {loading ? (
                    <div className="skeleton h-6 w-16 mx-auto rounded" />
                  ) : (
                    <Counter value={item.value} suffix={item.suffix} />
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
