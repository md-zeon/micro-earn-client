import { Skeleton } from "@radix-ui/themes";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) {
		return <Skeleton loading={true}>{children}</Skeleton>;
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
