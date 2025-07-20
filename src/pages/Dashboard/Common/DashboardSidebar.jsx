import { useState } from "react";
import { Link } from "react-router";

const DashboardSidebar = ({ role }) => {
	const [isOpen, setIsOpen] = useState(false);
	const navItems = {
		Worker: [
			{ path: "/dashboard", label: "Home" },
			{ path: "/dashboard/tasks", label: "Task List" },
			{ path: "/dashboard/my-submissions", label: "My Submissions" },
			{ path: "/dashboard/approved-submissions", label: "Approved Submissions" },
			{ path: "/dashboard/withdrawals", label: "Withdrawals" },
		],
		Buyer: [
			{ path: "/dashboard", label: "Home" },
			{ path: "/dashboard/tasks-to-review", label: "Tasks to Review" },
			{ path: "/dashboard/add-task", label: "Add New Task" },
			{ path: "/dashboard/my-tasks", label: "My Tasks" },
			{ path: "/dashboard/purchase-coin", label: "Purchase Coin" },
			{ path: "/dashboard/payment-history", label: "Payment History" },
		],
		Admin: [
			{ path: "/dashboard", label: "Home" },
			{ path: "/dashboard/manage-users", label: "Manage Users" },
			{ path: "/dashboard/manage-tasks", label: "Manage Tasks" },
			{ path: "/dashboard/withdraw-requests", label: "Withdraw Requests" },
		],
	};

	  return (
    <>
      <button
        className="lg:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className={`w-64 bg-base-200 p-4 min-h-screen ${isOpen ? 'block' : 'hidden'} lg:block`}>
			<ul className='menu space-y-2'>
				{navItems[role]?.map((item) => (
					<li key={item.path}>
						<Link to={item.path}>{item.label}</Link>
					</li>
				))}
			</ul>
      </div>
    </>
  );

};

export default DashboardSidebar;