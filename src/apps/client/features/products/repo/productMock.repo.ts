import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { ListProductRequest } from "../dto/productRequest.dto";
import type { ProductItem } from "../model/product.model";
import type { ProductRepo } from "./product.repo";

export class ProductMockRepo implements ProductRepo {
    //Mock products data
    private mockProducts: ProductItem[] = [
        {
            id: "1",
            name: "Bàn phím cơ custom Akko 3068B Plus",
            imageUrl: "https://images.unsplash.com/photo-1587829741301-dc7968b71495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            categoryName: ["1"],
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
            categoryName: ["1"],
            price: 1800000,
            originalPrice: 1800000,
            percentDiscount: 0,
            isFavorite: false,
            slug: "ban-phim-co-custom-akko-3084b-plus",
        },
        {
            id: "3",
            name: "Bàn phím cơ custom Akko 3098B Plus",
            imageUrl: "https://images.unsplash.com/photo-1587829741301-dc7968b71495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            categoryName: ["1"],
            price: 2000000,
            originalPrice: 2000000,
            percentDiscount: 0,
            isFavorite: false,
            slug: "ban-phim-co-custom-akko-3098b-plus",
        },
        {
            id: "4",
            name: "Bàn phím cơ custom Akko 3108B Plus",
            imageUrl: "https://images.unsplash.com/photo-1587829741301-dc7968b71495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            categoryName: ["1"],
            price: 2200000,
            originalPrice: 2200000,
            percentDiscount: 0,
            isFavorite: false,
            slug: "ban-phim-co-custom-akko-3108b-plus",
        },
    ];

    async getProducts(request: ListProductRequest): Promise<ApiResponse<ProductItem[]>> {
        let response: ApiResponse<ProductItem[]> = {
            success: true,
            message: "Lấy danh sách sản phẩm thành công",
            data: this.mockProducts,
            pagination: {
                page: request.page,
                pageSize: request.pageSize,
                totalItems: this.mockProducts.length,
                totalPages: Math.ceil(this.mockProducts.length / request.pageSize),
            }
        };
        return response;
    }
}