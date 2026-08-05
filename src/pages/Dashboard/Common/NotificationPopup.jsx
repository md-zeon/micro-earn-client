import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, CheckCheck, MailOpen } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const relativeTimeFormatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
});

const timeAgo = (date) => {
  const diff = new Date(date).getTime() - Date.now();
  const abs = Math.abs(diff);
  if (abs < 60_000) return relativeTimeFormatter.format(0, "minute");
  if (abs < 3_600_000)
    return relativeTimeFormatter.format(Math.round(diff / 60_000), "minute");
  if (abs < 86_400_000)
    return relativeTimeFormatter.format(Math.round(diff / 3_600_000), "hour");
  if (abs < 2_592_000_000)
    return relativeTimeFormatter.format(Math.round(diff / 86_400_000), "day");
  if (abs < 31_536_000_000)
    return relativeTimeFormatter.format(Math.round(diff / 2_592_000_000), "month");
  return relativeTimeFormatter.format(Math.round(diff / 31_536_000_000), "year");
};

const NotificationPopup = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/notifications");
      return data;
    },
    enabled: Boolean(user?.email),
    refetchInterval: 30_000,
  });

  const notifications = data?.data ?? null;
  const unreadCount = data?.unreadCount ?? 0;

  const markRead = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/notifications/${id}/read`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const markAllRead = useMutation({
    mutationFn: () => axiosSecure.patch("/notifications/read-all"),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
          />
        }
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span
            aria-live="polite"
            className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="font-semibold text-foreground">Notifications</span>
          <Badge variant="secondary">{unreadCount} new</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isPending ? (
          <div className="space-y-2 p-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <CheckCheck className="size-8 text-muted-foreground" />
            <p className="text-sm font-medium">You're all caught up</p>
            <p className="text-xs text-muted-foreground">
              New notifications will appear here.
            </p>
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <Link
                key={notification._id}
                to={notification.actionRoute || "/dashboard"}
                className="block px-2 py-2.5 text-sm transition-colors hover:bg-muted"
                onClick={() => {
                  if (!notification.read) markRead.mutate(notification._id);
                }}
              >
                <span className="line-clamp-2 text-foreground">
                  {notification?.message}
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MailOpen className="size-3" />
                  {timeAgo(notification.time)}
                </span>
              </Link>
            ))}
          </div>
        )}
        {unreadCount > 0 && notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <Button
              variant="ghost"
              size="sm"
              className="w-full rounded-none"
              onClick={() => markAllRead.mutate()}
            >
              Mark all as read
            </Button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationPopup;
