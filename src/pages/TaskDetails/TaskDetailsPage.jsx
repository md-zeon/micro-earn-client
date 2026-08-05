import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate, useParams, Link } from "react-router";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Coins,
  ListChecks,
  MessageSquareWarning,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  Zap,
} from "lucide-react";
import Container from "../../components/Container";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import FadeContent from "@/components/effects/FadeContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import RichText from "@/components/shared/RichText";
import { stripHtml } from "@/lib/utils";
import { getDeadlineInfo } from "@/lib/date";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const InfoRow = ({ icon, label, children }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="flex items-center gap-2 text-sm text-muted-foreground">
      {icon}
      {label}
    </span>
    <span className="text-right text-sm font-medium text-foreground">
      {children}
    </span>
  </div>
);

const RelatedTaskCard = ({ task }) => (
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
          <Sparkles className="size-8 text-emerald-500/40" />
        </div>
      )}
      <Badge className="absolute right-3 top-3 rounded-full bg-amber-500/15 font-semibold text-amber-600 backdrop-blur dark:text-amber-400">
        <Coins className="mr-1 size-3.5" />
        {task.payable_amount}
      </Badge>
    </div>
    <div className="flex flex-1 flex-col p-5">
      <h3 className="line-clamp-2 text-base font-semibold tracking-tight">
        {task.task_title}
      </h3>
      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {stripHtml(task.task_detail)}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="size-3.5 text-emerald-500" />
          {task.required_workers} slots left
        </span>
        <span className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-primary px-2.5 py-1.5 text-[0.8rem] font-medium whitespace-nowrap text-primary-foreground">
          Details
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  </Link>
);

