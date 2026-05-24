import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { ListProductRequest } from "../dto/productRequest.dto";
import type { ProductItem } from "../model/product.model";
import type { ProductRepo } from "./product.repo";

export class ProductApiRepo implements ProductRepo {
    /**
     * GET /products
     * @param ListProductRequest
     * @returns ProductItem[] có phân trang (pagination) trong ApiResponse
     */
    async getProducts(request: ListProductRequest): Promise<ApiResponse<ProductItem[]>> {
        return apiClient.get<ApiResponse<ProductItem[]>>("/products", {
            params: request
        });
    }
}