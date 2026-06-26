import { apiClient } from "../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../core/api/apiResponse";
import type { LoginResponse } from "../dto/login.dto";
import type { OtpPurpose } from "../dto/otp.dto";
import type { RegisterRequest } from "../dto/register.dto";
import type { ResetPasswordRequest } from "../dto/resetPassword.dto";
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
     * 
     * Cách xử lý:
     *  1. Fe gửi idToken cho Be
     *  2. Be nhận idToken, dùng thư viện của Google để để xác thực chữ ký của token đó
     *      Backend cần cấu hình GOOGLE_CLIENT_ID và GOOGLE_CLIENT_SECRET để đối soát
     *  3. Nếu token hợp lệ, Google sẽ trả về thông tin người dùng (email, fullName, avatar)
     *  4. Backend check trong DB, nếu user chưa có thì tạo mới với role USER và các thông tin của mà google trả về.
     *      Nếu đã tồn tại thì tạo LoginResponse trả về cho Fe đăng nhập hệ thống
     */
    async loginByGoogle(idToken: string): Promise<ApiResponse<LoginResponse>> {
        return apiClient.post<ApiResponse<LoginResponse>>("/login/google", {
            idToken
        })
    }

    /**
     * POST /otps/request
     * @body email, purpose 
     * @returns null
     * 
     * Mô tả:
     *  - Otp được gửi đến email
     *  - purpose là mục đích sử dụng otp, khi verify OTP phải check đúng 
     *      mục đích sử dụng của otp (đăng ký, quên mật khẩu)
     *
     * MÔ TẢ MỚI:
     *  - Nếu purpose là REGISTER, thì gửi email và trả về success luôn mà không cần kiểm tra gì thêm
     *  - Nếu purpose là FORGOT_PASSWORD, thì kiểm tra bảng user có tồn tại email ko
     *  - Nếu không thì báo lỗi không tồn tại tài khoản
     *  - Nếu có thì gửi otp đến email và trả về ApiResponse.success = true
     */
    async sendOtp(email: string, purpose: OtpPurpose): Promise<ApiResponse<null>> {
        return apiClient.post<ApiResponse<null>>("/otps/request", {
            email,
            purpose
        })
    }

    /**
     * POST /register
     * @body request
     * @returns LoginResponse
     * 
     * Mô tả:
     *  - request gửi đi gồm có otp và otpPurpose
     *  - Be cần check otp và mục đích sử dụng otpPurpose có đúng là REGISTER ko
     *  - Be check password và confirm password có khớp ko
     *  - Nếu hợp lệ, tạo tài khoản với email và password
     *  - Các thông tin khác:
     *      + fullname: bóc tách từ email
     *      + phone: null
     *      + address: null
     *      + avatar: null
     */
    async register(request: RegisterRequest): Promise<ApiResponse<LoginResponse>> {
        return apiClient.post<ApiResponse<LoginResponse>>("/register",
            request
        )
    }

    /**
     * POST /reset-password
     * @body request
     * @returns null
     * 
     * Mô tả: Logic check otp tương tự như API /register
     */
    async resetPassword(request: ResetPasswordRequest): Promise<ApiResponse<null>> {
        return apiClient.post<ApiResponse<null>>("/reset-password",
            request
        )
    }

    /**
     * POST /logout
     * @returns null
     */
    async logout(): Promise<ApiResponse<null>> {
        return apiClient.post<ApiResponse<null>>("/logout");
    }
}