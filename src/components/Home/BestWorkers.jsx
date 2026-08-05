import { Coins, Medal, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import FadeContent from "@/components/effects/FadeContent";
import { Skeleton } from "@/components/ui/skeleton";
import SectionHeading from "./SectionHeading";
import useBestWorkers from "@/hooks/useBestWorkers";

const BestWorkers = () => {
  const { workers, isLoading } = useBestWorkers();

  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 md:py-28">
      <div className="absolute -bottom-20 -right-20 size-80 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Top performers"
          title="Meet our highest earners"
          description="Real people, real results. These workers consistently deliver top quality and earn the most on the platform."
        />

        {isLoading ? (
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
          <FadeContent className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workers.map((worker, i) => (
              <Card
                key={worker._id}
                className="group relative flex h-full flex-col items-center overflow-hidden p-7 text-center transition-colors duration-300 hover:border-emerald-500/40"
              >
                {i === 0 && (
                    <Badge className="absolute top-4 right-4 gap-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Medal className="size-3" />
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
                        <Star className="size-3.5 fill-white" />
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
                    <Coins className="size-3.5" />
                    {worker.microCoins?.toLocaleString() || 0} coins earned
                  </Badge>
                </Card>
            ))}
          </FadeContent>
        )}
      </div>
    </section>
  );
};

export default BestWorkers;
