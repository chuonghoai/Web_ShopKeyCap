# Chuẩn Mực Quản Lý Trạng Thái (State Management Standard)

Tài liệu này định nghĩa các quy tắc bắt buộc trong việc quản lý dữ liệu toàn cục (Global State) và cục bộ (Local State) của dự án.

## 1. Server State (Dữ liệu từ API)
Server State là những dữ liệu được tải về từ Backend/Database.
* **Bắt buộc**: Sử dụng **TanStack Query** (React Query) để fetch, cache, và đồng bộ Server State.
* **Quy tắc cấm**:
  - Không được dùng `useState` hoặc `useEffect` để mirror (lưu lại bản sao) của `query.data`.
  - Không được đưa Server State vào trong Zustand. Dữ liệu từ Server phải luôn nằm trong React Query Cache.
  - Không dùng Context API để chứa kết quả trả về từ API.

## 2. Client UI State (Trạng thái giao diện toàn cục)
Client State là những biến số phục vụ việc hiển thị UI không liên quan đến database (VD: Trạng thái Modal mở/đóng, Theme, Sidebar collapse, Toast notifications).
* **Bắt buộc**: Sử dụng **Zustand** cho Global Client State.
* **Quy tắc**: Chỉ tạo Store khi dữ liệu này cần được truy cập ở nhiều cấp component khác nhau mà không muốn prop-drilling.
* **Ví dụ**: `useToastStore`, `useAuthStore` (chỉ chứa các logic ui/token cục bộ).

## 3. Local UI State (Trạng thái UI cục bộ)
* **Bắt buộc**: Sử dụng `useState` và `useReducer`.
* **Phạm vi**: Form input, toggle trạng thái của một component cụ thể, filter nội bộ của một trang.

## 4. Single Source Of Truth (Nguồn Sự Thật Duy Nhất)
Một mảnh dữ liệu chỉ được quyền tồn tại ở một nơi duy nhất tại một thời điểm.
* **User Profile**: Nằm ở React Query Cache (được khởi tạo từ LocalStorage). Mọi component đọc qua `useUserProfileQuery()`.
* **Cart Badge**: Nằm ở React Query Cache (thông qua `useCartSummaryQuery()`).

**Anti-Patterns (Cấm):**
- ✘ React Query + Zustand (Fetch data xong lưu vào Zustand).
- ✘ React Query + Local Storage Cache (Tự viết logic lưu localStorage đè lên cache mặc định của React Query).

## 5. Auth Standard
Quản lý luồng xác thực (Authentication):
* **Route Guard**:
  - Phải kiểm tra sự tồn tại của Token (`tokenService.getAccessToken()`) bằng logic đồng bộ trước khi cho phép component mount.
  - Không được chờ `useUserProfileQuery` (bất đồng bộ) để quyết định redirect.
* **Logout**:
  - Khi Logout, **BẮT BUỘC** gọi `queryClient.clear()` để xóa sạch toàn bộ cache dữ liệu nhạy cảm của người dùng cũ.
  - Xóa sạch Token và Local Storage.
* **Token Hết Hạn (401 Unauthorized)**:
  - Bắt buộc phải thực hiện trong Axios Interceptor: Gọi `tokenService.clear()`, `userStorageService.removeUser()`, và redirect về `/login`.

## 6. Cart Standard
* **Cart Badge**:
  - Bắt buộc dùng hook chuyên biệt `useCartCount()` cho Header và Sidebar.
  - Cấm đọc trực tiếp `CartDetailModel` (chứa toàn bộ danh sách sản phẩm) chỉ để lấy ra tổng số.
  - Bắt buộc sử dụng `CartSummaryModel` cho các logic hiển thị số lượng giỏ hàng.
