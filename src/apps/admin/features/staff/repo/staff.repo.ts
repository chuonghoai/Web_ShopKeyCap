import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { CreateStaffRequest } from "../models/create-staff.request";
import type { StaffModel } from "../models/staff.model";
import type { UpdateStaffRequest } from "../models/update-staff.request";

export interface StaffRepo {
    getStaffs(page: number, limit?: number, search?: string): Promise<ApiResponse<StaffModel[]>>;
    getStaffById(id: number): Promise<ApiResponse<StaffModel>>;
    createStaff(request: CreateStaffRequest): Promise<ApiResponse<StaffModel>>;
    updateStaff(request: UpdateStaffRequest): Promise<ApiResponse<StaffModel>>;
    deleteStaff(id: number): Promise<ApiResponse<null>>;
}
