import type { CreateStaffRequest } from "./create-staff.request";

export interface UpdateStaffRequest extends Partial<CreateStaffRequest> {
    id: number;
}
