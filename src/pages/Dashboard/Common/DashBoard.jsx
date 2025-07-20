// import useRole from "../../../hooks/useRole";

import AdminDashboard from "../Admin/AdminDashboard";
import BuyerDashboard from "../Buyer/BuyerDashboard";
import WorkerDashboard from "../Worker/WorkerDashboard";

const Dashboard = () => {
	// const { role, isRoleLoading } = useRole();

	// if (isRoleLoading) {
	// 	return (
	// 		<div className='flex justify-center items-center h-screen'>
	// 			<span className='loading loading-spinner loading-lg' />
	// 		</div>
	// 	);
	// }
    const role = 'Buyer'


	if (role === "Admin") return <AdminDashboard />;
	if (role === "Buyer") return <BuyerDashboard />;
	if (role === "Worker") return <WorkerDashboard />;

	return <div>You are not authorized to view this page.</div>;
};

export default Dashboard;
