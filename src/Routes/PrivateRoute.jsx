import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import DashboardLayoutSkeleton from "../components/ui/DashboardLayoutSkeleton";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) {
		return <DashboardLayoutSkeleton />;
	}
	if (user) return children;
	return (
		<Navigate
			to='/login'
			state={{ from: location }}
			replace='true'
		/>
	);
};

export default PrivateRoute;
