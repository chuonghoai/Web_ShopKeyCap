import axios from "axios";
import type { AxiosResponse } from "axios";
import { axiosInstance } from "../api/axios";
import { userStorageService } from "../auth/userStorage.service";
import { tokenService } from "../auth/token.service";

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: any) => {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const requestUrl = error.config?.url || "";

            if (status === 401 && !requestUrl.includes("/auth/login")) {
                const currentUser = userStorageService.getUser();
                let reason = "unauthorized";
                if (currentUser) {
                    reason = "expired";
                }
                userStorageService.removeUser();
                tokenService.clear();

                window.location.href = `/login?reason=${reason}`;
            }

            if (status === 403) {
                alert("Forbidden");
            }

            if (status === 500) {
                alert("Server error");
            }
        }

        return Promise.reject(error);
    }
);