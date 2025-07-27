import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBuyerPayments = () => {
	const { user, loading } = useAuth();
	const axiosSecure = useAxiosSecure();

	const {
		data: payments = [],
		isLoading: isPaymentsLoading,
		refetch,
	} = useQuery({
		queryKey: ["buyerPayments", user?.email],
		enabled: !loading && !!user?.email,
		queryFn: async () => {
			const res = await axiosSecure.get('/payments');
			return res?.data;
		},
	});
	return { payments, isPaymentsLoading, refetch };
};

export default useBuyerPayments;
