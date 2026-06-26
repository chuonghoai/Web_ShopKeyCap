
import type { ApiResponse } from "../../../../core/api/apiResponse";
import { ERole } from "../../../../core/constants/role.constant";
import { ApiException } from "../../../../core/exceptions/api.exception";
import type { LoginResponse } from "../dto/login.dto";
import { OtpPurpose } from "../dto/otp.dto";
import type { RegisterRequest } from "../dto/register.dto";
import type { ResetPasswordRequest } from "../dto/resetPassword.dto";
import type { AuthRepo } from "./auth.repo";

export class AuthMockRepo implements AuthRepo {
    async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
        let response: ApiResponse<LoginResponse>;
        let role: ERole = ERole.USER;

        if (email === "111@111" && password === "111") role = ERole.USER;
        else if (email === "222@222" && password === "222") role = ERole.ADMIN;
        else {
            throw new ApiException("Email hoặc mật khẩu không chính xác!", 404);
        }

        response = {
            success: true,
            message: "Login success",
            data: {
                accessToken: "mock_access_token",
                user: {
                    id: 1,
                    email: email,
                    fullName: "manggia",
                    avatar: "https://img.icons8.com/color/480/avatar.png",
                    role: role,
                },
            },
        };

        return response;
    }

    async loginByGoogle(_idToken: string): Promise<ApiResponse<LoginResponse>> {
        let response: ApiResponse<LoginResponse> = {
            success: true,
            message: "Login success",
            data: {
                accessToken: "mock_access_token",
                user: {
                    id: 4,
                    email: "manggia@gmail.com",
                    fullName: "manggia",
                    avatar: "https://img.icons8.com/color/480/avatar.png",
                    role: ERole.USER,
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
        };
        if (purpose === OtpPurpose.REGISTER) {
            return response;
        } else if (purpose === OtpPurpose.FORGOT_PASSWORD) {
            // Bad request exception
            // throw new ApiException("Email không tồn tại!", 400);
        }
        return response;
    }

    async register(request: RegisterRequest): Promise<ApiResponse<LoginResponse>> {
        let response: ApiResponse<LoginResponse> = {
            success: true,
            message: 'Đăng ký tài khoản thành công',
            data: {
                accessToken: 'mock_access_token_123',
                user: {
                    id: 1,
                    email: request.email,
                    fullName: 'manggia',
                    avatar: 'https://img.icons8.com/color/480/avatar.png',
                    role: ERole.USER,
                }
            }
        }
        return response;
    }

    async resetPassword(_request: ResetPasswordRequest): Promise<ApiResponse<null>> {
        let response: ApiResponse<null> = {
            success: true,
            message: 'Đặt lại mật khẩu thành công',
            data: null,
        }
        // if (true) {
        //     throw new ApiException("Mật khẩu không khớp!", 400);
        // }
        return response;
    }

    async logout(): Promise<ApiResponse<null>> {
        let response: ApiResponse<null> = {
            success: true,
            message: 'Đăng xuất thành công',
            data: null
        }
        return response;
    }
}
