import type { ProductOption, ProductVariant } from "../../../../client/features/products/model/variant.model";
import type { Specifications } from "../../../../client/features/products/model/productDetail.model";
export interface CreateProductRequest {
    name: string;
    slug?: string;

    categoryId: number;
    typeId: number;
    brandId: number;
    
    description: string;
    imageUrl: string;
    thumbnailUrl: string[];
    specifications: Specifications[];

    options: ProductOption[];

    variants: ProductVariant[];

    minPrice: number;
    maxPrice: number;
    totalStockQuantity: number;
}
