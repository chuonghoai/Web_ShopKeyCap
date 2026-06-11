import type { ERole } from "../../../../../core/constants/role.constant";

export interface User {
    id: number;
    email: string;
    fullName: string;
    avatar: string;
    role: ERole;
}
