import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { CreateProductRequest } from "../models/create-product.request";
import type { AdminProductDetail, AdminProductItem } from "../models/product.model";
import type { UpdateProductRequest } from "../models/update-product.request";
import type { ProductRepo } from "./product.repo";

const ADMIN_PRODUCTS_ENDPOINT = "/admin/products";

export class ProductApiRepo implements ProductRepo {
    /**
     * GET /admin/products
     * @param: page, limit
     * @returns: AdminProductItem
     * 
     * Mô tả: Lấy danh sách sản phẩm có phân trang
     *  + page: trang hiện tại
     *  + limit: số lượng item muốn lấy
     */
    getProducts(page: number, limit: number = 20, search?: string): Promise<ApiResponse<AdminProductItem[]>> {
        return apiClient.get<ApiResponse<AdminProductItem[]>>(ADMIN_PRODUCTS_ENDPOINT, { params: { page, limit, search } });
    }

    /**
     * GET /admin/products/:id
     * @param id: id của sản phẩm
     * @returns: AdminProductDetail
     * 
     * Mô tả: Lấy thông tin chi tiết sản phẩm
     */
    getProductById(id: number): Promise<ApiResponse<AdminProductDetail>> {
        return apiClient.get<ApiResponse<AdminProductDetail>>(`${ADMIN_PRODUCTS_ENDPOINT}/${id}`);
    }

    /**
     * POST /admin/products
     * @body request: CreateProductRequest
     * @returns: AdminProductDetail
     * 
     * Mô tả: 
     *  - Tạo sản phẩm mới
     *  - backend cần có logic tự tạo mã SKU cho từng biến thể variant
     *  - Field variants đã có đủ biến thể, backend chỉ cần đọc và lưu vào DB, không cần logic tính tổ hợp biến thể sản phẩm
     */
    createProduct(request: CreateProductRequest): Promise<ApiResponse<AdminProductDetail>> {
        return apiClient.post<ApiResponse<AdminProductDetail>>(ADMIN_PRODUCTS_ENDPOINT, request);
    }

    /**
     * PUT /admin/products/:id
     * @body request: UpdateProductRequest
     * @returns: AdminProductDetail
     * 
     * Mô tả: Cập nhật sản phẩm - Tương tự tạo sản phẩm
     */
    updateProduct(request: UpdateProductRequest): Promise<ApiResponse<AdminProductDetail>> {
        return apiClient.put<ApiResponse<AdminProductDetail>>(`${ADMIN_PRODUCTS_ENDPOINT}/${request.id}`, request);
    }

    /**
     * DELETE /admin/products/:id
     * @param id: id của sản phẩm
     * @returns: null
     * 
     * Mô tả:
     *  - Xóa sản phẩm
     *  - Xóa này là xóa luôn sản phẩm và các biến thể của nó, không phải chỉ xóa riêng mỗi variant
     */
    deleteProduct(id: number): Promise<ApiResponse<null>> {
        return apiClient.delete<ApiResponse<null>>(`${ADMIN_PRODUCTS_ENDPOINT}/${id}`);
    }
}
