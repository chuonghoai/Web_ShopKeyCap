import type { StaffModel } from "./staff.model";

export type CreateStaffRequest = Omit<StaffModel, "id" | "createAt" | "role">;
