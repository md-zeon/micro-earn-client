// import useRole from "../../../hooks/useRole";

import Loader from "../../../components/Loader";
import useRole from "../../../hooks/useRole";
import AdminDashboard from "../Admin/AdminDashboard";
import BuyerDashboard from "../Buyer/BuyerDashboard";
import WorkerDashboard from "../Worker/WorkerDashboard";

const Dashboard = () => {
	const { role, isRoleLoading } = useRole();

	if (isRoleLoading) {
		return <Loader />;
	}

	if (role === "admin") return <AdminDashboard />;
	if (role === "buyer") return <BuyerDashboard />;
	if (role === "worker") return <WorkerDashboard />;

	return <div>You are not authorized to view this page.</div>;
};

export default Dashboard;
