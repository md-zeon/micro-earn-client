import {
  LuChartBar,
  LuCheckCheck,
  LuCreditCard,
  LuDollarSign,
  LuFileQuestion,
  LuFileText,
  LuHouse,
  LuListTodo,
  LuLogOut,
  LuPlus,
  LuSettings,
  LuUsers,
} from "react-icons/lu";
import { NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SidebarSkeleton from "../../../components/ui/SidebarSkeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const DashboardSidebar = ({ role, isSidebarOpen, isRoleLoading }) => {
  const { loading, logOut } = useAuth();
  const navItems = {
    worker: [
      { path: "/dashboard", label: "Overview", icon: <LuHouse /> },
      {
        path: "/dashboard/tasks-list",
        label: "Task List",
        icon: <LuListTodo />,
      },
      {
        path: "/dashboard/my-submissions",
        label: "My Submissions",
        icon: <LuFileText />,
      },
      {
        path: "/dashboard/approved-submissions",
        label: "Approved Submissions",
        icon: <LuCheckCheck />,
      },
      {
        path: "/dashboard/withdrawals",
        label: "Withdrawals",
        icon: <LuDollarSign />,
      },
    ],
    buyer: [
      { path: "/dashboard", label: "Overview", icon: <LuHouse /> },
      { path: "/dashboard/add-task", label: "Add New Task", icon: <LuPlus /> },
      { path: "/dashboard/my-tasks", label: "My Tasks", icon: <LuListTodo /> },
      {
        path: "/dashboard/purchase-coin",
        label: "Purchase Coin",
        icon: <LuCreditCard />,
      },
      {
        path: "/dashboard/tasks-to-review",
        label: "Tasks to Review",
        icon: <LuFileQuestion />,
      },
      {
        path: "/dashboard/payment-history",
        label: "Payment History",
        icon: <LuChartBar />,
      },
    ],
    admin: [
      { path: "/dashboard", label: "Overview", icon: <LuHouse /> },
      {
        path: "/dashboard/manage-users",
        label: "Manage Users",
        icon: <LuUsers />,
      },
      {
        path: "/dashboard/manage-tasks",
        label: "Manage Tasks",
        icon: <LuSettings />,
      },
      {
        path: "/dashboard/withdraw-requests",
        label: "Withdraw Requests",
        icon: <LuDollarSign />,
      },
    ],
  };
  if (loading || isRoleLoading) {
    return <SidebarSkeleton isSidebarOpen={isSidebarOpen} />;
  }

  return (
    <aside
      className={`w-64 bg-card z-40 p-2 border-r border-border ${
        isSidebarOpen ? "block" : "hidden"
      } lg:block sticky top-[72px] self-start h-[calc(100vh-72px)] overflow-y-auto flex flex-col justify-between`}
    >
      {/* Top Section (Navigation) */}
      <nav className="space-y-1">
        {navItems[role]?.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-gradient text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="space-y-2">
        <Separator />
        <Button
          variant="ghost"
          onClick={logOut}
          className="w-full justify-start text-muted-foreground hover:text-destructive"
        >
          <LuLogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
