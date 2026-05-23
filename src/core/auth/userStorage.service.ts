import { localStorageService } from "../localStorage/localStorage.service";

const USER = "user";

class UserStorageService {
    saveUser(user: any): void {
        localStorageService.set(USER, user);
    }

    getUser(): any | null {
        return localStorageService.get<any>(USER);
    }

    removeUser(): void {
        localStorageService.remove(USER);
    }

    clear(): void {
        localStorageService.clear();
    }
}

export const userStorageService = new UserStorageService();