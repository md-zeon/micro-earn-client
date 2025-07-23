import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useWithDrawals = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const {
		data: withdrawals,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["withdrawals", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure.get("/withdrawals");
			return data;
		},
	});

	return { withdrawals, isLoading, refetch };
};

export default useWithDrawals;