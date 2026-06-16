import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Type } from "../models/type.model";

export const typeApiRepo = {
    getTypes: async (): Promise<Type[]> => {
        const response = await apiClient.get<ApiResponse<Type[]>>("/admin/types");
        return response.data;
    }
};
