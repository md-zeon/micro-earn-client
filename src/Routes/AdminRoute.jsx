import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";

const AdminRoute = ({ children }) => {
	const { role, isRoleLoading } = useRole();
	if (isRoleLoading) return <DashboardSkeleton statsCount={4} showTable={true} />;

	if (role === "admin") return children;

	return (
		<Navigate
			to='/forbidden'
			replace
		/>
	);
};

export default AdminRoute;
