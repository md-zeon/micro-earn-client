import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useAvailableCoins = () => {
	const axiosSecure = useAxiosSecure();
	const { user, loading } = useAuth();

	const { data: result, isLoading: isMicroCoinsLoading, refetch } = useQuery({
		queryKey: ["availableCoins", user?.email],
		enabled: !loading && !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure.get("/available-coins");
			return data;
		},
	});

	return {
		microCoins: result?.microCoins ?? 0,
		isMicroCoinsLoading,
		refetch,
	};
};

export default useAvailableCoins;
