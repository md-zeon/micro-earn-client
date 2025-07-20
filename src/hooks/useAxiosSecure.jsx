import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

const useAxiosSecure = () => {
	const { user, logOut } = useAuth();

	useEffect(() => {
		// Set up interceptors only once
		const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
			if (user?.accessToken) {
				config.headers.Authorization = `Bearer ${user.accessToken}`;
			}
			return config;
		});

		const responseInterceptor = axiosInstance.interceptors.response.use(
			(response) => response,
			async (error) => {
				const status = error?.response?.status;
				if (status === 401 || status === 403) {
					await logOut(); // Log out user if token invalid/expired
				}
				return Promise.reject(error);
			},
		);

		// Cleanup interceptors on unmount to prevent stacking
		return () => {
			axiosInstance.interceptors.request.eject(requestInterceptor);
			axiosInstance.interceptors.response.eject(responseInterceptor);
		};
	}, [user, logOut]);

	return axiosInstance;
};

export default useAxiosSecure;
