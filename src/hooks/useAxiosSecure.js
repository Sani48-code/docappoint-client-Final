import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default function useAxiosSecure() {
  const { user, logout } = useAuth();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          logout();
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logout]);

  return axiosSecure;
}
