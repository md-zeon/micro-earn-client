import { Navigate } from "react-router";
import Loader from "../components/Loader";
import useRole from "../hooks/useRole";

const BuyerRoute = ({ children }) => {
	const {role, isRoleLoading} = useRole();
	if (isRoleLoading) return <Loader />;

	if (role === "buyer") return children;

	return <Navigate to='/' />;
};

export default BuyerRoute;
