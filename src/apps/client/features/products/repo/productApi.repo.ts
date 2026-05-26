import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { ListProductRequest } from "../dto/productRequest.dto";
import type { RecommendedProductRequest } from "../dto/recommendedProductRequest.dto";
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

    /**
     * GET /products/newest
     * @param limit 
     * @returns ProductItem[]
     * 
     * Mô tả: Lấy các sản phẩm mới được cập nhật gần đây (10 ngày -> 1 tháng)
     */
    async getNewestProducts(limit: number): Promise<ApiResponse<ProductItem[]>> {
        return apiClient.get<ApiResponse<ProductItem[]>>("/products/newest", {
            params: limit
        });
    }

    /**
     * GET /products/popular
     * @param limit 
     * @returns ProductItem[]
     * 
     * Mô tả: Lấy các sản phẩm bán chạy, được nhiều người quan tâm nhất trong 1 tháng gần nhất
     */
    async getPopularProducts(limit: number): Promise<ApiResponse<ProductItem[]>> {
        return apiClient.get<ApiResponse<ProductItem[]>>("/products/popular", {
            params: limit
        });
    }

    /**
     * GET /products/hot-brand
     * @param limit 
     * @returns ProductItem[]
     * 
     * Mô tả: Lấy danh sách các sản phẩm từ các thương hiệu có số lượng sản phẩm bán chạy nhất
     */
    async getProductsByHotBrand(limit: number): Promise<ApiResponse<ProductItem[]>> {
        return apiClient.get<ApiResponse<ProductItem[]>>("/products/hot-brand", {
            params: limit
        });
    }

    /**
     * GET /products/recommended
     * @param request: RecommendedProductRequest
     * @returns ProductItem[]
     * 
     * Mô tả: Lấy các sản phẩm gợi ý dựa trên các tiêu chí
     *  - categorySlug: Danh mục sản phẩm (gaming, van-phong...)
     *  - typeSlug: Loại sản phẩm (ban-phim, switch...)
     *  - brandSlugs: Thương hiệu sản phẩm (Evoworks, Lofree, Piifox...)
     *  - inStock: Chỉ lấy sản phẩm còn hàng
     *  - priceMin: Giá tối thiểu
     *  - priceMax: Giá tối đa
     *  - excludeTypes: Loại trừ loại sản phẩm sản phẩm (Ví dụ: Lấy danh sách phụ kiện (ko phải bàn phím))
     *  - limit: Số lượng sản phẩm muốn lấy
     * 
     * LƯU Ý:
     *  - Trong database, cột slug của 2 bảng category và type:
     *      + Bảng category: Cần có ít nhất 2 record "gaming" và "van-phong"
     *      + Bảng type: Cần có ít nhất 1 record "ban-phim"
     *  - Vì trong service có truyền 3 giá trị đó cho backend để lọc sản phẩm đề xuất
     */
    async getRecommendedProducts(request: RecommendedProductRequest): Promise<ApiResponse<ProductItem[]>> {
        return apiClient.get<ApiResponse<ProductItem[]>>("/products/recommended", {
            params: request
        });
    }
}