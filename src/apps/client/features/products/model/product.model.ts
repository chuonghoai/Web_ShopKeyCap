export interface ProductItem {
    id: number;
    name: string;
    /**
     * imageUrl: Ảnh đại diện chính của sản phẩm
     */
    imageUrl: string;
    category?: { id: number; name: string; slug: string };
    type?: { id: number; name: string; slug: string };
    brand?: { id: number; name: string; slug: string };

    /**
     * minPrice: Giá thấp nhất trong tất cả các variants của sản phẩm.
     * Được Backend tính sẵn, Frontend chỉ hiển thị, không tự tính.
     */
    minPrice: number;

    /**
     * Sản phẩm đang có được user thêm vào wishlist hay ko
     */
    isFavorite: boolean;

    /**
     * Đường dẫn thân thiện của sản phẩm, dùng để xây dựng URL và lấy dữ liệu sản phẩm bằng slug
     * Quy tắc: Toàn bộ là chữ thường, không dấu, cách nhau bởi dấu gạch ngang (-)
     * Ví dụ: 
     *  - sản phẩm tên Bàn phím cơ custom Akko 3068B Plus
     *  - slug: ban-phim-co-custom-akko-3068b-plus
     * 
     * Lưu ý:
     *  - Nếu xây dựng api tạo sản phẩm, tên sản phẩm có thể trùng, nhưng slug tuyệt đối không được trùng.
     *  - Ví dụ: 2 sản phẩm đều tên là keyboard, thì phải có 2 slug là keyboard-1 và keyboard-2
     */
    slug: string;
}