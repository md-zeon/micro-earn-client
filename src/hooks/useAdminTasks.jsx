import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminTasks = () => {
	const axiosSecure = useAxiosSecure();

	const {
		data: tasks = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["adminTasks"],
		queryFn: async () => {
			const res = await axiosSecure.get("/admin/tasks");
			return res?.data;
		},
	});

	return { tasks, isLoading, refetch };
};

export default useAdminTasks;
