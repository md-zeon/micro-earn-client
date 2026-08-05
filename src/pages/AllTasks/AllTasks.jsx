import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  LuArrowRight,
  LuCalendar,
  LuCoins,
  LuInbox,
  LuLoader,
  LuSearch,
  LuSlidersHorizontal,
  LuSparkles,
  LuUser,
  LuUsers,
  LuX,
  LuZap,
} from "react-icons/lu";
import Container from "../../components/Container";
import CountUp from "../../components/shared/CountUp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const SORT_OPTIONS = [
  { value: "highest-pay", label: "Highest pay" },
  { value: "lowest-pay", label: "Lowest pay" },
  { value: "deadline-soon", label: "Deadline: soonest" },
  { value: "deadline-far", label: "Deadline: farthest" },
];

const PAGE_SIZE = 9;

const getDeadlineInfo = (deadline) => {
  const due = new Date(deadline);
  const days = Math.ceil((due - new Date()) / 86400000);
  if (days <= 2) {
    return {
      days,
      className: "text-rose-500",
      endingSoon: days >= 0,
    };
  }
  if (days <= 7) {
    return { days, className: "text-amber-500", endingSoon: false };
  }
  return { days, className: "text-muted-foreground", endingSoon: false };
};

const TaskCard = ({ task }) => {
  const deadline = getDeadlineInfo(task.completion_deadline);

  return (
    <Link
      to={`/task-details/${task._id}`}
      className="group flex h-full flex-col gap-4 overflow-hidden rounded-xl bg-card text-sm text-card-foreground ring-1 ring-foreground/10 transition-colors duration-300 hover:ring-emerald-500/40"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent">
        {task.task_image_url ? (
          <img
            src={task.task_image_url}
            alt={task.task_title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <LuSparkles className="size-10 text-emerald-500/40 transition-transform duration-500 group-hover:scale-110" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <Badge className="absolute right-3 top-3 rounded-full bg-amber-500/15 font-semibold text-amber-600 backdrop-blur dark:text-amber-400">
          <LuCoins className="mr-1 size-3.5" />
          {task.payable_amount}
        </Badge>

        {deadline.endingSoon && (
          <Badge className="absolute left-3 top-3 rounded-full bg-rose-500/15 font-semibold text-rose-500 backdrop-blur">
            Ending soon
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold tracking-tight">
          {task.task_title}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {task.task_detail}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <LuUsers className="size-4 text-emerald-500" />
            {task.required_workers} slots left
          </span>
          <span className={deadline.className}>
            <span className="inline-flex items-center gap-1.5">
              <LuCalendar className="size-4" />
              {new Date(task.completion_deadline).toLocaleDateString()}
              {deadline.days >= 0 && (
                <span className="opacity-80">· {deadline.days}d left</span>
              )}
            </span>
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
          <span className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
            <LuUser className="size-3.5 shrink-0 text-emerald-500" />
            <span className="truncate">{task.buyer_name}</span>
          </span>
          <span className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-primary px-2.5 py-1.5 text-[0.8rem] font-medium whitespace-nowrap text-primary-foreground">
            Details
            <LuArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

const TaskCardSkeleton = () => (
  <Card className="flex h-full flex-col overflow-hidden p-0">
    <Skeleton className="aspect-[16/9] w-full rounded-none" />
    <div className="flex flex-1 flex-col p-5">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-2/3" />
      <div className="mt-5 flex gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  </Card>
);

const AllTasks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const sortOption = searchParams.get("sort") ?? "highest-pay";
  const category = searchParams.get("category") ?? "";
  const page = parseInt(searchParams.get("page"), 10) || 1;

  const [queryInput, setQueryInput] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);
  if (prevSearch !== search) {
    setPrevSearch(search);
    setQueryInput(search);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (queryInput.trim() === search) return;
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (queryInput.trim()) next.set("search", queryInput.trim());
          else next.delete("search");
          next.delete("page");
          return next;
        },
        { replace: true },
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [queryInput, search, setSearchParams]);

  const updateParams = (patch) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(patch).forEach(([key, value]) => {
          if (value === null || value === "" || value === undefined)
            next.delete(key);
          else next.set(key, String(value));
        });
        next.delete("page");
        return next;
      },
      { replace: true },
    );
  };

  const goToPage = useCallback(
    (nextPage) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", String(nextPage));
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["all-tasks", { search, sort: sortOption, category, page }],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks`,
        {
          params: {
            search: search || undefined,
            sort: sortOption,
            category: category || undefined,
            page,
            limit: PAGE_SIZE,
          },
        },
      );
      return data;
    },
    staleTime: 60_000,
  });

  const tasks = data?.data ?? [];
  const total = data?.total ?? 0;
  const pageSize = data?.pageSize ?? PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const aggregate = data?.aggregate ?? { totalSlots: 0, maxPay: 0 };

  const { data: categoriesData } = useQuery({
    queryKey: ["task-categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks/task-categories`,
      );
      return Array.isArray(data) ? data : data?.data ?? [];
    },
    staleTime: 5 * 60_000,
  });
  const categories = categoriesData ?? [];

  useEffect(() => {
    if (!isLoading && page > totalPages) goToPage(totalPages);
  }, [totalPages, page, isLoading, goToPage]);

  const searching = search !== "";

  const stats = {
    open: total,
    openSlots: aggregate.totalSlots,
    highestPay: aggregate.maxPay,
  };

  const clearFilters = () => {
    setQueryInput("");
    updateParams({ search: "", category: "" });
  };

  const chipClassName = (active) =>
    `rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
      active
        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        : "border-border/60 text-muted-foreground hover:border-emerald-500/30 hover:text-foreground"
    }`;

  return (
    <Container>
      <div className="relative py-12 md:py-16">
        <div className="pointer-events-none absolute -top-16 left-1/2 size-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Live task board
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance md:text-5xl">
            Explore all tasks
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
            Browse the full marketplace and grab high-paying micro-tasks before
            their slots fill up. Filter, sort, and find work that fits you.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            {
              icon: <LuZap className="size-4 text-emerald-500" />,
              label: "Open tasks",
              value: stats.open,
            },
            {
              icon: <LuUsers className="size-4 text-emerald-500" />,
              label: "Worker slots",
              value: stats.openSlots,
            },
            {
              icon: <LuCoins className="size-4 text-amber-500" />,
              label: "Highest payout",
              value: stats.highestPay,
              suffix: " coins",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 px-4 py-5 text-center backdrop-blur transition-colors hover:border-emerald-500/30"
            >
              <div className="text-3xl font-bold tracking-tight tabular-nums">
                <CountUp value={stat.value} suffix={stat.suffix || ""} />
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                {stat.icon}
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <LuSearch className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Search tasks by title or description…"
              className="h-9 rounded-full pl-9"
              aria-label="Search tasks"
            />
            {searching && (
              <button
                type="button"
                onClick={clearFilters}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <LuX className="size-4" />
              </button>
            )}
          </div>

          <div className="w-full sm:w-64">
            <Select
              value={sortOption}
              onValueChange={(value) => updateParams({ sort: value })}
            >
              <SelectTrigger className="w-full rounded-full">
                <LuSlidersHorizontal className="size-4 text-muted-foreground" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Filter by category">
          <button
            type="button"
            onClick={() => updateParams({ category: "" })}
            className={chipClassName(category === "")}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() =>
                updateParams({ category: category === c ? "" : c })
              }
              className={chipClassName(category === c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Showing{" "}
            <span className="font-semibold text-foreground">
              {isLoading ? "…" : tasks.length}
            </span>{" "}
            of {isLoading ? "…" : total} tasks
          </p>
          {(searching || category) && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="relative mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <TaskCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 px-6 py-20 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-rose-500/10">
                <LuInbox className="size-8 text-rose-500" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">Couldn’t load tasks</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Something went wrong while fetching the task board. Please try
                again.
              </p>
              <Button
                variant="outline"
                className="mt-6 rounded-full"
                onClick={() => refetch()}
              >
                <LuLoader className="size-4" />
                Retry
              </Button>
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 px-6 py-20 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                <LuInbox className="size-8 text-emerald-500" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">No tasks found</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                {searching || category
                  ? "No tasks match your filters. Try a different keyword or clear the filters."
                  : "No tasks are available right now — new tasks are posted regularly. Check back soon."}
              </p>
              {(searching || category) && (
                <Button
                  variant="outline"
                  className="mt-6 rounded-full"
                  onClick={clearFilters}
                >
                  Clear filters
                  <LuX className="size-4" />
                </Button>
              )}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                  <motion.div
                    layout
                    key={task._id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <TaskCard task={task} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {!isLoading && !isError && totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={page <= 1}
              onClick={() => goToPage(page - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page{" "}
              <span className="font-semibold text-foreground">{page}</span> of{" "}
              {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={page >= totalPages}
              onClick={() => goToPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllTasks;
