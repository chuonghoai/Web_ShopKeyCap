import type { SortOption } from "../model/filter.model";

export interface FilterState {
    keyword?: string;

    /**
     * Slug của danh mục: gaming, van-phong
     */
    categorySlug?: string;

    /**
     * Slug của loại sản phẩm: ban-phim, switch, phu-kien,...
     */
    typeSlug?: string;

    /**
     * Slug của thương hiệu: Evoworks, Lofree, Piifox...
    */
    brandSlugs?: string[];

    /**
     * Lọc sản phẩm vẫn còn hàng trong kho (stock > 0)
     */
    inStock?: boolean;

    /**
     * Thứ tự sắp xếp: Chỉ nhận vào giá trị slug đã định nghĩa ở SortOption
     */
    sort?: SortOption;

    /**
     * Khoảng giá: Từ giá min đến giá max
     */
    priceMin?: number;
    priceMax?: number;
}