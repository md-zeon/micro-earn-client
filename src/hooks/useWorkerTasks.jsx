import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useWorkerTasks = () => {
	const { user, loading } = useAuth();
	const axiosSecure = useAxiosSecure();

	const {
		data: tasks = [],
		isLoading: isTasksLoading,
		refetch: refetchTasks,
	} = useQuery({
		queryKey: ["workerTasks", user?.email],
		enabled: !!user?.email && !loading, // Only fetch if user email is available and not loading
		queryFn: async () => {
			const { data } = await axiosSecure.get("/tasks/tasks-for-worker");
			return data;
		},
	});

	return { tasks, isTasksLoading, refetchTasks };
};

export default useWorkerTasks;
