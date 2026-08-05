import { Link, useNavigate } from "react-router";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  LogOut,
  UserRound,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import AvailableCoins from "../../../components/AvailableCoins";
import ThemeController from "../../../components/ThemeController";
import NotificationPopup from "./NotificationPopup";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardNavbar = ({ currentTitle }) => {
  const { user, loading, logOut } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <>
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <SidebarTrigger />

        <span className="min-w-0 truncate text-sm font-semibold lg:hidden">
          {currentTitle}
        </span>

        <nav
          aria-label="Breadcrumb"
          className="hidden min-w-0 items-center gap-1.5 text-sm lg:flex"
        >
          <Link
            to="/dashboard"
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <ChevronRight
            className="size-4 shrink-0 text-muted-foreground/50"
            aria-hidden="true"
          />
          <span className="truncate font-semibold text-foreground">
            {currentTitle}
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="hidden md:block">
          {loading ? (
            <Skeleton className="h-6 w-24 rounded" />
          ) : (
            <AvailableCoins />
          )}
        </span>

        <ThemeController />

        {loading ? (
          <Skeleton className="h-8 w-8 rounded-full" />
        ) : (
          <NotificationPopup />
        )}

        {loading ? (
          <Skeleton className="h-8 w-8 rounded-full" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="h-10 gap-2 rounded-full px-1.5 pr-2 hover:bg-muted"
                >
                  <Avatar className="size-8">
                    <AvatarImage
                      src={user?.photoURL}
                      alt={user?.displayName}
                    />
                    <AvatarFallback>
                      {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-32 truncate text-sm font-medium md:block">
                    {user?.displayName || "User"}
                  </span>
                  <ChevronDown
                    className="hidden size-3.5 text-muted-foreground md:block"
                    aria-hidden="true"
                  />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-1">
                  <span className="truncate font-medium text-foreground">
                    {user?.displayName || "User Name"}
                  </span>
                  <span className="truncate text-xs font-normal text-muted-foreground">
                    {user?.email}
                  </span>
                  {role && (
                    <Badge
                      variant="secondary"
                      className="mt-0.5 w-fit capitalize text-emerald-700 dark:text-emerald-400"
                    >
                      {role}
                    </Badge>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                render={<Link to="/dashboard/profile" />}
                className="cursor-pointer"
              >
                <UserRound />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                render={<Link to="/" />}
                className="cursor-pointer"
              >
                <ExternalLink />
                View Website
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  );
};

export default DashboardNavbar;
