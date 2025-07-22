import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBuyerTasks = () => {
	const { user, loading } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data: tasks = [], isTasksLoading } = useQuery({
		queryKey: ["buyerTasks", user?.email],
		enabled: !!user?.email && !loading,
		queryFn: async () => {
			const { data } = await axiosSecure.get("/my-tasks");
			return data;
		},
	});

	return { tasks, isTasksLoading };
};

export default useBuyerTasks;
