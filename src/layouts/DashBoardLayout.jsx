import { useState } from "react";
import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import useAvailableCoins from "../hooks/useAvailableCoins";
import DashboardSidebar from "../pages/Dashboard/Common/DashboardSidebar";
import DashboardFooter from "../pages/Dashboard/Common/DashboardFooter";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role, isRoleLoading } = useRole();
  const { microCoins, isMicroCoinsLoading } = useAvailableCoins();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  if (isRoleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-base-200 shadow sticky top-0 z-50">
        <div className="text-xl font-bold">MicroEarn</div>

        <div className="flex items-center space-x-4">
          {/* Available coins */}
          <div className="badge badge-primary">
            {isMicroCoinsLoading ? "Loading..." : `${microCoins} Coins`}
          </div>

          {/* User info */}
          <div className="flex items-center space-x-2">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt={user?.displayName || "User"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold">{user?.displayName || "User Name"}</span>
              <span className="text-xs text-muted">{role || "No Role"}</span>
            </div>
          </div>

          {/* Notification Icon */}
          <button
            onClick={() => setIsNotificationOpen((prev) => !prev)}
            className="relative p-2 rounded hover:bg-base-300"
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            {/* Notification dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4 z-50">
                <p className="text-sm font-semibold mb-2">Notifications</p>
                <ul className="max-h-48 overflow-auto">
                  <li className="text-xs text-gray-600">No new notifications.</li>
                </ul>
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Main content area: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar role={role} />

        <main className="flex-1 overflow-auto p-6 bg-base-100">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
