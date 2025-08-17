import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useWorkerStats = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	// Earnings Stats
	const {
		data: earningsData = [],
		isLoading: earningsLoading,
		refetch: refetchEarnings,
	} = useQuery({
		queryKey: ["workerEarnings", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure.get("/worker/earnings-stats");
			return data;
		},
	});

	// Submission Stats
	const {
		data: submissionStats = [],
		isLoading: submissionsLoading,
		refetch: refetchSubmissions,
	} = useQuery({
		queryKey: ["workerSubmissionStats", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure.get("/worker/submission-stats");
			return data;
		},
	});

	return {
		earningsData,
		submissionStats,
		isLoading: earningsLoading || submissionsLoading,
		refetchEarnings,
		refetchSubmissions,
	};
};

export default useWorkerStats;
