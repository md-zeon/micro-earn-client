import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminUsers = () => {
	const axiosSecure = useAxiosSecure();

	const { data: users = [], isLoading, refetch } = useQuery({
		queryKey: ["admin-users"],
		queryFn: async () => {
			const res = await axiosSecure.get("/users");
			return res?.data;
		},
	});

	return { users, isLoading, refetch };
};

export default useAdminUsers;
