import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Type } from "../models/type.model";
import type { TypeRepo } from "./type.repo";

export class TypeApiRepo implements TypeRepo {
    /**
     * GET /admin/types
     * @returns Type[]
     */
    async getTypes(): Promise<ApiResponse<Type[]>> {
        return apiClient.get<ApiResponse<Type[]>>("/admin/types");
    }
}
