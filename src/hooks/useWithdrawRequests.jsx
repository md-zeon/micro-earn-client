import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useWithdrawRequests = () => {
	const axiosSecure = useAxiosSecure();

	const {
		data: withdrawRequests = [],
		isLoading: isWithdrawLoading,
		refetch,
	} = useQuery({
		queryKey: ["withdrawRequests"],
		queryFn: async () => {
			const res = await axiosSecure.get("/admin/withdraw-requests");
			return res.data;
		},
	});

	return { withdrawRequests, isWithdrawLoading, refetch };
};

export default useWithdrawRequests;
