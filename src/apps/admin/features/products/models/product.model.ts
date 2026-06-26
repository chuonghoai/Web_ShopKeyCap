import type { Specifications } from "../../../../client/features/products/model/productDetail.model";
import type { ProductOption, ProductVariant } from "../../../../client/features/products/model/variant.model";
import type { Category, Type, Brand } from "../../../../client/features/products/model/filter.model";

export interface AdminProductItem {
    id: number;
    name: string;
    imageUrl: string;

    category?: Category;
    type?: Type;
    brand?: Brand;
    rating?: number;

    minPrice: number;

    totalStockQuantity?: number;
    createdAt?: string;

    slug: string;
}

export interface AdminProductDetail extends AdminProductItem {
    thumbnailUrl: string[];

    options: ProductOption[];

    variants: ProductVariant[];

    maxPrice: number;

    description: string;
    specifications: Specifications[];
    rating: number;
}
