// import useRole from "../../../hooks/useRole";

import useRole from "../../../hooks/useRole";
import AdminDashboard from "../Admin/AdminDashboard";
import BuyerDashboard from "../Buyer/BuyerDashboard";
import WorkerDashboard from "../Worker/WorkerDashboard";

const Dashboard = () => {
	const { role, isRoleLoading } = useRole();

	if (isRoleLoading) {
		return (
			<div className='p-4'>
				<div className='h-6 w-40 bg-base-300 animate-pulse rounded mb-4' />
				<div className='h-4 w-full bg-base-300 animate-pulse rounded mb-2' />
				<div className='h-4 w-5/6 bg-base-300 animate-pulse rounded mb-2' />
				<div className='h-4 w-3/4 bg-base-300 animate-pulse rounded mb-2' />
			</div>
		);
	}

	if (role === "Admin") return <AdminDashboard />;
	if (role === "Buyer") return <BuyerDashboard />;
	if (role === "Worker") return <WorkerDashboard />;

	return <div>You are not authorized to view this page.</div>;
};

export default Dashboard;
