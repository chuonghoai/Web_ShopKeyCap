import type { ERole } from "../../../../../core/constants/role.constant";

export interface StaffModel {
    id: number;
    name: string;
    email: string;
    phonenumber: string;
    dob: Date;
    gender: 'MALE' | 'FEMALE';
    salary: number;
    createAt: number;
    role: ERole;
}