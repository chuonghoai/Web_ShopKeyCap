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
}