import { useEffect, useState } from "react";
import { Link } from "react-router";
import moment from "moment";
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

const NotificationPopup = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    let active = true;
    const fetchNotifications = async () => {
      if (!user?.email) return;
      try {
        const { data } = await axiosSecure.get("/notifications");
        if (active) setNotifications(data);
      } catch (err) {
        console.error("Failed to load notifications:", err);
        if (active) setNotifications([]);
      }
    };
    fetchNotifications();
    return () => {
      active = false;
    };
  }, [user, axiosSecure]);

  const count = notifications?.length ?? 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            aria-label={`Notifications${count > 0 ? `, ${count} unread` : ""}`}
          />
        }
      >
        <Bell className="size-5" />
        {count > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="font-semibold text-foreground">Notifications</span>
          <Badge variant="secondary">{count} new</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications === null ? (
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
              >
                <span className="line-clamp-2 text-foreground">
                  {notification?.message}
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MailOpen className="size-3" />
                  {moment(notification.time).fromNow()}
                </span>
              </Link>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationPopup;
