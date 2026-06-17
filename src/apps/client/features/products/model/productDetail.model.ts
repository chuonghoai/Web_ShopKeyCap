import type { Brand, Category, Type } from "./filter.model";
import type { ProductItem } from "./product.model";
import type { ProductOption, ProductVariant } from "./variant.model";

export interface ProductDetail {
    id: number;
    name: string;
    slug: string;

    category: Category;
    type: Type;
    brand: Brand;

    /**
     * imageUrl: Ảnh đại diện chính của sản phẩm
     * thumbnailUr: List các hình ảnh giới thiệu của sản phẩm
     */
    imageUrl: string;
    thumbnailUrl: string[];

    /**
     * Dùng để render ra các tùy chọn variant: chọn màu, chọn switch...
     */
    options: ProductOption[];

    /**
     * Danh sách các tổ hợp biến thể. Dùng để check xem tổ hợp user vừa chọn 
     * còn hàng không, giá bao nhiêu, và lấy ID để add vào giỏ hàng.
     */
    variants: ProductVariant[];

    /**
     * Khoảng giá của sản phẩm, được Backend tính sẵn từ toàn bộ variants.
     * Frontend không tự dưyệt variants để tính lại.
     * 
     * Hiển thị:
     *   - minPrice != maxPrice → “1.200.000đ - 1.800.000đ”
     *   - minPrice == maxPrice → “1.200.000đ”
     */
    minPrice: number;
    maxPrice: number;

    /**
     * Tổng số tồn kho của tất cả các biến thể
     */
    totalStockQuantity: number;

    /**
     * Sản phẩm có được user thêm vào wishlist hay ko
     */
    isFavorite: boolean;

    /**
     * Mô tả sản phẩm (dạng markdown hoặc html)
    */
    description: string;

    /**
     * Thông số kỹ thuật, được lưu dưới dạng object
     * Lưu database: [{ name: 'Kích thước', value: '15cm x 15cm x 5cm' }, { name: 'Trọng lượng', value: '1kg' }]
     * Trả response:
     *      [
     *          { 
     *              name: 'Kích thước', 
     *              value: '15cm x 15cm x 5cm' 
     *          },
     *          {...}
     *      ]
     */
    specifications: Specifications[];

    /**
     * Số sao đánh giá trung bình
     */
    rating: number;

    /**
     * Các sản phẩm khác có liên quan đến sản phẩm hiện tại.
     * Chỉ cần lấy tối đa 10-20 sản phẩm
     */
    relateTo: ProductItem[];
}

export interface Specifications {
    name: string;
    value: string;
}
