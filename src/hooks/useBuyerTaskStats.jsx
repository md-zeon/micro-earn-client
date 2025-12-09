import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBuyerTaskStats = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const {
		data: taskStats = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["buyerTaskStats", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure.get("/statistics/buyer/task-stats");
			return data;
		},
	});

	return { taskStats, isLoading, refetch };
};

export default useBuyerTaskStats;
