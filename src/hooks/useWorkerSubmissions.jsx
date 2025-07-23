import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useWorkerSubmissions = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const {
		data: submissions,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["workerSubmissions", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure.get("/submissions");
			return data;
		},
	});

	return { submissions, isLoading, refetch };
};

export default useWorkerSubmissions;