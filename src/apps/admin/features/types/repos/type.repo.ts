import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Type } from "../models/type.model";

export interface TypeRepo {
    getTypes(): Promise<ApiResponse<Type[]>>;
}
