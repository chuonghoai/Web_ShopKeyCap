/**
 * Dùng để vẽ các lựa chọn variant của sản phẩm
 */
export interface ProductOption {
    /**
     * Tên của nhóm phân loại. 
     * VD: "Màu sắc", "Loại Switch", "Kích thước"
     */
    name: string;

    /**
     * Danh sách các giá trị của nhóm này. 
     * VD: ["Trắng", "Đen"], ["Red Switch", "Blue Switch"]
     */
    values: string[];
}

/**
 * Dùng để chứa dữ liệu của mỗi loại variant.
 * Các thao tác thêm giỏ hàng, đặt hàng... chủ yếu dùng variant.id để thao tác
 */
export interface ProductVariant {
    /**
     * Id của biến thể này
     */
    id: string;

    /**
     * Mã lưu kho (Stock Keeping Unit).
     * Có dạng:
     *  - [Thương hiệu]-[Model]-[Thuộc tính 1]-[Thuộc tính 2]
     * Ví dụ:
     *  - AKKO-3068-RED-BLK: Nghĩa là Akko 3068, Switch Red, Màu Đen
     * 
     * Khi thao tác với database, có thể dùng sku để tìm variant tương ứng
     * Đây là field unique trong DB.
     */
    sku: string;

    /**
     * Tổ hợp các option tạo nên biến thể này. 
     * Key là tên option (name), Value là giá trị (value).
     * VD: { "Màu sắc": "Đen", "Loại Switch": "Red Switch" }
     */
    attributes: Record<string, string>;

    /**
     * Giá của riêng biến thể này.
     * Nếu không có, có thể lấy giá mặc định giống Product gốc.
     */
    price: number;
    originalPrice: number;
    percentDiscount: number;

    /**
     * Số lượng tồn kho thực tế của tổ hợp này
     */
    stockQuantity: number;

    /**
     * (Optional)
     * Ảnh đại diện của biến thể này
     */
    imageUrl?: string;
}