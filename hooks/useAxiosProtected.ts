import { useEffect } from "react";
import { useAppSelector } from "../fetchConfig/store";
import axios from "../fetchConfig/api/axios";
import { SelectAuth } from "../features/auth/authSlice";
import useRefreshToken from "./useRefreshToken";

const useAxiosProtected = () => {
  const { accessToken } = useAppSelector(SelectAuth);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config: any) => {
        if (!config?.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [refresh, accessToken]);
  return axios;
};

export default useAxiosProtected;
