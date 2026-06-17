import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { ListProductRequest } from "../dto/productRequest.dto";
import type { RecommendedProductRequest } from "../dto/recommendedProductRequest.dto";
import type { FilterModel } from "../model/filter.model";
import type { ProductItem } from "../model/product.model";
import type { ProductDetail } from "../model/productDetail.model";

export interface ProductRepo {
    getProducts(request: ListProductRequest): Promise<ApiResponse<ProductItem[]>>;

    getNewestProducts(limit: number): Promise<ApiResponse<ProductItem[]>>;
    getPopularProducts(limit: number): Promise<ApiResponse<ProductItem[]>>;
    getProductsByHotBrand(limit: number): Promise<ApiResponse<ProductItem[]>>;

    getRecommendedProducts(request: RecommendedProductRequest): Promise<ApiResponse<ProductItem[]>>;

    getRelatedProducts(productIds: number[], size: number): Promise<ApiResponse<ProductItem[]>>;

    getFilter(): Promise<ApiResponse<FilterModel>>;

    getProductBySlug(productSlug: string): Promise<ApiResponse<ProductDetail>>;
}