import { useEffect, useState } from "react";
import { motion } from "motion/react";
import GlassCard from "../ui/GlassCard";
import { LuCoins, LuCalendar, LuUser } from "react-icons/lu";
import axios from "axios";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const FeaturedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedTasks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/tasks?limit=6`,
        );
        setTasks(res.data);
      } catch (error) {
        console.error("Failed to fetch featured tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTasks();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            Featured Tasks
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular tasks available right now. Start earning
            coins today!
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card
                  key={i}
                  className="p-6 h-[320px] flex flex-col justify-between"
                >
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex gap-4 mt-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                  </div>
                </Card>
              ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center">
            <p className="mt-4 text-sm opacity-60">
              No featured tasks available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task, i) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="p-6 h-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold line-clamp-1">
                          {task.task_title}
                        </h3>
                        <Badge className="bg-gradient">
                          <LuCoins className="inline mr-1 h-3 w-3" />
                          {task.payable_amount}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {task.task_detail}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <LuUser className="mr-1 h-4 w-4" />
                          {task.required_workers} workers
                        </span>
                        <span className="flex items-center">
                          <LuCalendar className="mr-1 h-4 w-4" />
                          {new Date(
                            task.completion_deadline,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <span className="text-xs text-muted-foreground">
                        Posted by: {task.buyer_name}
                      </span>
                      <Button
                        size="sm"
                        className="bg-gradient"
                        onClick={() => navigate(`/task-details/${task._id}`)}
                      >
                        See More
                      </Button>
                    </div>
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

export default FeaturedTasks;
