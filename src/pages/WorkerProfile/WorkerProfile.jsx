import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CircleDollarSign,
  ClipboardCheck,
  Clock,
  Coins,
  Mail,
  Sparkles,
} from "lucide-react";
import Container from "../../components/Container";
import FadeContent from "@/components/effects/FadeContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import StatsCard from "@/components/shared/StatsCard";
import { formatDate } from "@/lib/date";

const getInitials = (name) =>
  (name || "W")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span
      aria-hidden="true"
      className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground [&>svg]:size-4"
    >
      <Icon />
    </span>
    <div className="min-w-0">
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 truncate font-medium">{value}</dd>
    </div>
  </div>
);

const WorkerProfile = () => {
  const { id } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["public-worker", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/${id}/public`,
      );
      return data;
    },
    enabled: Boolean(id),
  });

  const worker = data?.user;
  const stats = data?.stats ?? {};
  const initials = getInitials(worker?.name);

  if (isPending) {
    return (
      <Container className="py-16 md:py-20">
        <Skeleton className="h-5 w-40" />
        <Card className="mt-6 p-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <Skeleton className="size-24 rounded-full" />
            <div className="space-y-3 text-center sm:text-left">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </Card>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </Container>
    );
  }

  if (isError || !worker) {
    return (
      <Container className="py-16 text-center md:py-24">
        <BadgeCheck className="mx-auto size-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          Worker not found
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          This profile may have been removed or the link is incorrect.
        </p>
        <Button
          className="mt-6"
          render={<Link to="/all-tasks" />}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Browse tasks
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-16 md:py-20">
      <Link
        to="/all-tasks"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to all tasks
      </Link>

      <FadeContent className="mt-6">
        <Card className="overflow-hidden py-0">
          <div
            aria-hidden="true"
            className="h-28 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 sm:h-32 dark:from-emerald-600 dark:via-teal-600 dark:to-sky-600"
          />
          <div className="px-5 pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <Avatar className="-mt-10 size-20 ring-4 ring-background sm:-mt-12 sm:size-24">
                  <AvatarImage src={worker.photoURL} alt={worker.name} />
                  <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 pt-1 sm:pb-1">
                  <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {worker.name}
                  </h1>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <Badge
                      variant="outline"
                      className="gap-1 border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    >
                      <BadgeCheck className="size-3" aria-hidden="true" />
                      Top Worker
                    </Badge>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Mail className="size-3.5" aria-hidden="true" />
                      {worker.email}
                    </span>
                  </div>
                </div>
              </div>
              <Badge className="gap-1.5 rounded-full border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-amber-600 dark:text-amber-400">
                <Coins className="size-3.5" aria-hidden="true" />
                {worker.microCoins?.toLocaleString() || 0} coins earned
              </Badge>
            </div>
          </div>
        </Card>
      </FadeContent>

      <FadeContent className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard
          label="Tasks Completed"
          value={stats.completedTasks ?? 0}
          Icon={ClipboardCheck}
          tone="sky"
          subtitle="Approved submissions"
        />
        <StatsCard
          label="Total Earned"
          value={stats.totalEarned ?? 0}
          suffix="coins"
          Icon={CircleDollarSign}
          tone="violet"
          subtitle="Across all approved tasks"
        />
        <StatsCard
          label="Pending Review"
          value={stats.pendingSubmissions ?? 0}
          Icon={Clock}
          tone="amber"
          subtitle="Awaiting buyer approval"
        />
      </FadeContent>

      <FadeContent className="mt-6">
        <Card>
          <CardContent className="grid grid-cols-1 gap-x-6 gap-y-5 px-5 py-6 sm:grid-cols-2">
            <InfoItem
              icon={CalendarDays}
              label="Member Since"
              value={formatDate(worker.createdAt)}
            />
            <InfoItem
              icon={Sparkles}
              label="Role"
              value="Worker"
            />
          </CardContent>
        </Card>
      </FadeContent>
    </Container>
  );
};

export default WorkerProfile;
