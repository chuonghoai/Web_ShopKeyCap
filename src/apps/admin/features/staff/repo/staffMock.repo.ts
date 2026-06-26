import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { CreateStaffRequest } from "../models/create-staff.request";
import type { StaffModel } from "../models/staff.model";
import type { UpdateStaffRequest } from "../models/update-staff.request";
import type { StaffRepo } from "./staff.repo";
import { ERole } from "../../../../../core/constants/role.constant";

const mockStaffList: StaffModel[] = [
    {
        id: 1,
        name: "alice",
        email: "admin@example.com",
        phonenumber: "0123456789",
        dob: new Date("1990-01-01"),
        gender: "MALE",
        salary: 10000000,
        createAt: Date.now(),
        role: ERole.ADMIN
    },
    {
        id: 2,
        name: "bob",
        email: "staff@example.com",
        phonenumber: "0987654321",
        dob: new Date("1995-05-05"),
        gender: "FEMALE",
        salary: 8000000,
        createAt: Date.now(),
        role: ERole.STAFF
    }
];

export class StaffMockRepo implements StaffRepo {
    async getStaffs(page: number, limit: number = 10, search?: string): Promise<ApiResponse<StaffModel[]>> {
        let filtered = mockStaffList;
        if (search) {
            filtered = mockStaffList.filter(s => s.email.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase()));
        }
        return {
            success: true,
            message: "Success",
            data: filtered,
            pagination: {
                page,
                pageSize: limit,
                totalItems: filtered.length,
                totalPages: Math.ceil(filtered.length / limit) || 1
            }
        };
    }

    async getStaffById(id: number): Promise<ApiResponse<StaffModel>> {
        const item = mockStaffList.find(s => s.id === id) || mockStaffList[0];
        return {
            success: true,
            message: "Success",
            data: item
        };
    }

    async createStaff(request: CreateStaffRequest): Promise<ApiResponse<StaffModel>> {
        return {
            success: true,
            message: "Created",
            data: {
                id: 999,
                createAt: Date.now(),
                role: ERole.STAFF,
                ...request
            }
        };
    }

    async updateStaff(request: UpdateStaffRequest): Promise<ApiResponse<StaffModel>> {
        const item = mockStaffList.find(s => s.id === request.id) || mockStaffList[0];
        return {
            success: true,
            message: "Updated",
            data: {
                ...item,
                ...request
            } as StaffModel
        };
    }

    async deleteStaff(_id: number): Promise<ApiResponse<null>> {
        return { success: true, message: "Deleted", data: null };
    }
}
