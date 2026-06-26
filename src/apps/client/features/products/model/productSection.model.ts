import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { RecommendedProductRequest } from "../dto/recommendedProductRequest.dto";
import type { ProductItem } from "./product.model";

export interface ProductSectionData {
    sectionName: string;
    items: ProductItem[];
    filter: RecommendedProductRequest;
}

export const productSection = {
    mapToSection(
        res: ApiResponse<ProductItem[]>,
        name: string,
        filter: RecommendedProductRequest = {}
    ): ApiResponse<ProductSectionData> {
        return {
            ...res,
            data: res.data
                ? { sectionName: name, items: res.data, filter }
                : null as any,
        };
    },
};