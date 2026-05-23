import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { LoginResponse } from "../dto/login.dto";
import type { AuthRepo } from "./auth.repo";

export class AuthApiRepo implements AuthRepo {
    /**
     * POST /login
     * @body email, password 
     * @returns LoginResponse
     */
    async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
        return apiClient.post<ApiResponse<LoginResponse>>("/login", {
            email, password
        })
    }

    /**
     * POST /login/google
     * @body idToken của google
     * @returns LoginResponse
     */
    async loginByGoogle(idToken: string): Promise<ApiResponse<LoginResponse>> {
        return apiClient.post<ApiResponse<LoginResponse>>("/login/google", {
            idToken
        })
    }
}