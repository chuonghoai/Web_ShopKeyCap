export interface ProductItem {
    id: string;
    name: string;
    /**
     * imageUrl: Ảnh đại diện chính của sản phẩm
     */
    imageUrl: string;

    /**
     * price: Giá hiện tại
     * originalPrice: Giá gốc
     * percentDiscount: Phần trăm giảm giá, có thể bằng 0 nếu không giảm giá
     * 
     * Quy tắc tính sản phẩm có giảm giá hay ko:
     *  - price < originalPrice && percentDiscount == 0: Sản phẩm giảm tiền trực tiếp,
     *      ví dụ: Giá gốc là 100k, giá hiện tại là 90k -> Sản phẩm đang được giảm trực tiếp 10k
     * 
     *  - price < originalPrice && percentDiscount > 0: Sản phẩm được giảm tiền theo %,
     *      ví dụ: Giá gốc là 100k, giá hiện tại là 90k -> Sản phẩm đang được giảm 10%
     * 
     *  - price == originalPrice: Sản phẩm không được giảm giá
     */
    price: number;
    originalPrice: number;
    percentDiscount: number;

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