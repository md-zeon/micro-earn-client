import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";

const BuyerRoute = ({ children }) => {
	const { role, isRoleLoading } = useRole();
	if (isRoleLoading) return <DashboardSkeleton statsCount={4} showTable={true} />;

	if (role === "buyer") return children;

	return (
		<Navigate
			to='/forbidden'
			replace
		/>
	);
};

export default BuyerRoute;
