import type { ROLE } from "../../../../../core/constants/role.constant";

export class User {
    id: string;
    email: string;
    fullName: string;
    avatar: string;
    role: ROLE;
}