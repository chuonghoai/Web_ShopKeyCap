import type { ERole } from "../../../../../core/constants/ERole.constant";

export interface User {
    id: number;
    email: string;
    fullName: string;
    avatar: string;
    ERole: ERole;
}
