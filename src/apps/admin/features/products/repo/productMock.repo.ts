import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { CreateProductRequest } from "../models/create-product.request";
import type { AdminProductDetail, AdminProductItem } from "../models/product.model";
import type { UpdateProductRequest } from "../models/update-product.request";
import type { ProductRepo } from "./product.repo";

const mockCategory = { id: 1, name: "Bàn phím cơ", slug: "ban-phim-co" };
const mockType = { id: 1, name: "Fullsize", slug: "fullsize" };
const mockBrand = { id: 1, name: "Akko", slug: "akko" };

const mockProductList: AdminProductItem[] = [
    {
        id: 1,
        name: "Bàn phím cơ custom Akko 3068B Plus",
        imageUrl: "https://product.hstatic.net/200000889805/product/ooth-5-0-wireless-2-4ghz-hotswap-foam-tieu-am-akko-cs-jelly-pink-5pkuf_5b9c81513a474a26b6fc8b26f99ffe61_master.jpg",
        type: { id: 1, name: "Bàn phím cơ", slug: "ban-phim-co" },
        category: { id: 1, name: "Bàn phím cơ", slug: "ban-phim-co" },
        brand: { id: 1, name: "Akko", slug: "akko" },
        rating: 4.5,
        minPrice: 1500000,
        slug: "ban-phim-co-custom-akko-3068b-plus",
        totalStockQuantity: 10
    },
    {
        id: 2,
        name: "Bàn phím kèm chuột tai mèo Mimi Plus",
        imageUrl: "https://bizweb.dktcdn.net/thumb/1024x1024/100/450/808/products/09d25459-d55c-49b6-946e-b7936f95d107.jpg?v=1675152844267",
        type: { id: 2, name: "Keycap set", slug: "keycap-set" },
        category: { id: 2, name: "Keycap", slug: "keycap" },
        brand: { id: 2, name: "Logitech", slug: "logitech" },
        rating: 5,
        minPrice: 3000000,
        slug: "ban-phim-kem-chuot-tai-meo-mimi-plus",
        totalStockQuantity: 10
    }
];

export class ProductMockRepo implements ProductRepo {
    async getProducts(page: number, limit: number = 10, search?: string): Promise<ApiResponse<AdminProductItem[]>> {
        let filtered = mockProductList;
        if (search) {
            filtered = mockProductList.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        }
        return {
            success: true,
            message: "Success",
            data: filtered,
            pagination: {
                page,
                pageSize: limit,
                totalItems: 2,
                totalPages: 1
            }
        };
    }

    async getProductById(id: number): Promise<ApiResponse<AdminProductDetail>> {
        const item = mockProductList.find(p => p.id === id) || mockProductList[0];
        return {
            success: true,
            message: "Success",
            data: {
                ...item,
                description: "Mô tả chi tiết sản phẩm...",
                thumbnailUrl: [item.imageUrl],
                maxPrice: item.minPrice + 500000,
                options: [
                    {
                        name: "Màu sắc",
                        values: ["Đỏ"],
                    },
                    {
                        name: 'Switch',
                        values: ['Cherry Red'],
                    }
                ],
                variants: [
                    {
                        id: 1,
                        sku: 'AKKO-3068B-RED-BLK',
                        attributes: { "Màu sắc": "Đỏ", "Switch": "Cherry Red" },
                        price: 1500000,
                        originalPrice: 2000000,
                        percentDiscount: 25,
                        stockQuantity: 10
                    }
                ],
                specifications: [{ name: "Switch", value: "Cherry Red" }],
                rating: 4.5
            }
        };
    }

    async createProduct(request: CreateProductRequest): Promise<ApiResponse<AdminProductDetail>> {
        return {
            success: true,
            message: "Created",
            data: {
                id: 999,
                ...request, category: mockCategory, type: mockType, brand: mockBrand, rating: 0, minPrice: request.minPrice ?? 0, maxPrice: request.maxPrice ?? 0, slug: request.slug || "mock-slug", options: request.options || [], variants: request.variants || []
            }
        };
    }

    async updateProduct(request: UpdateProductRequest): Promise<ApiResponse<AdminProductDetail>> {
        return this.getProductById(request.id);
    }

    async deleteProduct(_id: number): Promise<ApiResponse<null>> {
        return { success: true, message: "Deleted", data: null };
    }
}
