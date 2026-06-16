import type { Specifications } from "../../../../client/features/products/model/productDetail.model";
import type { ProductOption, ProductVariant } from "../../../../client/features/products/model/variant.model";

export interface AdminProductItem {
    id: number;
    name: string;
    slug: string;

    imageUrl: string;
    
    typeName: string;
    categoryId: number;
    minPrice: number;
    
    totalStockQuantity?: number;
    status?: string;
    createdAt?: string;
}

export interface AdminProductDetail extends AdminProductItem {
    thumbnailUrl: string[];
    
    options: ProductOption[];
    
    variants: ProductVariant[];
    
    maxPrice: number;
    
    description: string;
    specifications: Specifications[];
}
