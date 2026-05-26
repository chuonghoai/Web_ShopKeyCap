import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { ListProductRequest } from "../dto/productRequest.dto";
import type { ProductItem } from "../model/product.model";
import type { ProductRepo } from "./product.repo";

export class ProductApiRepo implements ProductRepo {
    /**
     * GET /products
     * @query ListProductRequest (query gửi đi được làm phẳng, 
     *      không có cấu trúc lồng nhau như filterState trong ListProductRequest)
     * @returns ProductItem[] có phân trang (pagination) trong ApiResponse
     */
    async getProducts(request: ListProductRequest): Promise<ApiResponse<ProductItem[]>> {
        const { page, pageSize, filter } = request;

        const queryParams = {
            page,
            pageSize,
            ...filter
        };

        return apiClient.get<ApiResponse<ProductItem[]>>("/products", {
            params: queryParams
        });
    }
}