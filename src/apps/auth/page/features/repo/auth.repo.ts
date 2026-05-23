import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { LoginResponse } from "../dto/login.dto";

export interface AuthRepo {
    login(email: string, password: string): Promise<ApiResponse<LoginResponse>>;
    loginByGoogle(idToken: string): Promise<ApiResponse<LoginResponse>>;
}