const TaskDetailsPage = () => {
  const task = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role, isRoleLoading } = useRole();
  const isWorker = role === "worker";

  const { data: related = [], isLoading: relatedLoading } = useQuery({
    queryKey: ["related-tasks", id],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks?limit=6&exclude=${id}`,
      );
      if (!response.ok) throw new Error("Failed to load related tasks");
      const data = await response.json();
      const list = Array.isArray(data) ? data : data?.data ?? [];
      const base = task?.payable_amount || 0;
      return list
        .sort((a, b) => {
          const aSame = a.buyer_name === task?.buyer_name ? 1 : 0;
          const bSame = b.buyer_name === task?.buyer_name ? 1 : 0;
          if (aSame !== bSame) return bSame - aSame;
          return (
            Math.abs((a.payable_amount || 0) - base) -
            Math.abs((b.payable_amount || 0) - base)
          );
        })
        .slice(0, 3);
    },
    staleTime: 60_000,
  });

  if (!task) {
    return (
      <Container>
        <div className="flex min-h-80 flex-col items-center justify-center px-4 py-24 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10">
            <MessageSquareWarning className="size-8 text-emerald-500" />
          </div>
          <h1 className="mt-5 text-2xl font-bold">Task not found</h1>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            This task may have been removed or the link is incorrect.
          </p>
          <Button
            className="mt-6 rounded-full"
            onClick={() => navigate("/all-tasks")}
          >
            Browse all tasks
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Container>
    );
  }

  const deadline = getDeadlineInfo(task.completion_deadline);
  const totalWorkers = task.total_workers || task.required_workers;
  const filled = Math.max(0, totalWorkers - task.required_workers);
  const filledPct =
    totalWorkers > 0 ? Math.min(100, Math.round((filled / totalWorkers) * 100)) : 0;
  const applyAction = () => {
    if (!user) {
      return {
        label: "Sign in to apply",
        caption: "Create a free account to start earning today.",
        onClick: () => navigate("/login"),
      };
    }
    if (isRoleLoading) return null;
    if (!isWorker) return null;
    return {
      label: "Apply for this task",
      caption: "You'll continue on your dashboard to submit.",
      onClick: () => navigate(`/dashboard/task-details/${task._id}`),
    };
  };

  const apply = applyAction();

  return (
    <Container>
      <div className="relative px-4 py-10 pb-32 md:py-14 lg:pb-14">
        <div className="pointer-events-none absolute -top-16 left-1/2 size-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Breadcrumb"
          className="relative flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="transition-colors hover:text-foreground"
          >
            Home
          </button>
          <ChevronRight className="size-3.5" />
          <button
            type="button"
            onClick={() => navigate("/all-tasks")}
            className="transition-colors hover:text-foreground"
          >
            All tasks
          </button>
          <ChevronRight className="size-3.5" />
          <span className="max-w-56 truncate font-medium text-foreground">
            {task.task_title}
          </span>
        </motion.nav>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent ring-1 ring-foreground/10">
              {task.task_image_url ? (
                <img
                  src={task.task_image_url}
                  alt={task.task_title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Sparkles className="size-16 text-emerald-500/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute right-4 top-4 flex gap-2">
                <Badge className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-semibold text-amber-500 backdrop-blur">
                  <Coins className="mr-1 size-4" />
                  {task.payable_amount}
                  <span className="font-normal opacity-80">coins</span>
                </Badge>
                {!deadline.className.includes("emerald") && (
                  <Badge className="rounded-full bg-rose-500/15 px-3 py-1 text-sm font-semibold text-rose-500 backdrop-blur">
                    <Clock className="mr-1 size-4" />
                    Ending soon
                  </Badge>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
                  {task.task_title}
                </h1>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-bold text-white">
                    {getInitials(task.buyer_name)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <span className="truncate">{task.buyer_name}</span>
                      <BadgeCheck className="size-4 shrink-0 text-emerald-500" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Posted{" "}
                      {new Date(task.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <section className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <ListChecks className="size-5 text-emerald-500" />
                  About this task
                </h2>
                <RichText
                  html={task.task_detail}
                  className="mt-4 text-muted-foreground"
                />
              </section>

              <section className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Zap className="size-5 text-emerald-500" />
                  Submission requirements
                </h2>
                <RichText
                  html={task.submission_info}
                  className="mt-4 text-muted-foreground"
                />
              </section>

              <section className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <ShieldCheck className="size-5 text-emerald-500" />
                  How approval works
                </h2>
                <ul className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    Complete every requirement before submitting.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    Submissions are reviewed within 24–48 hours.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    Payment is released as soon as a submission is approved.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    Rejected submissions are not paid out.
                  </li>
                </ul>
              </section>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="h-fit lg:sticky lg:top-24"
          >
            <Card className="p-0">
              <div className="rounded-t-xl bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white">
                <p className="text-xs font-medium tracking-wide uppercase opacity-80">
                  Pay per worker
                </p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold tracking-tight">
                    {task.payable_amount}
                  </span>
                  <span className="text-lg font-medium opacity-90">
                    Micro Coins
                  </span>
                </div>
                <p className="mt-1 text-sm opacity-90">
                  ≈ Free to join · payout after approval
                </p>
              </div>

              <div className="space-y-5 p-6">
                <div>
                  <InfoRow
                    icon={
                      <Calendar className="size-4 text-emerald-500" />
                    }
                    label="Deadline"
                  >
                    <span className={deadline.className}>
                      {new Date(task.completion_deadline).toLocaleDateString()}
                    </span>
                  </InfoRow>
                  <p className="mt-1 text-right text-xs text-muted-foreground">
                    {deadline.label}
                  </p>
                </div>

                <InfoRow
                  icon={<Users className="size-4 text-emerald-500" />}
                  label="Workers needed"
                >
                  {task.required_workers} slots left
                </InfoRow>

                <InfoRow
                  icon={<User className="size-4 text-emerald-500" />}
                  label="Posted by"
                >
                  <span className="inline-flex items-center gap-1">
                    {task.buyer_name}
                    <BadgeCheck className="size-4 text-emerald-500" />
                  </span>
                </InfoRow>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Slots filled
                    </span>
                    <span className="font-medium text-foreground">
                      {filled} / {totalWorkers}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700"
                      style={{ width: `${filledPct}%` }}
                    />
                  </div>
                </div>

                <div className="border-t border-border/60 pt-5">
                  {apply ? (
                    <>
                      <Button
                        size="lg"
                        className="w-full rounded-full text-base"
                        onClick={apply.onClick}
                      >
                        {apply.label}
                        <ArrowRight className="size-4" />
                      </Button>
                      <p className="mt-3 text-center text-xs text-muted-foreground">
                        {apply.caption}
                      </p>
                    </>
                  ) : user && !isRoleLoading ? (
                    <p className="rounded-xl bg-muted/50 px-4 py-3 text-center text-xs text-muted-foreground">
                      Only worker accounts can apply for this task.
                    </p>
                  ) : null}
                </div>
              </div>
            </Card>

            <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-center text-xs text-muted-foreground">
              <ShieldCheck className="size-4 shrink-0 text-emerald-500" />
              Payments are held securely until your work is approved.
            </div>
          </motion.aside>
        </div>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Keep earning
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                Similar tasks
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hidden rounded-full sm:inline-flex"
              onClick={() => navigate("/all-tasks")}
            >
              View all
              <ArrowRight className="size-3.5" />
            </Button>
          </div>

          <FadeContent className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="overflow-hidden p-0">
                  <Skeleton className="aspect-[16/9] w-full rounded-none" />
                  <div className="p-5">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="mt-3 h-4 w-full" />
                    <Skeleton className="mt-2 h-4 w-2/3" />
                    <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-8 w-24 rounded-full" />
                    </div>
                  </div>
                </Card>
              ))
            ) : related.length > 0 ? (
              related.map((item) => (
                <RelatedTaskCard key={item._id} task={item} />
              ))
            ) : (
              <p className="col-span-full text-center text-sm text-muted-foreground">
                No similar tasks right now — check the full board.
              </p>
            )}
          </FadeContent>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 p-4 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-360 items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
              Pay per worker
            </p>
            <p className="flex items-center gap-1.5 text-xl font-bold">
              <Coins className="size-5 text-amber-500" />
              {task.payable_amount}
            </p>
          </div>
          {apply ? (
            <Button className="rounded-full" onClick={apply.onClick}>
              {user ? "Apply now" : "Sign in to apply"}
              <ArrowRight className="size-4" />
            </Button>
          ) : user && !isRoleLoading ? (
            <p className="text-xs text-muted-foreground">Workers only</p>
          ) : null}
        </div>
      </div>
    </Container>
  );
};

export default TaskDetailsPage;
