import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Brand } from "../models/brand.model";
import type { BrandRepo } from "./brand.repo";

const mockBrands: Brand[] = [
    { id: 1, name: "Akko", slug: "akko" },
    { id: 2, name: "Logitech", slug: "logitech" },
    { id: 3, name: "Razer", slug: "razer" },
    { id: 4, name: "Corsair", slug: "corsair" }
];

export class BrandMockRepo implements BrandRepo {
    async getBrands(): Promise<ApiResponse<Brand[]>> {
        return new Promise(resolve => {
            setTimeout(() => resolve({
                success: true,
                message: "Success",
                data: mockBrands,
            }), 500);
        });
    }
}
