# Product Model Alignment Report

Báo cáo chi tiết về quá trình đồng bộ hóa Product Model giữa Client và Admin, cùng với việc thiết kế lại cấu trúc định giá (Pricing Architecture) dựa trên kế hoạch đã được phê duyệt.

## 1. Product Model Diff (Admin)
Mô hình `AdminProductItem` và `AdminProductDetail` đã được căn chỉnh với nguồn chuẩn là Client (`ProductDetail`).

- **Field Thêm mới:**
  - `category?: Category`
  - `type?: Type`
  - `brand?: Brand`
  - `rating?: number`
- **Giai đoạn chuyển tiếp (Migration Strategy):**
  - Các trường cũ (`categoryId`, `typeName`) không bị xóa ngay lập tức mà được đánh dấu là `Optional`. Điều này cho phép Admin tiếp tục sử dụng cấu trúc UI hiện tại mà không làm hỏng Table hoặc Edit Form.
- **Xử lý tương lai:** Sau khi Backend và các Table trả về đầy đủ Object Model, các field ID cũ sẽ được dọn dẹp.

## 2. Category / Type / Brand Module
Thay vì đặt bên trong feature Product, hệ thống đã cấu trúc thành 3 features riêng biệt để hỗ trợ làm CRUD Management độc lập trong tương lai.

- **Các tính năng tạo mới:** `features/categories`, `features/brands`, `features/types`.
- **Cấu trúc bên trong mỗi feature:**
  - `models/*.model.ts`: Định nghĩa Interface map 1-1 với Client.
  - `repos/*Api.repo.ts`: Gọi thẳng tới Backend `/admin/*`.
  - `repos/*Mock.repo.ts`: Data mẫu để test khi mất kết nối.
  - `services/*.service.ts`: Middleware xử lý cờ `USE_MOCK`.
  - `hooks/queries/*.query.ts`: React Query hooks để kết nối vào UI.

## 3. Variant Pricing Design
Đã triển khai hoàn chỉnh một DTO cực kỳ rõ ràng, tách bạch giữa việc khai báo "Tổ hợp nào tồn tại" và "Tổ hợp nào bị ghi đè giá/tồn kho".

- **Thiết kế đã chọn:** **Option A (Variant Combinations Table)** - Hiển thị toàn bộ biến thể trên một bảng duy nhất để Admin dễ quản lý giá số lượng lớn, giảm số thao tác click. UX được thiết kế trạng thái màu xám/không nhập liệu nếu sử dụng giá mặc định và Editable Input nếu bỏ chọn Checkbox mặc định.
- **DTO Cập nhật:**
  ```ts
  interface CreateProductRequest {
      ...
      // Khai báo tổ hợp
      options: ProductOption[];
      variants: ProductVariant[];
  
      // Khai báo giá/tồn kho mặc định (Sẽ apply nếu override không tồn tại)
      price: number;
      originalPrice?: number;
      percentDiscount?: number;
      stockQuantity?: number;
      
      // Khai báo các SKU đặc thù
      variantOverrides?: VariantOverride[];
  }
  
  interface VariantOverride {
      sku: string;
      price?: number;
      originalPrice?: number;
      percentDiscount?: number;
      stockQuantity?: number; // Quản lý tồn kho linh hoạt theo từng size/màu
  }
  ```
- **Lý do lựa chọn:** Thiết kế này giữ nguyên cấu trúc `variants` để Backend tạo bản ghi DB chính xác, trong khi thu nhỏ payload override.

## 4. Breaking Changes & Migration Steps
- **Nguy cơ rủi ro:** Nếu đổi từ `categoryId` sang `category.id` trên toàn bộ Admin Table và Form cùng lúc, có thể dẫn tới lỗi Runtime `Cannot read properties of undefined (reading 'name')`.
- **Hướng xử lý:** Tôi đã giữ các field cũ là Optional (`typeName?: string`, `categoryId?: number`). Ở phía UI Table hoặc Update Form, trong quá trình gọi API, hệ thống vẫn có thể đọc field cũ. 
- **Công việc tiếp theo cần làm thủ công:** Rà soát lại tất cả các cột hiển thị trong Bảng danh sách sản phẩm để chuyển lệnh từ `row.typeName` thành `row.type?.name || row.typeName`.
