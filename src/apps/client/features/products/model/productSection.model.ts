import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { RecommendedProductRequest } from "../dto/recommendedProductRequest.dto";
import type { ProductItem } from "./product.model";

export interface ProductSectionData {
    sectionName: string;
    items: ProductItem[];
    /**
     * Bộ lọc tương ứng của section này.
     * Khi bấm "Xem tất cả", sẽ điều hướng đến trang danh sách sản phẩm
     * và truyền filter này lên URL dưới dạng query params.
     */
    filter: RecommendedProductRequest;
}

/**
 * productSection – namespace object gom model + utility liên quan đến ProductSection.
 *
 * Cách dùng trong service:
 *   productSection.mapToSection(res, "Tên Section", { categorySlug: "gaming" })
 */
export const productSection = {
    /**
     * Chuyển ApiResponse<ProductItem[]> thành ApiResponse<ProductSectionData>.
     * @param res     - kết quả trả về từ repo
     * @param name    - tên hiển thị của section
     * @param filter  - bộ lọc tương ứng dùng để điều hướng "Xem tất cả"
     */
    mapToSection(
        res: ApiResponse<ProductItem[]>,
        name: string,
        filter: RecommendedProductRequest = {}
    ): ApiResponse<ProductSectionData> {
        return {
            ...res,
            data: res.data
                ? { sectionName: name, items: res.data, filter }
                : undefined,
        };
    },
};