import { Outlet, useLocation, useNavigation } from "react-router";
import useRole from "../hooks/useRole";
import AppSidebar from "../pages/Dashboard/Common/AppSidebar";
import DashboardFooter from "../pages/Dashboard/Common/DashboardFooter";
import DashboardNavbar from "../pages/Dashboard/Common/DashboardNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import PageTitle from "../components/PageTitle";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";
import DashboardLayoutSkeleton from "../components/ui/DashboardLayoutSkeleton";
import ScrollToTopButton from "../components/effects/ScrollToTopButton";

const pageTitles = {
  "/dashboard": "Overview",
  "/dashboard/tasks-list": "Browse Tasks",
  "/dashboard/my-submissions": "My Submissions",
  "/dashboard/approved-submissions": "Approved Submissions",
  "/dashboard/withdrawals": "Withdrawals",
  "/dashboard/notifications": "Notifications",
  "/dashboard/profile": "My Profile",
  "/dashboard/add-task": "Add New Task",
  "/dashboard/my-tasks": "My Tasks",
  "/dashboard/purchase-coin": "Purchase Coin",
  "/dashboard/tasks-to-review": "Tasks to Review",
  "/dashboard/payment-history": "Payment History",
  "/dashboard/manage-users": "Manage Users",
  "/dashboard/manage-tasks": "Manage Tasks",
  "/dashboard/withdraw-requests": "Withdraw Requests",
};

const DashboardLayout = () => {
  const { state } = useNavigation();
  const { role, isRoleLoading } = useRole();
  const { pathname } = useLocation();

  const currentTitle =
    Object.entries(pageTitles).find(([path]) =>
      path === "/dashboard" ? pathname === path : pathname.startsWith(path),
    )?.[1] ?? "Dashboard";

  if (isRoleLoading) {
    return <DashboardLayoutSkeleton />;
  }

  return (
    <SidebarProvider>
      <PageTitle
        title={currentTitle}
        description="User dashboard on MicroEarn platform."
      />
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <AppSidebar role={role} />

      <div className="flex min-h-svh w-full flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-3 sm:px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <DashboardNavbar currentTitle={currentTitle} />
        </header>

        <main
          id="main-content"
          className="flex-1 bg-background"
        >
          <div className="mx-auto w-full max-w-360 p-4 sm:p-6 lg:p-8">
            {state === "loading" ? (
              <DashboardSkeleton statsCount={4} showTable={true} />
            ) : (
              <Outlet />
            )}
          </div>
        </main>

        <DashboardFooter />
      </div>

      <ScrollToTopButton />
    </SidebarProvider>
  );
};

export default DashboardLayout;
