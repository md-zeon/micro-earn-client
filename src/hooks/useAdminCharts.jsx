import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminCharts = () => {
	const axiosSecure = useAxiosSecure();

	const { data: taskStats = [], isLoading: isTaskLoading } = useQuery({
		queryKey: ["admin-task-stats"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/statistics/admin/task-stats");
			return data; // [{ name: 'Jan 2025', tasks: 10 }, ...]
		},
	});

	const { data: userStats = [], isLoading: isUserLoading } = useQuery({
		queryKey: ["admin-user-stats"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/statistics/admin/user-stats");
			return data; // [{ name: 'Workers', value: 1200 }, { name: 'Buyers', value: 350 }]
		},
	});

	const { data: revenueData = [], isLoading: isRevenueLoading } = useQuery({
		queryKey: ["admin-revenue-stats"],
		queryFn: async () => {
			const { data } = await axiosSecure.get(
				"/statistics/admin/revenue-stats",
			);
			return data; // [{ name: 'Jan 2025', revenue: 120 }, ...]
		},
	});

	const { data: withdrawalData = [], isLoading: isWithdrawalLoading } =
		useQuery({
			queryKey: ["admin-withdrawal-stats"],
			queryFn: async () => {
				const { data } = await axiosSecure.get(
					"/statistics/admin/withdrawal-stats",
				);
				return data; // [{ name: 'Jan 2025', payout: 80 }, ...]
			},
		});

	const { data: topTasks = [], isLoading: isTopTasksLoading } = useQuery({
		queryKey: ["admin-top-tasks"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/statistics/admin/top-tasks");
			return data?.data ?? []; // [{ _id, task_title, payable_amount, submissions }]
		},
	});

	const isLoading =
		isTaskLoading ||
		isUserLoading ||
		isRevenueLoading ||
		isWithdrawalLoading ||
		isTopTasksLoading;

	return {
		taskStats,
		userStats,
		revenueData,
		withdrawalData,
		topTasks,
		isLoading,
	};
};

export default useAdminCharts;
