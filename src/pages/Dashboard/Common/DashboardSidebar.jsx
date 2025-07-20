import { Link } from "react-router";

const DashboardSidebar = ({ role }) => {
	return (
		<div className='w-64 bg-base-200 p-4 min-h-screen hidden lg:block'>
			<ul className='menu space-y-2'>
				<li>
					<Link to='/dashboard'>Dashboard Home</Link>
				</li>
				{role === "admin" && (
					<li>
						<Link to='/dashboard/manage-users'>Manage Users</Link>
					</li>
				)}
				{role === "buyer" && (
					<li>
						<Link to='/dashboard/create-task'>Create Task</Link>
					</li>
				)}
				{role === "worker" && (
					<li>
						<Link to='/dashboard/tasks'>Available Tasks</Link>
					</li>
				)}
			</ul>
		</div>
	);
};

export default DashboardSidebar;
