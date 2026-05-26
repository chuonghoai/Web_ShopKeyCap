const SortOption = {
    A_Z: 'A_Z',
    Z_A: 'Z_A',
    NEWEST: 'NEWEST',
    PRICE_ASC: 'PRICE_ASC',
    PRICE_DESC: 'PRICE_DESC',
} as const;
export type SortOption = (typeof SortOption)[keyof typeof SortOption];

export interface FilterState {
    keyword?: string;

    /**
     * Slug của danh mục: Bàn phím cơ, Keycap bộ...
     */
    categorySlug?: string;

    /**
     * Lọc sản phẩm vẫn còn hàng trong kho (stock > 0)
     */
    inStock?: boolean;

    /**
     * Slug của thương hiệu: Evoworks, Lofree, Piifox...
     */
    brandSlugs?: string[];

    /**
     * Thứ tự sắp xếp: tene a_z, z_a, sản phẩm mới nhất, giá tăng dần, giá giảm dần
     */
    sort?: SortOption;

    /**
     * Khoảng giá: Từ giá min đến giá max
     */
    priceMin?: number;
    priceMax?: number;
}