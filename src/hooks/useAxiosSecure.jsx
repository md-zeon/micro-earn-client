import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

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
				config.headers.Authorization = `Bearer ${user.accessToken}`;
			}
			return config;
		});

		const responseInterceptor = axiosInstance.interceptors.response.use(
			(response) => response,
			async (error) => {
				const status = error?.response?.status;

				if (status === 401 || status === 400) {
					await logOut();
					navigate("/login");
				} else if (status === 403) {
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
