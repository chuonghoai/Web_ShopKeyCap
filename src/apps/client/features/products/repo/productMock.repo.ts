import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { ListProductRequest } from "../dto/productRequest.dto";
import type { RecommendedProductRequest } from "../dto/recommendedProductRequest.dto";
import type { ProductItem } from "../model/product.model";
import type { ProductRepo } from "./product.repo";

export class ProductMockRepo implements ProductRepo {
    //Mock products data
    private mockProducts: ProductItem[] = [
        {
            id: "1",
            name: "Bàn phím cơ custom Akko 3068B Plus",
            imageUrl: "https://images.unsplash.com/photo-1587829741301-dc7968b71495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            price: 1500000,
            originalPrice: 1500000,
            percentDiscount: 0,
            isFavorite: false,
            slug: "ban-phim-co-custom-akko-3068b-plus",
        },
        {
            id: "2",
            name: "Bàn phím cơ custom Akko 3084B Plus",
            imageUrl: "https://images.unsplash.com/photo-1587829741301-dc7968b71495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            price: 180000,
            originalPrice: 180000,
            percentDiscount: 0,
            isFavorite: false,
            slug: "ban-phim-co-custom-akko-3084b-plus",
        },
        {
            id: "3",
            name: "Bàn phím cơ custom Akko 3098B Plus",
            imageUrl: "https://images.unsplash.com/photo-1587829741301-dc7968b71495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            price: 200000,
            originalPrice: 200000,
            percentDiscount: 0,
            isFavorite: false,
            slug: "ban-phim-co-custom-akko-3098b-plus",
        },
        {
            id: "4",
            name: "Bàn phím cơ custom Akko 3108B Plus",
            imageUrl: "https://images.unsplash.com/photo-1587829741301-dc7968b71495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            price: 2200000,
            originalPrice: 2200000,
            percentDiscount: 0,
            isFavorite: false,
            slug: "ban-phim-co-custom-akko-3108b-plus",
        },
    ];

    async getProducts(request: ListProductRequest): Promise<ApiResponse<ProductItem[]>> {
        const mockProducts50 = Array.from({ length: 50 }, (_, index) => {
            const originalItem = this.mockProducts[index % this.mockProducts.length];
            return {
                ...originalItem,
                id: (index + 1).toString(),
            };
        });
        let response: ApiResponse<ProductItem[]> = {
            success: true,
            message: "Lấy danh sách sản phẩm thành công",
            data: mockProducts50,
            pagination: {
                page: request.page,
                pageSize: request.pageSize,
                totalItems: 7350,
                totalPages: 147,
            }
        };
        return response;
    }

    /**
     * Nhân bản mockProducts thành mảng có đúng `limit` phần tử,
     * mỗi phần tử có id tuần tự để tránh trùng key khi render.
     */
    private _expand(limit: number): ProductItem[] {
        return Array.from({ length: limit }, (_, i) => ({
            ...this.mockProducts[i % this.mockProducts.length],
            id: (i + 1).toString(),
        }));
    }

    /**
     * Lấy sản phẩm mới cập bến – mock trả về `limit` sản phẩm
     */
    async getNewestProducts(limit: number): Promise<ApiResponse<ProductItem[]>> {
        return {
            success: true,
            message: "Lấy sản phẩm mới thành công",
            data: this._expand(limit),
        };
    }

    /**
     * Lấy sản phẩm bán chạy / phổ biến – mock trả về `limit` sản phẩm
     */
    async getPopularProducts(limit: number): Promise<ApiResponse<ProductItem[]>> {
        return {
            success: true,
            message: "Lấy sản phẩm phổ biến thành công",
            data: this._expand(limit),
        };
    }

    /**
     * Lấy sản phẩm từ thương hiệu nổi bật – mock trả về `limit` sản phẩm
     */
    async getProductsByHotBrand(limit: number): Promise<ApiResponse<ProductItem[]>> {
        return {
            success: true,
            message: "Lấy sản phẩm thương hiệu nổi bật thành công",
            data: this._expand(limit),
        };
    }

    /**
     * Lấy sản phẩm gợi ý theo tiêu chí lọc – mock trả về đúng `limit` sản phẩm
     * (có lọc thêm priceMin / priceMax nếu được truyền vào)
     */
    async getRecommendedProducts(request: RecommendedProductRequest): Promise<ApiResponse<ProductItem[]>> {
        const limit = request.limit ?? this.mockProducts.length;
        let data = this._expand(limit);

        // Áp dụng lọc giá để mock gần giống thực tế
        if (request.priceMin !== undefined) {
            data = data.filter(p => p.price >= request.priceMin!);
        }
        if (request.priceMax !== undefined) {
            data = data.filter(p => p.price <= request.priceMax!);
        }

        return {
            success: true,
            message: "Lấy sản phẩm gợi ý thành công",
            data,
        };
    }
}
