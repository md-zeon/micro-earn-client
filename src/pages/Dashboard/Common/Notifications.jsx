import { useState } from "react";
import { useNavigate } from "react-router";
import { Bell, CheckCheck, MailOpen } from "lucide-react";
import useNotifications from "@/hooks/useNotifications";
import PageHeader from "@/components/shared/PageHeader";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/lib/date";

const PAGE_SIZE = 10;
const PAGINATION_WINDOW = 1;

const FILTERS = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
];

const Notifications = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const unread = filter === "unread";
  const {
    notifications,
    total,
    unreadCount,
    isPending,
    markRead,
    markAllRead,
  } = useNotifications({ page, limit: PAGE_SIZE, unread });

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = Math.max(1, page - PAGINATION_WINDOW);
  const end = Math.min(pageCount, page + PAGINATION_WINDOW);

  const handleFilter = (value) => {
    setFilter(value);
    setPage(1);
  };

  const handleOpen = (notification) => {
    if (!notification.read) markRead.mutate(notification._id);
    if (notification.actionRoute) navigate(notification.actionRoute);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Updates"
        title="Notifications"
        description="Review your latest activity and updates."
        actions={
          unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
            >
              <CheckCheck className="size-4" aria-hidden="true" />
              Mark all as read
            </Button>
          )
        }
      />

      <div
        className="flex items-center gap-2"
        role="group"
        aria-label="Filter notifications"
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => handleFilter(f.value)}
            aria-pressed={filter === f.value}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground",
            )}
          >
            {f.label}
            {f.value === "unread" && unreadCount > 0 && (
              <span
                aria-live="polite"
                className="flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={<Bell />}
          title={unread ? "No unread notifications" : "You're all caught up"}
          description={
            unread
              ? "Nothing left to read. New notifications will land here."
              : "When something happens on your tasks, you'll see it here."
          }
        />
      ) : (
        <>
          <ul className="overflow-hidden rounded-xl border bg-card">
            {notifications.map((notification) => (
              <li key={notification._id}>
                <button
                  type="button"
                  onClick={() => handleOpen(notification)}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/60",
                    !notification.read && "bg-primary/[0.04]",
                  )}
                >
                  <span
                    className={cn(
                      "mt-1.5 flex size-2 shrink-0 rounded-full",
                      notification.read
                        ? "bg-muted-foreground/30"
                        : "bg-destructive",
                    )}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "line-clamp-2 text-sm leading-relaxed",
                        !notification.read && "font-medium text-foreground",
                      )}
                    >
                      {notification.message}
                    </span>
                    <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MailOpen className="size-3" aria-hidden="true" />
                      {timeAgo(notification.time)}
                      {notification.actionRoute && (
                        <span className="text-emerald-600 dark:text-emerald-400">
                          · View
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {pageCount > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-disabled={page === 1}
                    tabIndex={page === 1 ? -1 : 0}
                    className={cn(
                      page === 1 && "pointer-events-none opacity-50",
                    )}
                  />
                </PaginationItem>
                {start > 1 && (
                  <PaginationItem>
                    <span className="px-1 text-muted-foreground">…</span>
                  </PaginationItem>
                )}
                {Array.from(
                  { length: end - start + 1 },
                  (_, i) => start + i,
                ).map((p) => (
                  <PaginationItem key={p}>
                    <Button
                      variant={p === page ? "outline" : "ghost"}
                      size="icon"
                      onClick={() => setPage(p)}
                      aria-current={p === page ? "page" : undefined}
                      aria-label={`Page ${p}`}
                      className={cn(
                        p === page &&
                          "border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
                      )}
                    >
                      {p}
                    </Button>
                  </PaginationItem>
                ))}
                {end < pageCount && (
                  <PaginationItem>
                    <span className="px-1 text-muted-foreground">…</span>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPage((p) => Math.min(pageCount, p + 1))
                    }
                    aria-disabled={page === pageCount}
                    tabIndex={page === pageCount ? -1 : 0}
                    className={cn(
                      page === pageCount && "pointer-events-none opacity-50",
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default Notifications;
