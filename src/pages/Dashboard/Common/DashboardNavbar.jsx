import useAuth from "../../../hooks/useAuth";
import Logo from "../../../components/Logo";
import AvailableCoins from "../../../components/AvailableCoins";
import ThemeController from "../../../components/ThemeController";
import { Link, useNavigate } from "react-router";
import NotificationPopup from "./NotificationPopup";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
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
import { LogOut, UserRound, ExternalLink } from "lucide-react";

const DashboardNavbar = ({ currentTitle }) => {
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <SidebarTrigger />
        <div className="hidden md:flex">
          <Logo />
        </div>
        <div className="hidden lg:flex flex-col leading-tight">
          <span className="text-sm font-semibold text-muted-foreground">
            {currentTitle}
          </span>
        </div>
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
                <Button variant="ghost" size="icon" className="rounded-full" />
              }
            >
              <Avatar className="size-8">
                <AvatarImage src={user?.photoURL} alt={user?.displayName} />
                <AvatarFallback>
                  {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {user?.displayName || "User Name"}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {user?.email}
                  </span>
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
