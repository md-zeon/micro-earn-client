import useAuth from "../../../hooks/useAuth";
import Logo from "../../../components/Logo";
import AvailableCoins from "../../../components/AvailableCoins";
import ThemeController from "../../../components/ThemeController";
import { LuMenu, LuX } from "react-icons/lu";
import { Link } from "react-router";
import NotificationPopup from "./NotificationPopup";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardNavbar = ({ role, isSidebarOpen, setIsSidebarOpen }) => {
  const { user, loading } = useAuth();
  return (
    <>
      <div className="flex items-center">
        <Button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? (
            <LuX className="w-5 h-5" />
          ) : (
            <LuMenu className="w-5 h-5" />
          )}
        </Button>
        <Logo />
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Available Coins */}
        <span className="hidden md:block">
          {loading ? (
            <Skeleton className="h-6 w-24 rounded" />
          ) : (
            <AvailableCoins />
          )}
        </span>

        <ThemeController />

        {/* User info */}
        {loading ? (
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="hidden sm:flex flex-col gap-1">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </div>
        ) : (
          <div className="flex items-center sm:space-x-2">
            <Link to="/dashboard/profile">
              <Avatar className="sm:w-10 sm:h-10 w-8 h-8">
                <AvatarImage
                  src={
                    user?.photoURL ||
                    "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
                  }
                  alt={user?.displayName}
                />
                <AvatarFallback>
                  {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-semibold">
                {user?.displayName || "User Name"}
              </span>
              <span className="text-xs text-muted-foreground">
                {role
                  ? role.charAt(0).toUpperCase() + role.slice(1)
                  : "No Role"}
              </span>
            </div>
          </div>
        )}

        {/* Notification Icon */}
        {loading ? (
          <Skeleton className="h-8 w-8 rounded-full" />
        ) : (
          <NotificationPopup />
        )}
      </div>
    </>
  );
};

export default DashboardNavbar;
