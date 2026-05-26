import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { USE_MOCK } from "../../../../../core/config/useMock.config";
import { CategorySlug } from "../../../../../models/type/categorySlug.type";
import { ProductTypeSlug } from "../../../../../models/type/productSlug.type";
import type { ListProductRequest } from "../dto/productRequest.dto";
import type { ProductItem } from "../model/product.model";
import type { ProductRepo } from "../repo/product.repo";
import { ProductApiRepo } from "../repo/productApi.repo";
import { ProductMockRepo } from "../repo/productMock.repo";

const LIMIT_DEFAULT = 10;

export class ProductService {
    private readonly productRepo: ProductRepo;
    constructor(productRepo?: ProductRepo) {
        this.productRepo = productRepo ?? new ProductApiRepo();
    }

    async getProduct(request: ListProductRequest): Promise<ApiResponse<ProductItem[]>> {
        return this.productRepo.getProducts(request);
    }

    /**
     * 1. Lấy sản phẩm mới cập bến
     */
    async getNewestProducts(): Promise<ApiResponse<ProductItem[]>> {
        return this.productRepo.getNewestProducts(LIMIT_DEFAULT);
    }

    /**
     * 2. Lấy sản phẩm bán chạy/phổ biến
     */
    async getPopularProducts(): Promise<ApiResponse<ProductItem[]>> {
        return this.productRepo.getPopularProducts(LIMIT_DEFAULT);
    }

    /**
     * 3. Lấy sản phẩm thuộc categories gamming
     */
    async getGamingProducts(): Promise<ApiResponse<ProductItem[]>> {
        return this.productRepo.getRecommendedProducts({ categorySlug: CategorySlug.GAMING, limit: LIMIT_DEFAULT });
    }

    /**
     * 4. Lấy sản phẩm thuộc categories văn phòng
     */
    async getOfficeProducts(): Promise<ApiResponse<ProductItem[]>> {
        return this.productRepo.getRecommendedProducts({ categorySlug: CategorySlug.VAN_PHONG, limit: LIMIT_DEFAULT });
    }

    /**
     * 5. Lấy các sản phẩm của thương hiệu nổi bật
     */
    async getProductsByHotBrand(): Promise<ApiResponse<ProductItem[]>> {
        return this.productRepo.getProductsByHotBrand(LIMIT_DEFAULT);
    }

    /**
     * 6. Lấy các sản phẩm không phải bàn phím (có thể là phụ kiện, keycap, switch...)
     */
    async getProductExcludedKeyboard(): Promise<ApiResponse<ProductItem[]>> {
        return this.productRepo.getRecommendedProducts({ excludeTypes: [ProductTypeSlug.KEYBOARD], limit: LIMIT_DEFAULT });
    }

    /**
     * 7. Lấy sản phẩm có giá dưới 1 triệu
     */
    async getCheapestProducts(): Promise<ApiResponse<ProductItem[]>> {
        return this.productRepo.getRecommendedProducts({ priceMax: 1000000, limit: LIMIT_DEFAULT });
    }

    /**
     * 8. Lấy sản phẩm cao cấp (từ 10 triệu trở lên)
     */
    async getExpensiveProducts(): Promise<ApiResponse<ProductItem[]>> {
        return this.productRepo.getRecommendedProducts({ priceMin: 10000000, limit: LIMIT_DEFAULT });
    }
}

export const productService = new ProductService(USE_MOCK ? new ProductMockRepo() : new ProductApiRepo());