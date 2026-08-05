import { Link, useLocation } from "react-router";
import {
  BadgeCheck,
  BarChart3,
  Bell,
  CheckCheck,
  CreditCard,
  FileQuestion,
  FileText,
  Globe,
  HandCoins,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Plus,
  Settings2,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useWithdrawRequests from "../../../hooks/useWithdrawRequests";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const navItems = {
  worker: [
    {
      path: "/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
      end: true,
    },
    {
      path: "/dashboard/tasks-list",
      label: "Browse Tasks",
      icon: ListTodo,
    },
    {
      path: "/dashboard/my-submissions",
      label: "My Submissions",
      icon: FileText,
    },
    {
      path: "/dashboard/approved-submissions",
      label: "Approved",
      icon: BadgeCheck,
    },
    {
      path: "/dashboard/withdrawals",
      label: "Withdrawals",
      icon: Wallet,
    },
  ],
  buyer: [
    {
      path: "/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
      end: true,
    },
    {
      path: "/dashboard/add-task",
      label: "Add New Task",
      icon: Plus,
    },
    {
      path: "/dashboard/my-tasks",
      label: "My Tasks",
      icon: ListTodo,
    },
    {
      path: "/dashboard/purchase-coin",
      label: "Purchase Coin",
      icon: CreditCard,
    },
    {
      path: "/dashboard/tasks-to-review",
      label: "Tasks to Review",
      icon: FileQuestion,
    },
    {
      path: "/dashboard/payment-history",
      label: "Payment History",
      icon: BarChart3,
    },
  ],
  admin: [
    {
      path: "/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
      end: true,
    },
    {
      path: "/dashboard/manage-users",
      label: "Manage Users",
      icon: Users,
    },
    {
      path: "/dashboard/manage-tasks",
      label: "Manage Tasks",
      icon: Settings2,
    },
    {
      path: "/dashboard/withdraw-requests",
      label: "Withdraw Requests",
      icon: Wallet,
    },
  ],
};

const generalItems = [
  { path: "/dashboard/profile", label: "My Profile", icon: UserRound },
  { path: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { path: "/", label: "Back to Website", icon: Globe },
];

const groupLabel = {
  worker: "Worker Menu",
  buyer: "Buyer Menu",
  admin: "Admin Menu",
};

const AppSidebar = ({ role }) => {
  const { pathname } = useLocation();
  const { user, loading, logOut } = useAuth();
  const { pendingRequests } = useWithdrawRequests({ enabled: role === "admin" });
  const pendingWithdrawCount = pendingRequests?.length ?? 0;

  const isActive = (path, end) =>
    end ? pathname === path : pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link to="/" />}
              className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
            >
              <span className="bg-gradient flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white">
                <HandCoins className="h-4 w-4" />
              </span>
              <span className="text-lg font-bold text-gradient">
                MicroEarn
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{groupLabel[role]}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu aria-label={groupLabel[role]}>
              {(navItems[role] ?? []).map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    render={<Link to={item.path} />}
                    isActive={isActive(item.path, item.end)}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                  {role === "admin" &&
                    item.path === "/dashboard/withdraw-requests" &&
                    pendingWithdrawCount > 0 && (
                      <SidebarMenuBadge className="bg-amber-500/15 text-amber-600 dark:text-amber-400">
                        {pendingWithdrawCount}
                      </SidebarMenuBadge>
                    )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu aria-label="General links">
              {generalItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    render={<Link to={item.path} />}
                    isActive={isActive(item.path, item.path !== "/")}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        {loading ? (
          <div className="flex items-center gap-2 p-2">
            <Skeleton className="size-8 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                render={<Link to="/dashboard/profile" />}
                className="h-auto py-2"
              >
                <Avatar className="size-8 rounded-md">
                  <AvatarImage
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                  <AvatarFallback className="rounded-md">
                    {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col leading-tight">
                  <span className="font-medium">
                    {user?.displayName || "User Name"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {role
                      ? role.charAt(0).toUpperCase() + role.slice(1)
                      : "Member"}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={logOut}
                tooltip="Logout"
                className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive data-active:bg-destructive/10 data-active:text-destructive"
              >
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
