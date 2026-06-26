# Engineering Skills cho AI Agent

Tài liệu này định nghĩa các "kỹ năng" và quy trình làm việc chuẩn cho AI (và các dev mới) để không phá vỡ kiến trúc.

---

## 1. Create Feature
* **Purpose**: Thêm một miền nghiệp vụ mới vào dự án (VD: Payment, Notification).
* **When To Use**: Khi có đối tượng thực thể (entity) mới cần giao tiếp API và có khả năng được dùng ở nhiều trang.
* **When Not To Use**: Khi logic chỉ phục vụ 1 giao diện nhỏ giọt.
* **Workflow**:
  1. Tạo `features/[name]/model/` và định nghĩa type.
  2. Tạo `features/[name]/dto/` cho Request/Response.
  3. Tạo `features/[name]/repo/` chứa interface Repo, MockRepo, ApiRepo.
  4. Tạo `features/[name]/services/` chứa class logic xử lý và khởi tạo singleton.
* **Good Example**: Xem thư mục `src/apps/client/features/products`.
* **Bad Example**: Định nghĩa service nhưng gọi trực tiếp `axios` thay vì qua Repo. Gọi React Hooks bên trong Service.
* **Common Mistakes**: Quên tạo MockRepo làm cho app không chạy được chế độ USE_MOCK.
* **Validation Rules**: Repo phải triển khai hoàn toàn Interface chung. Service phải singleton.

---

## 2. Create Page
* **Purpose**: Thêm một màn hình/route mới.
* **When To Use**: Khi UI/UX design có một route mới.
* **When Not To Use**: Khi chỉ là một popup/modal phụ của trang hiện tại.
* **Workflow**:
  1. Tạo thư mục `pages/[name]/`.
  2. Viết `[name].store.ts` khai báo state và gọi Service.
  3. Viết `[name].controller.ts` gọi Store, đọc URL params, tạo event handlers.
  4. Viết `[name].tsx` gọi Controller, hiển thị UI.
  5. Cập nhật `routes.tsx`.
* **Good Example**: Thư mục `src/apps/client/pages/products/`.
* **Bad Example**: Gộp cả Store và Controller vào trong file `.tsx`.
* **Common Mistakes**: Controller trực tiếp gọi API (bỏ qua Store). Store trực tiếp sửa URL.
* **Validation Rules**: File `.tsx` chỉ nhận data từ Controller và không chứa `useState` gọi API.

---

## 3. Data Fetching
* **Purpose**: Lấy dữ liệu từ server và hiển thị.
* **When To Use**: Luôn luôn khi cần dữ liệu server.
* **Workflow**:
  1. Định nghĩa Data Store (`fetchData` function cập nhật `isLoading`, `data`).
  2. Store gọi hàm từ Service (trả về `ApiResponse`).
  3. Controller lấy `data` và `isLoading` từ Store truyền xuống View.
* **Good Example**: Hàm `fetchProducts` trong `products.store.ts`.
* **Bad Example**: Gọi hàm fetch bằng `axios` trực tiếp trong Component gốc.

---

## 4. State Management
* **Purpose**: Quản lý trạng thái chia sẻ (Shared State) hoặc trạng thái cục bộ.
* **When To Use**: 
  - Local State: Dùng Store Hook của Page.
  - Global State: Dùng React Context kết hợp Provider (ví dụ: Auth Context, Cart Context).
* **When Not To Use**: Tránh dùng Redux/Zustand nếu không thực sự cần thiết, project đang ưu tiên Context API cho tính năng toàn cục và Custom Hooks cho cục bộ.
* **Good Example**: `cart.context.tsx` & `cart.provider.tsx`.

---

## 5. Form Handling
* **Purpose**: Quản lý thao tác form.
* **Workflow**: 
  1. Nên xử lý state form bên trong Component hoặc Controller.
  2. Tạo DTO tương ứng.
  3. Gọi Store để thực thi API Request khi submit.
* **Good Example**: `loginForm.tsx` & `login.controller.ts`.
