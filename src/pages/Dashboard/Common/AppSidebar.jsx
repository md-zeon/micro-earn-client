import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  BadgeCheck,
  BarChart3,
  Bell,
  CreditCard,
  FileQuestion,
  FileText,
  Globe,
  HandCoins,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Plus,
  Search,
  Settings2,
  UserRound,
  Users,
  Wallet,
  X,
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
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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
  worker: "Worker",
  buyer: "Buyer",
  admin: "Admin",
};

const AppSidebar = ({ role }) => {
  const { pathname } = useLocation();
  const { user, loading, logOut } = useAuth();
  const { pendingRequests } = useWithdrawRequests({ enabled: role === "admin" });
  const pendingWithdrawCount = pendingRequests?.length ?? 0;
  const [query, setQuery] = useState("");

  const isActive = (path, end) =>
    end ? pathname === path : pathname.startsWith(path);

  const q = query.trim().toLowerCase();
  const matches = (label) => !q || label.toLowerCase().includes(q);

  const roleItems = (navItems[role] ?? []).filter((item) =>
    matches(item.label),
  );
  const filteredGeneral = generalItems.filter((item) => matches(item.label));
  const hasQuery = q.length > 0;
  const noResults =
    hasQuery && roleItems.length === 0 && filteredGeneral.length === 0;

  const menuButtonClass = (active) =>
    cn(
      "rounded-lg px-2.5",
      active
        ? "relative bg-emerald-500/10 text-emerald-700 shadow-sm hover:bg-emerald-500/15 dark:text-emerald-400 before:absolute before:left-0 before:top-1/2 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-gradient group-data-[collapsible=icon]:before:hidden [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400"
        : "text-sidebar-foreground/80",
    );

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
              <span className="bg-gradient flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white shadow-sm shadow-emerald-500/25">
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
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <SidebarInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu…"
              aria-label="Search navigation menu"
              className="h-9 rounded-lg pl-9 pr-8"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </SidebarGroup>

        {roleItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-2.5 text-[11px] font-semibold tracking-wider uppercase text-sidebar-foreground/50">
              {groupLabel[role]}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu aria-label={groupLabel[role]} className="gap-1">
                {roleItems.map((item) => {
                  const active = isActive(item.path, item.end);
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        render={<Link to={item.path} />}
                        isActive={active}
                        tooltip={item.label}
                        className={menuButtonClass(active)}
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
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {filteredGeneral.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-2.5 text-[11px] font-semibold tracking-wider uppercase text-sidebar-foreground/50">
              General
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu aria-label="General links" className="gap-1">
                {filteredGeneral.map((item) => {
                  const active = isActive(item.path, true);
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        render={<Link to={item.path} />}
                        isActive={active}
                        tooltip={item.label}
                        className={menuButtonClass(active)}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {noResults && (
          <p className="px-4 py-3 text-sm text-muted-foreground">
            No matching menu items.
          </p>
        )}
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
          <SidebarMenu className="gap-1">
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                render={<Link to="/dashboard/profile" />}
                tooltip="My Profile"
                className="h-auto rounded-lg py-2"
              >
                <Avatar className="size-8 rounded-full">
                  <AvatarImage
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                  <AvatarFallback className="rounded-full">
                    {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col gap-0.5 leading-tight">
                  <span className="truncate font-medium">
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
                className="rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive data-active:bg-destructive/10 data-active:text-destructive"
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
