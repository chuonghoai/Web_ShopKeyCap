import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { LoginResponse } from "../dto/login.dto";
import type { OtpPurpose } from "../dto/otp.dto";

export interface AuthRepo {
    login(email: string, password: string): Promise<ApiResponse<LoginResponse>>;
    loginByGoogle(idToken: string): Promise<ApiResponse<LoginResponse>>;

    sendOtp(email: string, purpose: OtpPurpose): Promise<ApiResponse<null>>;
}