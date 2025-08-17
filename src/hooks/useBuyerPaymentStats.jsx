import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBuyerPaymentStats = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const {
		data: paymentStats = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["buyerPaymentStats", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure.get("/buyer/payment-stats");
			return data;
		},
	});

	return { paymentStats, isLoading, refetch };
};

export default useBuyerPaymentStats;
