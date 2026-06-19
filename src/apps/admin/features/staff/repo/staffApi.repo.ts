import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { CreateStaffRequest } from "../models/create-staff.request";
import type { StaffModel } from "../models/staff.model";
import type { UpdateStaffRequest } from "../models/update-staff.request";
import type { StaffRepo } from "./staff.repo";

const ADMIN_STAFF_ENDPOINT = "/admin/staffs";

export class StaffApiRepo implements StaffRepo {
    /**
     * GET /admin/staffs
     * @param: page, limit, search
     * @returns: staffModel[]
     * 
     * Mô tả: Lấy danh sách nhân viên có phân trang
     */
    getStaffs(page: number, limit: number = 20, search?: string): Promise<ApiResponse<StaffModel[]>> {
        return apiClient.get<ApiResponse<StaffModel[]>>(ADMIN_STAFF_ENDPOINT, { params: { page, limit, search } });
    }

    /**
     * GET /admin/staffs/:id
     * @param id: id của nhân viên
     * @returns: staffModel
     * 
     * Mô tả: Lấy thông tin chi tiết nhân viên
     */
    getStaffById(id: number): Promise<ApiResponse<StaffModel>> {
        return apiClient.get<ApiResponse<StaffModel>>(`${ADMIN_STAFF_ENDPOINT}/${id}`);
    }

    /**
     * POST /admin/staffs
     * @body request: CreateStaffRequest
     * @returns: staffModel
     * 
     * Mô tả: Tạo nhân viên mới
     */
    createStaff(request: CreateStaffRequest): Promise<ApiResponse<StaffModel>> {
        return apiClient.post<ApiResponse<StaffModel>>(ADMIN_STAFF_ENDPOINT, request);
    }

    /**
     * PATCH /admin/staffs/:id
     * @param id: id của nhân viên
     * @body request: UpdateStaffRequest
     * @returns: staffModel
     * 
     * Mô tả: Cập nhật nhân viên
     */
    updateStaff(request: UpdateStaffRequest): Promise<ApiResponse<StaffModel>> {
        return apiClient.patch<ApiResponse<StaffModel>>(`${ADMIN_STAFF_ENDPOINT}/${request.id}`, request);
    }

    /**
     * DELETE /admin/staffs/:id
     * @param id: id của nhân viên
     * @returns: null
     * 
     * Mô tả: Xóa nhân viên
     */
    deleteStaff(id: number): Promise<ApiResponse<null>> {
        return apiClient.delete<ApiResponse<null>>(`${ADMIN_STAFF_ENDPOINT}/${id}`);
    }
}
