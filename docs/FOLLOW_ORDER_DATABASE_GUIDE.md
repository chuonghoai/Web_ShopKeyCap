# Follow Order - Database & API Migration Guide

Tài liệu này được tạo dựa trên nguyên tắc **API-First** và **Domain-Driven Design**. Bằng việc khảo sát source code backend, chúng tôi phát hiện hệ thống **chưa hề tồn tại** luồng xử lý Order (chưa có DTO, Service, Controller). Do đó, đây là bản thiết kế chuẩn mực từ đầu để đội Backend bám theo.

> [!WARNING] 
> **TECHNICAL DEBT: QUY ƯỚC ID TOÀN HỆ THỐNG**
> Hiện backend đang sử dụng `Long id`. Frontend được điều chỉnh tương thích theo `Long ID` (tức là `number` trên TypeScript) trong giai đoạn Follow Order này.

---

## 1. DATABASE IMPACT ANALYSIS

### 1.1. Table: `addresses` (TẠO MỚI)
| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT (PK) | No | Auto Increment / Sequence |
| `user_id` | BIGINT (FK)| No | Trỏ tới bảng users |
| `recipient_name`| VARCHAR(255) | No | Tên người nhận hàng |
| `phone_number` | VARCHAR(20) | No | Số điện thoại nhận hàng |
| `full_address` | TEXT | No | Địa chỉ giao hàng chi tiết |
| `is_default` | BOOLEAN | No | Có phải địa chỉ mặc định không |

*Affected Services*: `AddressService` (Tạo mới), `OrderService` (Liên kết khi checkout).

### 1.2. Table: `order_status_history` (TẠO MỚI)
| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT (PK) | No | Auto Increment / Sequence |
| `order_id` | BIGINT (FK)| No | Trỏ tới bảng orders |
| `from_status` | VARCHAR(50) | Yes | Trạng thái cũ (null nếu tạo mới) |
| `to_status` | VARCHAR(50) | No | Trạng thái mới |
| `note` | TEXT | Yes | Ghi chú (Ví dụ: Lý do hủy đơn) |
| `created_at` | TIMESTAMP | No | Thời điểm chuyển trạng thái |
| `created_by` | VARCHAR(255) | Yes | User ID hoặc Admin Name thực hiện |

*Affected Services*: `OrderService.updateOrderStatus()`, `OrderService.cancelOrder()`.

### 1.3. Table: `orders` (CHỈNH SỬA)
- Cột `id`: Tiếp tục sử dụng `BIGINT`.
- Drop cột: `shipping_address`, `phone_number`.
- Thêm cột: `address_id` (BIGINT FK), `payment_method` (VARCHAR), `shipping_fee` (DECIMAL).
*Affected Services*: `OrderService` (Tạo mới).

### 1.4. Table: `order_items` (CHỈNH SỬA)
- Cột `id` và `order_id`: Tiếp tục sử dụng `BIGINT`.

---

## 2. DTO IMPACT ANALYSIS

Tất cả DTO Order hiện tại là **MISSING FROM BACKEND**. Yêu cầu tạo mới:

### 2.1. `OrderResponse` (TẠO MỚI)
- **File**: `src/main/java/com/vn/keycap_server/dto/response/order/OrderResponse.java`
- **Fields**: `Long id`, `BigDecimal totalAmount`, `BigDecimal shippingFee`, `String status`, `String paymentMethod`, `LocalDate createdAt`
- **Nested Objects**: `AddressResponse address`, `List<OrderStatusHistoryResponse> statusHistory`, `List<OrderItemResponse> items`
- **Được gọi bởi**: `OrderController.getOrderDetail`, `OrderController.getUserOrders`.

### 2.2. `OrderItemResponse` (TẠO MỚI)
- **File**: `src/main/java/com/vn/keycap_server/dto/response/order/OrderItemResponse.java`
- **Fields**: `Long productId`, `String productName`, `String productImage`, `Integer quantity`, `BigDecimal price`
- **Attributes**: Bắt buộc có mảng `attributes` (List of `{name: "Color", value: "Red"}`).
- **Mapper Impact**: `OrderMapper` phải query `ProductVariantAttribute` để map ra danh sách này.

### 2.3. Tương tự cho `AddressResponse` và `OrderStatusHistoryResponse`. (Sử dụng Long id).

---

## 3. SERVICE METHOD-LEVEL TRACE

Hệ thống hiện tại **CHƯA CÓ** OrderService. Các hàm sau bắt buộc phải được thiết kế:

### `OrderService.getUserOrders(Long userId, String status)`
- **Logic mong muốn**: Nếu status = "ALL" hoặc null, query tìm các đơn có status nằm trong tập `[PENDING, PREPARING, SHIPPING]`. Không group by, trả về List `OrderResponse` kèm Items.

### `OrderService.getOrderDetail(Long orderId)`
- **Logic mong muốn**: Join bảng để lấy `Address`, `OrderStatusHistory`, `OrderItems`. Map toàn bộ vào `OrderResponse`. Trả list `statusHistory` sort theo `createdAt` ASC.

### `OrderService.cancelOrder(Long orderId, String reason)`
- **Logic mong muốn**: Kiểm tra đơn hàng có phải trạng thái `PENDING` hay không. Nếu có:
  1. Cập nhật `orders.status = CANCELLED`.
  2. Insert dòng mới vào `order_status_history` với `to_status = CANCELLED` và `note = reason`.

---

## 4. DATABASE MIGRATION CHECKLIST

- [ ] Giữ nguyên `Long id` trên toàn bộ Entity.
- [ ] Tạo bảng `addresses` và migrate data cũ nếu có.
- [ ] Xóa `shipping_address`, `phone_number` khỏi bảng `orders`. Thêm `address_id` (BIGINT), `payment_method`, `shipping_fee` vào `orders`.
- [ ] Tạo bảng `order_status_history`.
- [ ] Tạo `OrderResponse`, `OrderItemResponse`, `AddressResponse`, `OrderStatusHistoryResponse` DTOs (dùng Long id).
- [ ] Tạo `OrderMapper` map list Variant Attributes sang DTO.
- [ ] Xây dựng `OrderController` và `OrderService` theo thiết kế ở trên.
