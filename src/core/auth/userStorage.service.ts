import type { User } from "../../apps/client/features/profile/models/user.model";
import { localStorageService } from "../localStorage/localStorage.service";

const USER = "user";

class UserStorageService {
    saveUser(user: User): void {
        localStorageService.set(USER, user);
    }

    getUser(): User | null {
        return localStorageService.get<User>(USER);
    }

    removeUser(): void {
        localStorageService.remove(USER);
    }

    clear(): void {
        localStorageService.clear();
    }
}

export const userStorageService = new UserStorageService();