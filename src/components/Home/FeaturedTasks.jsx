import { cloneElement } from "react";
import { LuArrowRight, LuCalendar, LuCoins, LuUser } from "react-icons/lu";
import { useNavigate, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import FadeContent from "@/components/effects/FadeContent";
import SpotlightCard from "@/components/effects/SpotlightCard";
import { Skeleton } from "@/components/ui/skeleton";
import SectionHeading from "./SectionHeading";
import useFeaturedTasks from "@/hooks/useFeaturedTasks";

const FeaturedTasks = () => {
  const { tasks, isLoading } = useFeaturedTasks();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute top-1/4 -left-24 size-72 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Popular right now"
            title="Featured tasks"
            description="High-paying, verified tasks available this week. Start earning coins today."
            className="mx-0 text-center sm:text-left"
          />
          <Button
            variant="outline"
            size="lg"
            className="hidden shrink-0 gap-2 rounded-full sm:inline-flex"
            onClick={() => navigate("/all-tasks")}
          >
            View all tasks
            <LuArrowRight className="size-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="mt-4 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-3/4" />
                <div className="mt-6 flex gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="mt-14 text-center text-muted-foreground">
            No featured tasks available right now — check back soon.
          </div>
        ) : (
          <FadeContent className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task, i) => {
              const card = (
                <Link
                  to={`/task-details/${task._id}`}
                  className="group flex h-full flex-col gap-4 overflow-hidden rounded-xl bg-card p-6 text-sm text-card-foreground ring-1 ring-foreground/10 transition-colors duration-300 hover:ring-emerald-500/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">
                      {task.task_title}
                    </h3>
                    <Badge className="shrink-0 rounded-full bg-amber-500/10 font-semibold text-amber-600 dark:text-amber-400">
                      <LuCoins className="mr-1 size-3.5" />
                      {task.payable_amount}
                    </Badge>
                  </div>

                  <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {task.task_detail}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <LuUser className="size-4 text-emerald-500" />
                      {task.required_workers} workers needed
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <LuCalendar className="size-4 text-emerald-500" />
                      {new Date(task.completion_deadline).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/60 pt-4">
                    <span className="text-xs text-muted-foreground">
                      Posted by{" "}
                      <span className="font-semibold text-foreground">
                        {task.buyer_name}
                      </span>
                    </span>
                    <span className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-primary px-2.5 py-1.5 text-[0.8rem] font-medium whitespace-nowrap text-primary-foreground">
                      See details
                      <LuArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              );

              return i === 0 ? (
                <SpotlightCard
                  key={task._id}
                  className="overflow-hidden rounded-xl"
                  spotlightColor="rgba(16, 185, 129, 0.22)"
                >
                  {card}
                </SpotlightCard>
              ) : (
                cloneElement(card, { key: task._id })
              );
            })}
          </FadeContent>
        )}

        <div className="mt-12 text-center sm:hidden">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full"
            onClick={() => navigate("/all-tasks")}
          >
            View all tasks
            <LuArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTasks;
