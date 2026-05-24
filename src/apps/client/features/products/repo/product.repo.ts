import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { ListProductRequest } from "../dto/productRequest.dto";
import type { ProductItem } from "../model/product.model";

export interface ProductRepo {
    getProducts(request: ListProductRequest): Promise<ApiResponse<ProductItem[]>>;
}