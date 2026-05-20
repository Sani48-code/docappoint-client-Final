import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

const TOKEN_KEY = 'docappoint_token';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default function useAxiosSecure() {
  const { logout } = useAuth();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
  }, [logout]);

  return axiosSecure;
}
