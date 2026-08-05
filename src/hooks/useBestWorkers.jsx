import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBestWorkers = () => {
  const { data: workers = [], isLoading } = useQuery({
    queryKey: ["top-workers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/top-workers`,
      );
      return data;
    },
    staleTime: 60_000,
  });
  return { workers, isLoading };
};

export default useBestWorkers;
