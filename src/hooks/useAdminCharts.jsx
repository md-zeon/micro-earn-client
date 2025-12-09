import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminCharts = () => {
	const axiosSecure = useAxiosSecure();

	// Fetch task stats
	const { data: taskStats = [], isLoading: isTaskLoading } = useQuery({
		queryKey: ["admin-task-stats"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/statistics/admin/task-stats");
			return data; // [{ name: 'Jan 2025', tasks: 10 }, ...]
		},
	});

	// Fetch user stats
	const { data: userStats = [], isLoading: isUserLoading } = useQuery({
		queryKey: ["admin-user-stats"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/statistics/admin/user-stats");
			return data; // [{ name: 'Workers', value: 1200 }, { name: 'Buyers', value: 350 }]
		},
	});

	const isLoading = isTaskLoading || isUserLoading;

	return { taskStats, userStats, isLoading };
};

export default useAdminCharts;
