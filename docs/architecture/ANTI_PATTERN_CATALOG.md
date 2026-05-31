# Anti-Pattern Catalog

Danh sách các mô hình thiết kế lỗi (anti-patterns) cần tránh trong dự án.

---

## 1. Controller ôm đồm (Fat Controller / Fat Component)
* **Description**: Component chứa cả giao diện JSX, state React, fetch API bằng axios, format data trả về.
* **Why It Is Bad**: Không thể tái sử dụng, file dài lên đến 500-1000 dòng, không thể test riêng biệt, phá vỡ MVC.
* **Real Example**: Component `.tsx` vừa có tag `<div>`, vừa có hàm gọi API `axios.get(...)` và setState liên tục.
* **Recommended Fix**: Di chuyển hàm gọi API vào Repository và Service. Đưa state management vào `[name].store.ts`. Đưa logic xử lý sự kiện vào `[name].controller.ts`. Chỉ giữ lại render props ở `.tsx`.

## 2. API Leak vào View (Leak Axios)
* **Description**: Sử dụng `axios` trực tiếp trong Component hoặc Controller.
* **Why It Is Bad**: Thay đổi thư viện HTTP client (VD chuyển từ axios sang fetch/react-query) bắt buộc phải sửa toàn bộ Component.
* **Real Example**: Viết `import axios from 'axios'` trong `homepage.tsx`.
* **Recommended Fix**: Chỉ sử dụng HTTP Client tại tầng Repository. Controller và Store chỉ biết đến `ApiResponse`.

## 3. Khởi tạo Service trong Component (Service Instance within Component)
* **Description**: Gán `const service = new ProductService()` bên trong hàm component render.
* **Why It Is Bad**: Mỗi lần component re-render (bởi state thay đổi), instance mới lại được tạo ra gây tốn mem và làm mất state (nếu có) của Service.
* **Real Example**: `const service = new ProductService()` đặt bên trong hàm `HomePage()`.
* **Recommended Fix**: Xuất (Export) service class dưới dạng singleton ở cuối file `product.service.ts`: `export const productService = new ProductService(...)`.

## 4. Quên xử lý logic USE_MOCK
* **Description**: Tạo feature mới kết nối trực tiếp với backend nhưng bỏ quên việc tạo MockRepo và kiểm tra biến `USE_MOCK`.
* **Why It Is Bad**: Đội FE sẽ bị block hoàn toàn nếu BE down hoặc chưa code xong API.
* **Real Example**: Khởi tạo service trực tiếp: `export const authService = new AuthService(new AuthApiRepo());`
* **Recommended Fix**: Luôn kiểm tra config: `export const authService = new AuthService(USE_MOCK ? new AuthMockRepo() : new AuthApiRepo());`

## 5. Dùng URL Params làm Single Source of Truth mà không đồng bộ
* **Description**: View dùng `searchParams` làm state, nhưng Store lại lưu state nội bộ lệch với URL.
* **Why It Is Bad**: Khi user copy-paste link cho người khác, filter/state không được khôi phục đúng do sự khác biệt giữa state và url.
* **Real Example**: Filter lưu trong `useState` thay vì map tới `URLSearchParams`.
* **Recommended Fix**: Controller làm nhiệm vụ đồng bộ: đọc `URLSearchParams` -> parse thành DTO -> truyền vào Store -> Render (giống cách `products.controller.ts` xử lý Filter).
