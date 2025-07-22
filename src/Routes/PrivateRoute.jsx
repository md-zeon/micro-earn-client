import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) {
		return <Loader />;
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
