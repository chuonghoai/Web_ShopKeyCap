import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { ApiException } from "../../../../../core/exceptions/api.exception";
import type { LoginResponse } from "../dto/login.dto";
import type { OtpPurpose } from "../dto/otp.dto";
import type { AuthRepo } from "./auth.repo";

export class AuthMockRepo implements AuthRepo {
    async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
        let response: ApiResponse<LoginResponse>;

        if (email === "111@111" && password === "111") {
            response = {
                success: true,
                message: "Login success",
                data: {
                    accessToken: "mock_access_token",
                    user: {
                        id: "69293c536a4af647a4438347",
                        email: email,
                        fullName: "manggia",
                        avatar: "https://img.icons8.com/color/480/avatar.png",
                        role: "CLIENT",
                    },
                },
            };
        } else {
            throw new ApiException("Email hoặc mật khẩu không chính xác!", 404);
        }

        return response;
    }

    async loginByGoogle(idToken: string): Promise<ApiResponse<LoginResponse>> {
        let response: ApiResponse<LoginResponse> = {
            success: true,
            message: "Login success",
            data: {
                accessToken: "mock_access_token",
                user: {
                    id: "69293c536a4af647a4438347",
                    email: "manggia@gmail.com",
                    fullName: "manggia",
                    avatar: "https://img.icons8.com/color/480/avatar.png",
                    role: "CLIENT",
                },
            },
        }
        return response;
    }

    async sendOtp(email: string, purpose: OtpPurpose): Promise<ApiResponse<null>> {
        let response: ApiResponse<null> = {
            success: true,
            message: `Mã OTP đã được gửi đến ${email}, vui lòng kiểm tra`,
            data: null,
        }
        return response;
    }
}