import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

// The JWT lives in an httpOnly cookie — withCredentials sends/receives it automatically.
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default function useAxiosSecure() {
  const { logout } = useAuth();

  useEffect(() => {
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
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [logout]);

  return axiosSecure;
}
