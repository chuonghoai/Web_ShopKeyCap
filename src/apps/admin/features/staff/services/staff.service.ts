import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { CreateStaffRequest } from "../models/create-staff.request";
import type { UpdateStaffRequest } from "../models/update-staff.request";
import type { StaffRepo } from "../repo/staff.repo";
import { StaffApiRepo } from "../repo/staffApi.repo";
import { StaffMockRepo } from "../repo/staffMock.repo";

export class StaffService {
    private readonly repo: StaffRepo;

    constructor(staffRepo: StaffRepo) {
        this.repo = staffRepo;
    }

    async getStaffs(page: number, limit?: number, search?: string) {
        return this.repo.getStaffs(page, limit, search);
    }

    async getStaffById(id: number) {
        return this.repo.getStaffById(id);
    }

    async createStaff(request: CreateStaffRequest) {
        return this.repo.createStaff(request);
    }

    async updateStaff(request: UpdateStaffRequest) {
        return this.repo.updateStaff(request);
    }

    async deleteStaff(id: number) {
        return this.repo.deleteStaff(id);
    }
}

export const staffService = new StaffService(USE_MOCK ? new StaffMockRepo() : new StaffApiRepo());
