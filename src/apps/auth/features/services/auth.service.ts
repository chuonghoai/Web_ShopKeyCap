
import type { ApiResponse } from "../../../../core/api/apiResponse";
import { USE_MOCK } from "../../../../core/config/useMock.config";
import { tokenService } from "../../../../core/auth/token.service";
import { userStorageService } from "../../../../core/auth/userStorage.service";
import type { LoginResponse } from "../dto/login.dto";
import { OtpPurpose } from "../dto/otp.dto";
import type { RegisterRequest } from "../dto/register.dto";
import type { ResetPasswordRequest } from "../dto/resetPassword.dto";
import type { AuthRepo } from "../repo/auth.repo";
import { AuthApiRepo } from "../repo/authApi.repo";
import { AuthMockRepo } from "../repo/authMock.repo";

export class AuthService {
    private readonly authRepo: AuthRepo;
    constructor(authRepo?: AuthRepo) {
        this.authRepo = authRepo || new AuthApiRepo();
    }

    /**
     * Login by email/password
     */
    async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
        const result = await this.authRepo.login(email, password);
        if (result.success) {
            tokenService.saveAccessToken(result.data.accessToken);
            userStorageService.saveUser(result.data.user);
        }
        return result;
    }

    /**
     * Login by google
     */
    async loginByGoogle(idToken: string): Promise<ApiResponse<LoginResponse>> {
        const result = await this.authRepo.loginByGoogle(idToken);
        if (result.success) {
            tokenService.saveAccessToken(result.data.accessToken);
            userStorageService.saveUser(result.data.user);
        }
        return result;
    }

    /**
     * Request OTP with purpose
     */
    async sendOtp(email: string, purpose: OtpPurpose): Promise<ApiResponse<null>> {
        const result = await this.authRepo.sendOtp(email, purpose);
        return result;
    }

    /**
     * Register
     */
    async register(request: RegisterRequest): Promise<ApiResponse<LoginResponse>> {
        const result = await this.authRepo.register(request);
        if (result.success) {
            tokenService.saveAccessToken(result.data.accessToken);
            userStorageService.saveUser(result.data.user);
        }
        return result;
    }

    /**
     * Reset password
     */
    async resetPassword(request: ResetPasswordRequest): Promise<ApiResponse<null>> {
        const result = await this.authRepo.resetPassword(request);
        return result;
    }

    /**
     * Logout
     */
    async logout(): Promise<ApiResponse<null>> {
        return this.authRepo.logout();
    }
}

export const authService = new AuthService(USE_MOCK ? new AuthMockRepo() : new AuthApiRepo());