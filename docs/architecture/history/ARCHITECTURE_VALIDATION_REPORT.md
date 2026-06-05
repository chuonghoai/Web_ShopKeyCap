# Architecture Validation Report

Tài liệu này đánh giá lại tính khả thi của cấu trúc Hook-First dựa trên thực trạng codebase trước khi tiến hành migration. Mọi phân tích đều dựa trên mã nguồn thực tế.

---

## 1. AuthContext Analysis

**Files**: 
- `src/core/auth/auth.context.tsx`
- `src/core/auth/auth.provider.tsx`
- `src/core/hooks/useAuth.ts`

**Provides**:
* `user`: Dữ liệu profile người dùng (`User | null`).
* `isAuthenticated`: Cờ xác thực (`boolean`).
* `login(userData)`: Hàm lưu user vào state và `userStorageService`.
* `logout()`: Hàm gọi API logout, xóa state, và xóa toàn bộ Local Storage (`userStorageService`, `cartSummaryStorageService`, `tokenService`).

**Consumers (Các nơi đang sử dụng `useAuth`)**:
* `src/core/auth/auth.guard.tsx` (Route Guard chặn các trang admin/bảo mật).
* `src/apps/client/features/cart/context/cart.provider.tsx` (Phụ thuộc user để fetch cart).
* `src/apps/client/components/header/header.controller.ts` (Hiển thị tên user, nút Đăng xuất).
* `src/apps/auth/page/components/RegisterForm/register.controller.ts` (Gọi `login()` sau khi đăng ký).
* `src/apps/auth/page/components/LoginForm/login.controller.ts` (Gọi `login()` sau khi đăng nhập).

**Migration Risk (Rủi ro)**: Cao. Hàm `logout()` đang gánh rất nhiều "side-effects" (xóa các Storage khác nhau). Xóa AuthContext mà không cung cấp hàm thay thế tương đương sẽ làm vỡ logic đăng xuất và phá hỏng Route Guard.

---

## 2. useUserQuery Feasibility Analysis

**Phân tích AuthContext hiện tại**:
* **Server State**: `user` object (dữ liệu profile).
* **Client State**: `isAuthenticated` (cờ derived từ user).
* **Authentication Logic**: Side-effects của `login()` và `logout()`.

**Đánh giá khả năng thay thế**:
👉 **Kết luận: B. `useUserQuery()` chỉ thay thế được User Data.**

Lý do: `useQuery` của TanStack Query là khai báo (declarative) để lấy và cache dữ liệu. Nó không thể và không nên chứa các hàm thực thi (imperative) mang tính side-effect như lưu local storage hay xóa token. Việc cố nhét `login`/`logout` vào query data là vi phạm nguyên tắc thiết kế của React Query.

**Kiến trúc thay thế đề xuất**:
Thay vì ép `useUserQuery` làm tất cả, chúng ta cần tách bạch:
* `useUserProfileQuery()`: Đóng vai trò là Server State (SSOT), lấy data user từ API dựa vào Token.
* `tokenService` / `userStorageService`: Giữ nguyên vai trò lưu trữ token/user id ở Local Storage để Axios Interceptor có thể đọc.
* `useAuthMutations()` (hoặc `auth.service.ts` kết hợp hook): Cung cấp `useLoginMutation` và `useLogoutMutation` để thay thế các function cũ. Các hàm này khi chạy thành công sẽ mutate storage và gọi `queryClient.invalidateQueries(['profile'])` / `queryClient.clear()` để dọn dẹp bộ nhớ.
* Route Guard: Sẽ kiểm tra `tokenService` kết hợp với data từ `useUserProfileQuery()`.

---

## 3. Toast Architecture Analysis

**Phân tích `toast.tsx`**:
👉 **Kết luận: B. Context Provider + UI Renderer.**

Dựa vào mã nguồn thực tế tại `src/components/toast/toast.tsx`:
1. File này export `ToastContext` và `useToast`.
2. Định nghĩa giao diện (JSX) cho `ToastItem` chứa các styles CSS Tailwind (như `bg-[#0f172a]/90`, micro-animations).
3. `ToastProvider` trả về `<ToastContext.Provider>` BỌC CÙNG VỚI một `<div className="fixed top-6...">` duyệt qua mảng `toasts` để render các `ToastItem`.

**Có được phép xóa hoàn toàn file này hay không?**
👉 **KHÔNG.** Nếu xóa file này, dự án sẽ mất trắng toàn bộ UI của Toast.

**Giải pháp Refactor (Phân tách rõ ràng)**:
* **XÓA**: `ToastContext`, `ToastContext.Provider`, và hook `useToast`.
* **GIỮ**: `ToastItem` và `ToastType` interface.
* **SỬA**: Sửa đổi `ToastProvider` thành một `ToastContainer` đơn thuần (không có `{children}`). Nó sẽ lấy mảng `toasts` trực tiếp từ `useToastStore()` (Zustand) và render ra UI, sau đó đặt file này vào layout tổng hoặc `App.tsx`.

---

## 4. Recommended Final Architecture

 Dựa trên 3 kết luận trên, cấu trúc cuối cùng sẽ là:
1. **Toast**: Zustand Store (`useToastStore.ts`) + UI Component (`ToastContainer.tsx`).
2. **Auth**: TanStack Query (`useUserProfileQuery`) + Mutators (`useLoginMutation`, `useLogoutMutation`) + Core Services (`tokenService`).
3. **Cart Badge**: Derive từ `useCartItemsQuery()`. 
4. **Data Fetching**: Trực tiếp gọi Query Hooks ở Controller.

---

## 5. Required Plan Adjustments Before Implementation

Trước khi bắt tay vào code, kế hoạch Implementation Plan cần được điều chỉnh:
1. **Không xóa `toast.tsx`**: Đổi lệnh XÓA thành lệnh SỬA. Cắt bỏ Context, giữ lại UI đổi tên thành `<ToastContainer />`.
2. **Bổ sung Auth Mutations**: Thay vì chỉ tạo `useUserQuery`, cần phải tạo thêm `useLoginMutation` và `useLogoutMutation` trong thư mục features auth để tái tạo lại side-effects của Context cũ.
3. **Route Guard Update**: `auth.guard.tsx` cần được viết lại để đọc token từ storage trước thay vì chỉ dựa vào `user` object.
