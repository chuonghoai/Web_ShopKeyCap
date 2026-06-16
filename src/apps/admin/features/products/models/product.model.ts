import type { Specifications } from "../../../../client/features/products/model/productDetail.model";
import type { ProductOption, ProductVariant } from "../../../../client/features/products/model/variant.model";
import type { Category, Type, Brand } from "../../../../client/features/products/model/filter.model";

export interface AdminProductItem {
    id: number;
    name: string;
    slug: string;

    imageUrl: string;
    
    // Giai đoạn chuyển tiếp: Giữ lại để tránh break UI hiện tại
    typeName?: string;
    categoryId?: number;

    // Các trường mới được đồng bộ từ Client
    category?: Category;
    type?: Type;
    brand?: Brand;
    rating?: number;

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
