# ENUM SAFETY REVIEW REPORT

## 1. Overview
Báo cáo này được tự động tạo ra từ quá trình rà soát (deep scan) source code Frontend, mục đích nhằm loại bỏ toàn bộ các Magic String liên quan đến Enum để đảm bảo Type Safety.

## 2. Order Status Fixes
Các Magic String về trạng thái Đơn Hàng được tìm thấy và sẽ được đổi thành `EOrderStatus`:

- **File**: `src/apps/client/features/order/constants/orderTabs.constant.ts`
  - Hiện tại: `id: 'PENDING'`, `id: 'PREPARING'`, `id: 'SHIPPING'`, `id: 'DELIVERED'`, `id: 'CANCELLED'`
  - Sẽ sửa thành: `EOrderStatus.PENDING`, `EOrderStatus.PREPARING`, vv.

- **File**: `src/apps/client/features/order/repositories/orderMock.repo.ts`
  - Hiện tại: `['PENDING', 'PREPARING', 'SHIPPING']`
  - Sẽ sửa thành: `[EOrderStatus.PENDING, EOrderStatus.PREPARING, EOrderStatus.SHIPPING]`

- **File**: `src/apps/client/pages/user/orders/listPageController/orderListPage.controller.ts`
  - Sẽ tạo `EOrderFilterTab` và đổi `useState('ALL')` thành `useState<EOrderFilterTab>(EOrderFilterTab.ALL)`.

## 3. Payment Method Fixes
Các Magic String phương thức thanh toán sẽ được đổi thành `EPaymentMethod`:

- **File**: `src/apps/client/features/order/utils/paymentRedirect.util.ts`
  - Hiện tại: `providerName: 'MOMO'`, `providerName: 'VNPAY'`, và `params.get('partnerCode') === 'MOMO'`
  - Sẽ sửa thành: Sử dụng các biến Enum tương ứng (`EPaymentMethod.MOMO`, `EPaymentMethod.VNPAY`).

## 4. Payment Status Fixes
Qua quá trình quét, không phát hiện thấy Magic String dạng `'PAID'`, `'FAILED'`, `'PENDING'` liên quan đến Payment bên ngoài file định nghĩa Enum. Mã nguồn đã hoàn toàn an toàn đối với `EPaymentStatus`.

## 5. Other Enum Fixes
Qua việc rà soát các cụm Magic String phổ biến như `ADMIN`, `USER`, `ACTIVE`, `INACTIVE`:
- Toàn bộ ứng dụng đang tuân thủ nghiêm ngặt việc sử dụng hằng số cho Role (sử dụng `ROLE.ADMIN` và `ROLE.USER` từ `core/constants/role.constant.ts`).
- Không phát hiện các đoạn code hardcode chuỗi bừa bãi. Tuy nhiên, có thể cân nhắc đổi tên `ROLE` thành `ERole` theo đúng định dạng Enum.

## 6. Switch Case To Config Object Mapping
Sẽ thực hiện refactor tại file:
- **File**: `src/apps/client/features/order/utils/orderStatus.util.ts`
- **Thay đổi**: Từ `switch(status)` đang hardcode thủ công từng case sẽ được refactor thành dạng Map Constant: `const STATUS_CONFIG: Record<EOrderStatus, StatusInfo> = { ... }` để đảm bảo compiler báo lỗi khi có enum mới mà quên định nghĩa màu/nhãn.

## 7. Remaining Magic Strings
- `'ALL'`: Được xử lý bằng việc thêm một Enum mở rộng `EOrderFilterTab`.
- `'DELIVERED'`: Do trạng thái này không có trong `EOrderStatus` backend nhưng UI lại có tab "Đã giao", nên tab này sẽ được ánh xạ chính xác với trạng thái `EOrderStatus.SUCCESS` của hệ thống.
