import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBuyerSubmissions = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const {
		data: submissions,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["buyerSubmissions", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure.get("/buyer-submissions");
			return data;
		},
	});

	return { submissions, isLoading, refetch };
};

export default useBuyerSubmissions;
