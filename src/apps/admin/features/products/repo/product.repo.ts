import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { CreateProductRequest } from "../models/create-product.request";
import type { AdminProductDetail, AdminProductItem } from "../models/product.model";
import type { UpdateProductRequest } from "../models/update-product.request";

export interface ProductRepo {
    getProducts(page: number, limit?: number, search?: string): Promise<ApiResponse<AdminProductItem[]>>;
    getProductById(id: number): Promise<ApiResponse<AdminProductDetail>>;
    createProduct(request: CreateProductRequest): Promise<ApiResponse<AdminProductDetail>>;
    updateProduct(request: UpdateProductRequest): Promise<ApiResponse<AdminProductDetail>>;
    deleteProduct(id: number): Promise<ApiResponse<null>>;
}
