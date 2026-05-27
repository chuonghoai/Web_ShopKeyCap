import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { ListProductRequest } from "../dto/productRequest.dto";
import type { RecommendedProductRequest } from "../dto/recommendedProductRequest.dto";
import type { FilterModel } from "../model/filter.model";
import type { ProductItem } from "../model/product.model";
import type { ProductRepo } from "./product.repo";

export class ProductMockRepo implements ProductRepo {
    //Mock products data
    private mockProducts: ProductItem[] = [
        {
            id: "1",
            name: "Bàn phím cơ custom Akko 3068B Plus Bàn phím cơ custom Akko 3068B PlusBàn phím cơ custom Akko 3068B PlusBàn phím cơ custom Akko 3068B Plus",
            imageUrl: "https://product.hstatic.net/200000889805/product/ooth-5-0-wireless-2-4ghz-hotswap-foam-tieu-am-akko-cs-jelly-pink-5pkuf_5b9c81513a474a26b6fc8b26f99ffe61_master.jpg",
            typeName: "Bàn phím",
            price: 1200000,
            originalPrice: 1500000,
            percentDiscount: 0,
            isFavorite: true,
            slug: "ban-phim-co-custom-akko-3068b-plus",
        },
        {
            id: "2",
            name: "Bàn phím kèm chuột tai mèo Mimi Plus",
            imageUrl: "https://bizweb.dktcdn.net/thumb/1024x1024/100/450/808/products/09d25459-d55c-49b6-946e-b7936f95d107.jpg?v=1675152844267",
            typeName: "Bàn phím",
            price: 180000,
            originalPrice: 180000,
            percentDiscount: 0,
            isFavorite: false,
            slug: "ban-phim-kem-chuot-tai-meo-mimi-plus",
        },
        {
            id: "3",
            name: "Combo lót chuột kèm kê tay Mezy Mouse",
            imageUrl: "https://bizweb.dktcdn.net/100/450/808/products/d726d464-2f14-4b16-be63-cfd528b27bec.jpg?v=1677662229473",
            typeName: "Bàn phím",
            price: 200000,
            originalPrice: 200000,
            percentDiscount: 0,
            isFavorite: true,
            slug: "combo-lot-chuot-kem-ke-tay-mezy-mouse",
        },
        {
            id: "4",
            name: "Bàn phím cơ Yunzii C98 siêu cute tiếng êm",
            imageUrl: "https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/7-1775644073454.png?v=1775644115560",
            typeName: "Bàn phím",
            price: 2200000,
            originalPrice: 2200000,
            percentDiscount: 0,
            isFavorite: false,
            slug: "ban-phim-co-yunzii-c98-sieu-cute-tieng-em",
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

    async getFilter(): Promise<ApiResponse<FilterModel>> {
        let data: FilterModel = {
            category: [
                { id: "1", name: "Gaming", slug: "gaming" },
                { id: "2", name: "Văn phòng", slug: "van-phong" }
            ],
            type: [
                { id: "1", name: "Bàn phím", slug: "ban-phim" },
                { id: "2", name: "Switch", slug: "switch" },
                { id: "3", name: "Keycap", slug: "keycap" },
                { id: "4", name: "Phụ kiện", slug: "phu-kien" }
            ],
            brand: [
                { id: "1", name: "Akko", slug: "akko" },
                { id: "2", name: "Lofree", slug: "lofree" },
                { id: "3", name: "Wired", slug: "wired" }
            ],
        };
        return {
            success: true,
            message: "Lấy danh sách lọc thành công",
            data,
        };
    }
}
