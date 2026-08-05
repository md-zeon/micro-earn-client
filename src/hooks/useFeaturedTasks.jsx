import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFeaturedTasks = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
    params: { limit: 6 },
  });
  return Array.isArray(data) ? data : data?.data ?? [];
};

const useFeaturedTasks = () => {
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["featured-tasks"],
    queryFn: fetchFeaturedTasks,
    staleTime: 60_000,
  });
  return { tasks, isLoading };
};

export default useFeaturedTasks;
