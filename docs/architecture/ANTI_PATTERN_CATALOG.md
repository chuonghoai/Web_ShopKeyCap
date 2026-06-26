# Anti-Pattern Catalog

Danh sách các mô hình thiết kế lỗi (anti-patterns) cần tránh trong dự án.

---

## 1. Controller ôm đồm (Fat Controller / Fat Component)
* **Description**: Component chứa cả giao diện JSX, state React, fetch API bằng axios, format data trả về.
* **Why It Is Bad**: Không thể tái sử dụng, file dài lên đến 500-1000 dòng, không thể test riêng biệt, phá vỡ MVC.
* **Real Example**: Component `.tsx` vừa có tag `<div>`, vừa có hàm gọi API `axios.get(...)` và setState liên tục.
* **Recommended Fix**: Di chuyển hàm gọi API vào Repository và Service. Đưa logic lấy dữ liệu vào Feature Hooks (TanStack Query). Đưa logic xử lý sự kiện vào `[name].controller.ts`. Chỉ giữ lại render props ở `.tsx`.

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
* **Recommended Fix**: Controller làm nhiệm vụ đồng bộ: đọc `URLSearchParams` -> parse thành DTO -> truyền vào Feature Hooks -> Render (giống cách `products.controller.ts` xử lý Filter).

## 6. Pass-through Store / Pass-through ViewModel
* **Description**: Tạo ra một layer trung gian chỉ để forward dữ liệu mà không làm gì khác.
* **Why It Is Bad**: Làm phức tạp hóa code không cần thiết, tăng số lượng file, khó theo dõi.
* **Real Example**: `export const useProductsViewModel = () => useProductsQuery()`
* **Recommended Fix**: Controller gọi trực tiếp `useProductsQuery()`.

## 7. Context API thay cho Query
* **Description**: Dùng `useContext` để lưu Server State và pass xuống các component con.
* **Why It Is Bad**: Không có cache, không có tính năng retry, staleTime của React Query.
* **Recommended Fix**: Sử dụng TanStack Query cho Server State. Context API chỉ dùng cho Dependency Injection hoặc các config rất tĩnh.

## 8. Duplicate Server State (Zustand + React Query)
* **Description**: Fetch dữ liệu bằng React Query sau đó `useEffect` để copy dữ liệu đó vào Zustand.
* **Why It Is Bad**: Tạo ra Multiple Source Of Truth, rất dễ dính lỗi Out of Sync.
* **Recommended Fix**: Đọc trực tiếp từ `useQuery().data`. Nếu cần xử lý UI state liên quan đến data đó, truyền data vào tham số của Zustand action.

## 9. Hardcoded Query Keys
* **Description**: Khai báo chuỗi literal `useQuery({ queryKey: ['products', id] })` rải rác khắp nơi.
* **Why It Is Bad**: Gây khó khăn khi muốn `invalidateQueries` vì không nhớ chính xác mảng key gồm những phần tử nào.
* **Recommended Fix**: Sử dụng **Query Key Factory** (VD: `productKeys.detail(id)`).

## 10. useState(query.data)
* **Description**: Sử dụng `useState` hoặc `useEffect` để lưu lại dữ liệu trả về từ API.
* **Why It Is Bad**: Trở thành Multiple Source Of Truth, component không tự update khi cache thay đổi.
* **Recommended Fix**: Dùng trực tiếp biến `data` từ query hook. Tính toán (Derived State) trực tiếp trong render hoặc dùng `useMemo`.
