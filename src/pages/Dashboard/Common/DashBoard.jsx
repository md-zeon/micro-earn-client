import { useEffect, useState } from "react";
import useRole from "../../../hooks/useRole";
import AdminDashboard from "../Admin/AdminDashboard";
import BuyerDashboard from "../Buyer/BuyerDashboard";
import WorkerDashboard from "../Worker/WorkerDashboard";
import { Navigate } from "react-router";
import DashboardSkeleton from "../../../components/ui/DashBoardSkeleton";

const Dashboard = () => {
	const { role, isRoleLoading } = useRole();
	const [greeting, setGreeting] = useState("");

	useEffect(() => {
		const hour = new Date().getHours();
		if (hour < 12) setGreeting("Good Morning");
		else if (hour < 17) setGreeting("Good Afternoon");
		else setGreeting("Good Evening");
	}, []);

	if (isRoleLoading) {
		return (
			<DashboardSkeleton
				statsCount={3}
				showTable={true}
			/>
		);
	}

	if (role === "admin") return <AdminDashboard greeting={greeting} />;
	if (role === "buyer") return <BuyerDashboard greeting={greeting} />;
	if (role === "worker") return <WorkerDashboard greeting={greeting} />;

	return <Navigate to='/forbidden' />;
};

export default Dashboard;
