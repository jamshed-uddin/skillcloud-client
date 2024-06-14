import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_baseUrl,
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { userLogout } = useAuth();

  useEffect(() => {
    if (!user) return;

    axiosSecure.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("jwt");

        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const status = error.response.status;

        if (status === 401 || status === 403) {
          await userLogout();
          navigate("/");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject();
      axiosSecure.interceptors.response.eject();
    };
  }, [navigate, userLogout, user]);

  return axiosSecure;
};

export default useAxiosSecure;
