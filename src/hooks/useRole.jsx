import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
	const axiosSecure = useAxiosSecure();
	const { user, loading } = useAuth();

	const { data: result, isLoading: isRoleLoading } = useQuery({
		queryKey: ["role", user?.email],
		enabled: !loading && !!user?.email, 
		queryFn: async () => {
			const { data } = await axiosSecure.get('/user/role');
			return data;
		},
	});

	return {role: result?.role, isRoleLoading};
};

export default useRole;