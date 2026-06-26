import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { USE_MOCK } from "../../../../../core/config/useMock.config";
import { CategorySlug } from "../../../../../models/type/categorySlug.type";
import { ProductTypeSlug } from "../../../../../models/type/productSlug.type";
import type { FilterState } from "../dto/filterState.dto";
import type { ListProductRequest } from "../dto/productRequest.dto";
import type { FilterModel } from "../model/filter.model";
import type { ProductItem } from "../model/product.model";
import type { ProductDetail } from "../model/productDetail.model";
import { productSection, type ProductSectionData } from "../model/productSection.model";
import type { ProductRepo } from "../repo/product.repo";
import { ProductApiRepo } from "../repo/productApi.repo";
import { ProductMockRepo } from "../repo/productMock.repo";

const LIMIT_DEFAULT = 10;
const PAGE_SIZE = 20;

export class ProductService {
    private readonly productRepo: ProductRepo;
    constructor(productRepo?: ProductRepo) {
        this.productRepo = productRepo ?? new ProductApiRepo();
    }

    async getProduct(currentPage: number, filterState: FilterState): Promise<ApiResponse<ProductItem[]>> {
        const request: ListProductRequest = {
            page: currentPage,
            pageSize: PAGE_SIZE,
            filter: filterState
        };
        return this.productRepo.getProducts(request);
    }

    async getFilter(): Promise<ApiResponse<FilterModel>> {
        return this.productRepo.getFilter();
    }

    async getProductBySlug(productSlug: string): Promise<ApiResponse<ProductDetail>> {
        return this.productRepo.getProductBySlug(productSlug);
    }

    async getRelatedProducts(productIds: number[]): Promise<ApiResponse<ProductItem[]>> {
        return this.productRepo.getRelatedProducts(productIds, LIMIT_DEFAULT);
    }

    /**
     * 1. Lấy sản phẩm mới cập bến
     */
    async getNewestProducts(): Promise<ApiResponse<ProductSectionData>> {
        const res = await this.productRepo.getNewestProducts(LIMIT_DEFAULT);
        return productSection.mapToSection(res, "Hàng Mới Cập Bến", { limit: LIMIT_DEFAULT });
    }

    /**
     * 2. Lấy sản phẩm bán chạy/phổ biến
     */
    async getPopularProducts(): Promise<ApiResponse<ProductSectionData>> {
        const res = await this.productRepo.getPopularProducts(LIMIT_DEFAULT);
        return productSection.mapToSection(res, "Sản Phẩm Bán Chạy", { limit: LIMIT_DEFAULT });
    }

    /**
     * 3. Lấy sản phẩm thuộc categories gaming
     */
    async getGamingProducts(): Promise<ApiResponse<ProductSectionData>> {
        const filter = { categorySlug: CategorySlug.GAMING, limit: LIMIT_DEFAULT };
        const res = await this.productRepo.getRecommendedProducts(filter);
        return productSection.mapToSection(res, "Góc Gaming", filter);
    }

    /**
     * 4. Lấy sản phẩm thuộc categories văn phòng
     */
    async getOfficeProducts(): Promise<ApiResponse<ProductSectionData>> {
        const filter = { categorySlug: CategorySlug.VAN_PHONG, limit: LIMIT_DEFAULT };
        const res = await this.productRepo.getRecommendedProducts(filter);
        return productSection.mapToSection(res, "Góc Văn Phòng", filter);
    }

    /**
     * 5. Lấy các sản phẩm của thương hiệu nổi bật
     */
    async getProductsByHotBrand(): Promise<ApiResponse<ProductSectionData>> {
        const res = await this.productRepo.getProductsByHotBrand(LIMIT_DEFAULT);
        return productSection.mapToSection(res, "Thương Hiệu Nổi Bật", { limit: LIMIT_DEFAULT });
    }

    /**
     * 6. Lấy các sản phẩm không phải bàn phím (có thể là phụ kiện, keycap, switch...)
     */
    async getProductExcludedKeyboard(): Promise<ApiResponse<ProductSectionData>> {
        const filter = { excludeTypes: [ProductTypeSlug.KEYBOARD], limit: LIMIT_DEFAULT };
        const res = await this.productRepo.getRecommendedProducts(filter);
        return productSection.mapToSection(res, "Phụ Kiện & Khác", filter);
    }

    /**
     * 7. Lấy sản phẩm có giá dưới 1 triệu
     */
    async getCheapestProducts(): Promise<ApiResponse<ProductSectionData>> {
        const filter = { priceMax: 1000000, limit: LIMIT_DEFAULT };
        const res = await this.productRepo.getRecommendedProducts(filter);
        return productSection.mapToSection(res, "Giá Hạt Dẻ (Dưới 1 Triệu)", filter);
    }

    /**
     * 8. Lấy sản phẩm cao cấp (từ 10 triệu trở lên)
     */
    async getExpensiveProducts(): Promise<ApiResponse<ProductSectionData>> {
        const filter = { priceMin: 10000000, limit: LIMIT_DEFAULT };
        const res = await this.productRepo.getRecommendedProducts(filter);
        return productSection.mapToSection(res, "Hàng Cao Cấp", filter);
    }
}

export const productService = new ProductService(USE_MOCK ? new ProductMockRepo() : new ProductApiRepo());