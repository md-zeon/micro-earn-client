import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LuCoins, LuMedal, LuStar } from "react-icons/lu";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SectionHeading from "./SectionHeading";

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
    <section className="relative overflow-hidden bg-muted/30 py-20 md:py-28">
      <div className="absolute -bottom-20 -right-20 size-80 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Top performers"
          title="Meet our highest earners"
          description="Real people, real results. These workers consistently deliver top quality and earn the most on the platform."
        />

        {loading ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="size-20 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-6 w-28 rounded-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : workers.length === 0 ? (
          <div className="mt-14 text-center text-muted-foreground">
            No top workers yet — be the first!
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workers.map((worker, i) => (
              <motion.div
                key={worker._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: (i % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
              >
                <Card className="group relative flex h-full flex-col items-center overflow-hidden p-7 text-center transition-colors duration-300 hover:border-emerald-500/40">
                  {i === 0 && (
                    <Badge className="absolute top-4 right-4 gap-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <LuMedal className="size-3" />
                      #1
                    </Badge>
                  )}

                  <div className="relative mt-2">
                    <Avatar className="size-20 border-2 border-emerald-500/30">
                      <AvatarImage
                        src={worker.photoURL}
                        alt={worker.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-emerald-500/10 text-lg text-emerald-600 dark:text-emerald-400">
                        {worker.name?.charAt(0) || "W"}
                      </AvatarFallback>
                    </Avatar>
                    {i < 3 && (
                      <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-amber-400 text-white shadow-md">
                        <LuStar className="size-3.5 fill-white" />
                      </div>
                    )}
                  </div>

                  <h3 className="mt-4 text-lg font-semibold tracking-tight">
                    {worker.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {worker.email?.split("@")[0] || "Worker"}
                  </p>

                  <Badge className="mt-4 gap-1.5 rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <LuCoins className="size-3.5" />
                    {worker.microCoins?.toLocaleString() || 0} coins earned
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestWorkers;
