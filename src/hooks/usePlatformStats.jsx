import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePlatformStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/statistics`,
      );
      return data;
    },
    staleTime: 60_000,
  });
  return { stats, isLoading };
};

export default usePlatformStats;
