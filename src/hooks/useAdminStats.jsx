import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminStats = () => {
	const axiosSecure = useAxiosSecure();
	const { data: adminStats, isLoading } = useQuery({
		queryKey: ["admin-stats"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/statistics/admin/stats");
			return data; // { totalWorkers, totalBuyers, totalCoins, totalPayments }
		},
	});
	return { adminStats, isLoading };
};

export default useAdminStats;
