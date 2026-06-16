import type { ProductOption, ProductVariant } from "../../../../client/features/products/model/variant.model";
import type { Specifications } from "../../../../client/features/products/model/productDetail.model";

export interface VariantOverride {
    sku: string;
    price?: number;
    originalPrice?: number;
    percentDiscount?: number;
    stockQuantity?: number;
}

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
    
    // Giữ nguyên variants để Backend biết cấu trúc tổ hợp
    variants: ProductVariant[];

    // Default Pricing & Inventory
    price: number;
    originalPrice?: number;
    percentDiscount?: number;
    stockQuantity?: number;
    
    // Ghi đè cấu hình cho từng Variant
    variantOverrides?: VariantOverride[];
}
