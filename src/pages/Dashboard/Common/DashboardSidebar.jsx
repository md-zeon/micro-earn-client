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
import Loader from "../../../components/Loader";

const DashboardSidebar = ({ role, isSidebarOpen, isRoleLoading }) => {
	const { loading, logOut } = useAuth();
	const navItems = {
		worker: [
			{ path: "/dashboard", label: "Home", icon: <LuHouse /> },
			{ path: "/dashboard/tasks", label: "Task List", icon: <LuListTodo /> },
			{ path: "/dashboard/my-submissions", label: "My Submissions", icon: <LuFileText /> },
			{ path: "/dashboard/approved-submissions", label: "Approved Submissions", icon: <LuCheckCheck /> },
			{ path: "/dashboard/withdrawals", label: "Withdrawals", icon: <LuDollarSign /> },
		],
		buyer: [
			{ path: "/dashboard", label: "Home", icon: <LuHouse /> },
			{ path: "/dashboard/add-task", label: "Add New Task", icon: <LuPlus /> },
			{ path: "/dashboard/my-tasks", label: "My Tasks", icon: <LuListTodo /> },
			{ path: "/dashboard/purchase-coin", label: "Purchase Coin", icon: <LuCreditCard /> },
			{ path: "/dashboard/tasks-to-review", label: "Tasks to Review", icon: <LuFileQuestion /> },
			{ path: "/dashboard/payment-history", label: "Payment History", icon: <LuChartBar /> },
		],
		admin: [
			{ path: "/dashboard", label: "Home", icon: <LuHouse /> },
			{ path: "/dashboard/manage-users", label: "Manage Users", icon: <LuUsers /> },
			{ path: "/dashboard/manage-tasks", label: "Manage Tasks", icon: <LuSettings /> },
			{ path: "/dashboard/withdraw-requests", label: "Withdraw Requests", icon: <LuDollarSign /> },
		],
	};
	if (loading || isRoleLoading) {
		return (
			<div className='w-64 bg-base-200'>
				<Loader />
			</div>
		);
	}

	return (
		<>
			<aside
				className={`w-64 bg-base-200 z-40 p-2 ${
					isSidebarOpen ? "block" : "hidden"
				} lg:block sticky top-[72px] self-start h-[calc(100vh-72px)] overflow-y-auto flex flex-col justify-between`}
			>
				{/* Top Section (Navigation) */}
				<ul className='menu space-y-2'>
					{navItems[role]?.map((item) => (
						<li key={item.path}>
							<NavLink
								className={({ isActive }) => (isActive ? "bg-gradient" : "hover:text-gradient")}
								to={item.path}
								end
							>
								{item.icon} {item.label}
							</NavLink>
						</li>
					))}
				</ul>

				{/* Bottom Section*/}
				<div className='fixed bottom-2 w-60'>
					<hr className='border-accent' />
					<button
						onClick={logOut}
						className='btn btn-ghost w-full justify-start hover:text-red-500'
					>
						<LuLogOut />
						<span className='ml-2'>Logout</span>
					</button>
				</div>
			</aside>
		</>
	);
};

export default DashboardSidebar;
