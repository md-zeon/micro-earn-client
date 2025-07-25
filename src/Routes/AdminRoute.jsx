import { Navigate } from "react-router";
import Loader from "../components/Loader";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
	const { role, isRoleLoading } = useRole();
	if (isRoleLoading) return <Loader />;

	if (role === "admin") return children;

	return (
		<Navigate
			to='/forbidden'
			replace
		/>
	);
};

export default AdminRoute;
