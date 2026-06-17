import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Type } from "../models/type.model";
import type { TypeRepo } from "./type.repo";

const mockTypes: Type[] = [
    { id: 1, name: "Gaming", slug: "gaming" },
    { id: 2, name: "Văn phòng", slug: "van-phong" },
];

export class TypeMockRepo implements TypeRepo {
    async getTypes(): Promise<ApiResponse<Type[]>> {
        return new Promise(resolve => {
            setTimeout(() => resolve({
                success: true,
                message: "Success",
                data: mockTypes,
            }), 500);
        });
    }
}
