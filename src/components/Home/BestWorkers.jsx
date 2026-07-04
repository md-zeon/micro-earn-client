import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LuCoins } from "react-icons/lu";
import axios from "axios";
import GlassCard from "../ui/GlassCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const BestWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopWorkers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/top-workers`,
        );
        setWorkers(res.data);
      } catch (error) {
        console.error("Failed to fetch top workers:", error);
      } finally {
        setLoading(false);
      }
    };
    getTopWorkers();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            Top Performing Workers
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Meet our highest-rated workers who consistently deliver top-quality
            results and earn the most coins on the platform.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="p-6 rounded-2xl">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-full skeleton" />
                    <div className="w-32 h-4 rounded-md skeleton" />
                    <div className="w-24 h-4 rounded-md skeleton" />
                  </div>
                </Card>
              ))}
          </div>
        ) : workers.length === 0 ? (
          <div className="text-center">
            <p className="mt-4 text-sm opacity-60">No workers found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {workers.map((worker, i) => (
              <motion.div
                key={worker._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col items-center text-center gap-3">
                    <Avatar className="w-24 h-24 border-4 border-primary">
                      <AvatarImage
                        src={worker.photoURL}
                        alt={worker.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-lg">
                        {worker.name?.charAt(0) || "W"}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{worker.name}</h3>
                    <p className="flex items-center gap-1 text-green-600 font-medium">
                      <LuCoins className="text-xl" />
                      <span className="text-gradient">
                        {worker.microCoins} Coins
                      </span>
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestWorkers;
