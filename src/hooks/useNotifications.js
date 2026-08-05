import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useNotifications = ({
  page = 1,
  limit = 10,
  unread = null,
  enabled = true,
} = {}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (unread === true) params.set("unread", "true");

  const query = useQuery({
    queryKey: ["notifications", { page, limit, unread }],
    queryFn: async () => (await axiosSecure.get(`/notifications?${params}`)).data,
    enabled: enabled && Boolean(user?.email),
    ...(unread === null ? { refetchInterval: 30_000 } : {}),
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["notifications"] });

  const markRead = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/notifications/${id}/read`),
    onSuccess: invalidate,
  });

  const markAllRead = useMutation({
    mutationFn: () => axiosSecure.patch("/notifications/read-all"),
    onSuccess: invalidate,
  });

  return {
    ...query,
    notifications: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    unreadCount: query.data?.unreadCount ?? 0,
    markRead,
    markAllRead,
  };
};

export default useNotifications;
