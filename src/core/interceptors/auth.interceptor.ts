import { axiosInstance } from "../api/axios";
import { tokenService } from "../auth/token.service";
import type { InternalAxiosRequestConfig } from "axios";

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token =
            tokenService.getAccessToken();

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },
    (error: any) => Promise.reject(error)
);