import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
	const { user, logOut } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		// Set up interceptors only once
		const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
			if (user?.accessToken) {
				config.headers.Authorization = `Bearer ${user?.accessToken}`;
			}
			return config;
		});

		const responseInterceptor = axiosInstance.interceptors.response.use(
			(response) => response,
			async (error) => {
				const status = error?.response?.status;

				if (status === 401 || status === 400) {
					toast.error("Session expired. Please login again.");
					await logOut();
					navigate("/login");
				} else if (status === 403) {
					toast.error("You do not have permission to access this.");
					navigate("/forbidden");
				}

				return Promise.reject(error);
			},
		);

		// Cleanup interceptors on unmount
		return () => {
			axiosInstance.interceptors.request.eject(requestInterceptor);
			axiosInstance.interceptors.response.eject(responseInterceptor);
		};
	}, [user, logOut, navigate]);

	return axiosInstance;
};

export default useAxiosSecure;
