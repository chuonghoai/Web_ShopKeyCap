import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { tokenService } from "../../../../../core/auth/token.service";
import { userStorageService } from "../../../../../core/auth/userStorage.service";
import type { LoginResponse } from "../dto/login.dto";
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
}

const useMock = true;
export const authService = new AuthService(useMock ? new AuthMockRepo() : undefined);