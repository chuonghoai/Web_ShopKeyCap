import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { ListProductRequest } from "../dto/productRequest.dto";
import type { RecommendedProductRequest } from "../dto/recommendedProductRequest.dto";
import type { FilterModel } from "../model/filter.model";
import type { ProductItem } from "../model/product.model";
import type { ProductDetail } from "../model/productDetail.model";
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

    private mockProductDetail: ProductDetail = {
        id: "1",
        name: "Bàn phím cơ custom Akko 3068B Plus Bàn phím cơ custom Akko 3068B PlusBàn phím cơ custom Akko 3068B PlusBàn phím cơ custom Akko 3068B Plus",
        slug: "ban-phim-co-custom-akko-3068b-plus",
        category: {
            id: "1",
            name: "Gaming",
            slug: "gaming",
        },
        type: {
            id: "1",
            name: "Bàn phím",
            slug: "ban-phim",
        },
        brand: {
            id: "1",
            name: "Akko",
            slug: "akko",
        },
        imageUrl: "https://product.hstatic.net/200000889805/product/ooth-5-0-wireless-2-4ghz-hotswap-foam-tieu-am-akko-cs-jelly-pink-5pkuf_5b9c81513a474a26b6fc8b26f99ffe61_master.jpg",
        thumbnailUrl: ["https://product.hstatic.net/200000889805/product/ooth-5-0-wireless-2-4ghz-hotswap-foam-tieu-am-akko-cs-jelly-pink-5pkuf_5b9c81513a474a26b6fc8b26f99ffe61_master.jpg"],
        options: [
            {
                name: "Kích thước",
                values: [
                    "Nhỏ", "Vừa", "Lớn"
                ]
            },
            {
                name: "Màu sắc",
                values: ["Đỏ", "Cam", "Vàng", "Xanh Lá", "Xanh Dương", "Tím"]
            }
        ],
        variants: [
            // Kích thước: Nhỏ
            {
                id: "v-1",
                sku: "AKKO-3068-NHO-DO",
                attributes: { "Kích thước": "Nhỏ", "Màu sắc": "Đỏ" },
                price: 1100000,
                originalPrice: 1400000,
                percentDiscount: 21,
                stockQuantity: 15,
            },
            {
                id: "v-2",
                sku: "AKKO-3068-NHO-CAM",
                attributes: { "Kích thước": "Nhỏ", "Màu sắc": "Cam" },
                price: 1100000,
                originalPrice: 1400000,
                percentDiscount: 21,
                stockQuantity: 10,
            },
            {
                id: "v-3",
                sku: "AKKO-3068-NHO-VANG",
                attributes: { "Kích thước": "Nhỏ", "Màu sắc": "Vàng" },
                price: 1100000,
                originalPrice: 1400000,
                percentDiscount: 21,
                stockQuantity: 8,
            },
            {
                id: "v-4",
                sku: "AKKO-3068-NHO-XANHLA",
                attributes: { "Kích thước": "Nhỏ", "Màu sắc": "Xanh Lá" },
                price: 1100000,
                originalPrice: 1400000,
                percentDiscount: 21,
                stockQuantity: 12,
            },
            {
                id: "v-5",
                sku: "AKKO-3068-NHO-XANHDUONG",
                attributes: { "Kích thước": "Nhỏ", "Màu sắc": "Xanh Dương" },
                price: 1100000,
                originalPrice: 1400000,
                percentDiscount: 21,
                stockQuantity: 20,
            },
            {
                id: "v-6",
                sku: "AKKO-3068-NHO-TIM",
                attributes: { "Kích thước": "Nhỏ", "Màu sắc": "Tím" },
                price: 1100000,
                originalPrice: 1400000,
                percentDiscount: 21,
                stockQuantity: 5,
            },
            // Kích thước: Vừa
            {
                id: "v-7",
                sku: "AKKO-3068-VUA-DO",
                attributes: { "Kích thước": "Vừa", "Màu sắc": "Đỏ" },
                price: 1200000,
                originalPrice: 1500000,
                percentDiscount: 20,
                stockQuantity: 18,
            },
            {
                id: "v-8",
                sku: "AKKO-3068-VUA-CAM",
                attributes: { "Kích thước": "Vừa", "Màu sắc": "Cam" },
                price: 1200000,
                originalPrice: 1500000,
                percentDiscount: 20,
                stockQuantity: 14,
            },
            {
                id: "v-9",
                sku: "AKKO-3068-VUA-VANG",
                attributes: { "Kích thước": "Vừa", "Màu sắc": "Vàng" },
                price: 1200000,
                originalPrice: 1500000,
                percentDiscount: 20,
                stockQuantity: 9,
            },
            {
                id: "v-10",
                sku: "AKKO-3068-VUA-XANHLA",
                attributes: { "Kích thước": "Vừa", "Màu sắc": "Xanh Lá" },
                price: 1200000,
                originalPrice: 1500000,
                percentDiscount: 20,
                stockQuantity: 22,
            },
            {
                id: "v-11",
                sku: "AKKO-3068-VUA-XANHDUONG",
                attributes: { "Kích thước": "Vừa", "Màu sắc": "Xanh Dương" },
                price: 1200000,
                originalPrice: 1500000,
                percentDiscount: 20,
                stockQuantity: 30,
            },
            {
                id: "v-12",
                sku: "AKKO-3068-VUA-TIM",
                attributes: { "Kích thước": "Vừa", "Màu sắc": "Tím" },
                price: 1200000,
                originalPrice: 1500000,
                percentDiscount: 20,
                stockQuantity: 7,
            },
            // Kích thước: Lớn
            {
                id: "v-13",
                sku: "AKKO-3068-LON-DO",
                attributes: { "Kích thước": "Lớn", "Màu sắc": "Đỏ" },
                price: 1350000,
                originalPrice: 1600000,
                percentDiscount: 16,
                stockQuantity: 11,
            },
            {
                id: "v-14",
                sku: "AKKO-3068-LON-CAM",
                attributes: { "Kích thước": "Lớn", "Màu sắc": "Cam" },
                price: 1350000,
                originalPrice: 1600000,
                percentDiscount: 16,
                stockQuantity: 6,
            },
            {
                id: "v-15",
                sku: "AKKO-3068-LON-VANG",
                attributes: { "Kích thước": "Lớn", "Màu sắc": "Vàng" },
                price: 1350000,
                originalPrice: 1600000,
                percentDiscount: 16,
                stockQuantity: 4,
            },
            {
                id: "v-16",
                sku: "AKKO-3068-LON-XANHLA",
                attributes: { "Kích thước": "Lớn", "Màu sắc": "Xanh Lá" },
                price: 1350000,
                originalPrice: 1600000,
                percentDiscount: 16,
                stockQuantity: 17,
            },
            {
                id: "v-17",
                sku: "AKKO-3068-LON-XANHDUONG",
                attributes: { "Kích thước": "Lớn", "Màu sắc": "Xanh Dương" },
                price: 1350000,
                originalPrice: 1600000,
                percentDiscount: 16,
                stockQuantity: 25,
            },
            {
                id: "v-18",
                sku: "AKKO-3068-LON-TIM",
                attributes: { "Kích thước": "Lớn", "Màu sắc": "Tím" },
                price: 1350000,
                originalPrice: 1600000,
                percentDiscount: 16,
                stockQuantity: 3,
            },
        ],
        totalStockQuantity: 10,
        isFavorite: true,
        description: "Mô tả sản phẩm",
        specifications: [
            {
                name: "Kích thước",
                value: "15cm x 15cm x 5cm",
            },
        ],
        rating: 4.5,
        relateTo: [
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
        ],
    };

    async getProducts(request: ListProductRequest): Promise<ApiResponse<ProductItem[]>> {
        const mockProducts50 = Array.from({ length: request.pageSize }, (_, index) => {
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


    async getProductBySlug(productSlug: string): Promise<ApiResponse<ProductDetail>> {
        let response: ProductDetail = { ...this.mockProductDetail, slug: productSlug };
        return {
            success: true,
            message: "Lấy thông tin sản phẩm thành công",
            data: response,
        }
    }
}
