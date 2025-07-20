import {
	LuChartBar,
	LuCreditCard,
	LuDollarSign,
	LuFileQuestion,
	LuFileText,
	LuHouse,
	LuListTodo,
	LuPlus,
	LuSettings,
	LuUsers,
} from "react-icons/lu";
import { NavLink } from "react-router";

const DashboardSidebar = ({ role, isSidebarOpen }) => {
	const navItems = {
		Worker: [
			{ path: "/dashboard", label: "Home", icon: <LuHouse /> },
			{ path: "/dashboard/tasks", label: "Task List", icon: <LuListTodo /> },
			{ path: "/dashboard/my-submissions", label: "My Submissions", icon: <LuFileText /> },
			{ path: "/dashboard/approved-submissions", label: "Approved Submissions", icon: <LuDollarSign /> },
			{ path: "/dashboard/withdrawals", label: "Withdrawals", icon: <LuDollarSign /> },
		],
		Buyer: [
			{ path: "/dashboard", label: "Home", icon: <LuHouse /> },
			{ path: "/dashboard/tasks-to-review", label: "Tasks to Review", icon: <LuFileQuestion /> },
			{ path: "/dashboard/add-task", label: "Add New Task", icon: <LuPlus /> },
			{ path: "/dashboard/my-tasks", label: "My Tasks", icon: <LuListTodo /> },
			{ path: "/dashboard/purchase-coin", label: "Purchase Coin", icon: <LuCreditCard /> },
			{ path: "/dashboard/payment-history", label: "Payment History", icon: <LuChartBar /> },
		],
		Admin: [
			{ path: "/dashboard", label: "Home", icon: <LuHouse /> },
			{ path: "/dashboard/manage-users", label: "Manage Users", icon: <LuUsers /> },
			{ path: "/dashboard/manage-tasks", label: "Manage Tasks", icon: <LuSettings /> },
			{ path: "/dashboard/withdraw-requests", label: "Withdraw Requests", icon: <LuDollarSign /> },
		],
	};

	return (
		<>
			<aside className={`w-64 bg-base-200 p-4 min-h-screen ${isSidebarOpen ? "block" : "hidden"} lg:block`}>
				<ul className='menu space-y-2'>
					{navItems[role]?.map((item) => (
						<li key={item.path}>
							<NavLink
								className={({ isActive }) => (isActive ? "bg-gradient" : undefined)}
								to={item.path}
							>
								{item?.icon} {item.label}
							</NavLink>
						</li>
					))}
				</ul>
			</aside>
		</>
	);
};

export default DashboardSidebar;
