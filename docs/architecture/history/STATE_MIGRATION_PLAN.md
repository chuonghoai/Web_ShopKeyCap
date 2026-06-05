# Kế Hoạch Migration State Management (TanStack Query + Zustand)
**Tệp**: `STATE_MIGRATION_PLAN.md`
**Dự án**: Web_ShopKeyCap

Dựa trên báo cáo audit, dưới đây là kế hoạch kiến trúc và lộ trình (migration plan) để chuyển đổi từ quản lý state thủ công sang kết hợp **TanStack Query** (Server State) và **Zustand** (Global Client State), đồng thời giữ nguyên sức mạnh của mô hình **MVC Hooks Pattern**.

---

## 1. Cấu trúc thư mục đề xuất
Để tích hợp liền mạch vào kiến trúc hiện tại mà không làm vỡ các module, cấu trúc thư mục sẽ được điều chỉnh nhẹ:

```text
src/
├── core/
│   ├── store/                # Nơi chứa các GLOBAL Store (Zustand)
│   │   ├── useAuthStore.ts
│   │   ├── useToastStore.ts
│   │   └── useCartStore.ts
│   └── api/
│       └── queryKeys.ts      # (Tùy chọn) Chứa toàn bộ Query Keys tập trung
│
├── apps/client/features/[feature]/
│   ├── hooks/                # Nơi chứa các custom hooks của TanStack Query
│   │   ├── queries/          # Các hook gọi GET data
│   │   │   └── useGetProducts.ts
│   │   ├── mutations/        # Các hook gọi POST/PUT/DELETE
│   │   │   └── useAddReview.ts
│   │   └── queryKeys.ts      # Query Keys phân tách theo từng feature
```

### Cách Controller và Store tương tác (Mô hình mới):
- `[Page].tsx` (View): Không đổi.
- `[Page].controller.ts` (Controller): Chứa Local State (`useState`) và logic UI.
- `[Page].store.ts` (Store): Sẽ biến thành file gọi (consume) các React Query Hooks và trả về cho Controller. Điều này giúp giữ nguyên Data Flow (View -> Controller -> Store).

---

## 2. Danh sách Query Keys (TanStack Query)
Quy hoạch Query Keys theo chuẩn (Factory Pattern) để dễ dàng quản lý việc Invalidate (làm mới) dữ liệu.

*Tệp: `features/products/hooks/queryKeys.ts`*
- **`productKeys`**:
  - `all`: `['products']`
  - `lists()`: `['products', 'list']`
  - `list(filters)`: `['products', 'list', { filters }]`
  - `details()`: `['products', 'detail']`
  - `detail(id)`: `['products', 'detail', id]`
  - `reviews(id)`: `['products', 'detail', id, 'reviews']`

*Tệp: `features/cart/hooks/queryKeys.ts`*
- **`cartKeys`**:
  - `all`: `['cart']`
  - `summary()`: `['cart', 'summary']`
  - `items()`: `['cart', 'items']`
  - `related()`: `['cart', 'related']`
  - `deliveryInfo()`: `['cart', 'deliveryInfo']`

*Tệp: `features/homepage/hooks/queryKeys.ts`*
- **`homepageKeys`**:
  - `all`: `['homepage']`
  - `sections()`: `['homepage', 'sections']`

*Tệp: `features/favorite/hooks/queryKeys.ts`*
- **`favoriteKeys`**:
  - `all`: `['favorites']`
  - `lists()`: `['favorites', 'list']`

*Tệp: `features/profile/hooks/queryKeys.ts`*
- **`profileKeys`**:
  - `all`: `['profile']`
  - `detail()`: `['profile', 'detail']`

---

## 3. Danh sách Zustand Stores (Global Client State)
Các Context Provider cồng kềnh sẽ bị xóa bỏ và thay bằng các hook của Zustand.

- **`useAuthStore`**:
  - State: `user`, `isAuthenticated`, `role`.
  - Actions: `setCredentials`, `logout`.
  - Storage: Tích hợp với localStorage/sessionStorage.

- **`useToastStore`**:
  - State: `toasts` (array thông báo).
  - Actions: `addToast`, `removeToast`, `clearAll`.

- **`useCartStore`**:
  - State: `cartCount`.
  - Actions: `setCartCount`, `increment`, `decrement`.
  - Đồng bộ: Store này đóng vai trò UI state phản ứng nhanh (hiển thị giỏ hàng trên Navbar) mà không cần phải wait React Query.

- **`useUiStore`** (Nếu cần):
  - State: `theme`, `isSidebarOpen`, `globalLoadingModal`.

---

## 4. Mapping Chi tiết (Current State → Target Architecture)

| Hiện trạng (Thủ công) | Kiến trúc mục tiêu (TanStack Query / Zustand) | Ghi chú |
| :--- | :--- | :--- |
| **Global:** | | |
| `AuthContext` + `useState(user)` | `useAuthStore()` (Zustand) | Tránh re-render toàn app khi user thay đổi |
| `ToastContext` + `useState(toasts)` | `useToastStore()` (Zustand) | Dễ dàng gọi `addToast()` ở mọi nơi kể cả file thường ngoài UI |
| `CartContext` + `useState(cartCount)`| `useCartStore()` (Zustand) | Đồng bộ qua hook thay vì truyền sâu |
| **Server State:** | | |
| `homepage.store.ts` (`sections`, `isLoading`) | `useGetHomepageSections()` (Query) | Auto loading, error fallback |
| `products.store.ts` (`products`, `isLoading`, `totalPages`) | `useGetProducts(filters)` (Query) | Query tự động re-fetch khi `filters` thay đổi |
| `productDetail.store.ts` (`product`, `reviewList`, `loading`) | `useGetProductDetail(id)` (Query) | Cache data ngay khi user nhấn từ danh sách |
| `cart.store.ts` (`items`, `relatedProducts`, `deliveryInfo`) | `useGetCartItems()`, `useGetRelated()` | Optimistic Update khi tăng/giảm SL hàng |
| **Client State (Giữ nguyên local `useState`):** | | |
| `products.controller.ts` (`currentPage`, `pageInput`) | `useState` tại Controller | Truyền giá trị xuống hook TanStack Query |
| `productDetail.controller.ts` (`quantity`, `selectedAttr`) | `useState` tại Controller | Form UI cục bộ, không lưu trữ server |
| `section.controller.ts` (`startIndex`) | `useState` tại Controller | Animation slide |
| `authPage.controller.ts` (`currentView`) | `useState` tại Controller | Toggle Đăng nhập/Đăng ký |

---

## 5. Thứ tự Migration an toàn
Để không làm gián đoạn hệ thống và tránh break code, lộ trình thực hiện sẽ chia làm 4 Phase.

### Phase 1: Foundation (Thiết lập nền tảng)
- **Mục tiêu**: Cài đặt thư viện, thiết lập Providers và thay thế thành phần ít rủi ro nhất.
- **Công việc**:
  - Cài đặt `@tanstack/react-query`, `@tanstack/react-query-devtools` và `zustand`.
  - Wrap `<QueryClientProvider>` ở `main.tsx`.
  - Tạo `core/store/useToastStore.ts` -> Gỡ bỏ `ToastContext` và migrate toàn bộ Toast sang Zustand.

### Phase 2: Read-Only Data (Dữ liệu tĩnh & Tra cứu)
- **Mục tiêu**: Ứng dụng TanStack Query cho các trang chỉ hiển thị dữ liệu (không có Thao tác Sửa/Xóa).
- **Công việc**:
  - Tạo `useGetHomepageSections` -> Refactor `homepage.store.ts`.
  - Tạo `useGetProducts` -> Refactor `products.store.ts`. (Xóa bỏ `useEffect` fetch data).
  - Tạo `useGetProductDetail` -> Refactor `productDetail.store.ts`.

### Phase 3: Global State & Authentication
- **Mục tiêu**: Loại bỏ phần còn lại của Context API.
- **Công việc**:
  - Khởi tạo `useAuthStore` -> Gỡ bỏ `AuthContext` ở `auth.provider.tsx`.
  - Cập nhật AuthGuard và Axios Interceptor để đọc/ghi token từ `useAuthStore`.
  - Khởi tạo `useCartStore` -> Gỡ bỏ `CartContext`.

### Phase 4: Mutations & Complex Logic
- **Mục tiêu**: Xử lý các logic phức tạp như cập nhật giỏ hàng, đánh giá.
- **Công việc**:
  - Tạo các hook `useAddToCart`, `useUpdateCartItem`, `useRemoveCartItem` (React Query Mutations) kèm Optimistic Updates.
  - Refactor `cart.store.ts` hoàn toàn sang Query.
  - Xử lý tương tự với tính năng Favorite và Submit Review.

---

## 6. Các file bị ảnh hưởng
- **App Root**: `main.tsx`, `App.tsx` (Thêm/bớt Providers).
- **Context/Providers**: Xóa bỏ hoàn toàn thư mục `context` của `Auth`, `Toast`, `Cart`.
- **Pages Store**: 
  - `src/apps/client/pages/homepage/homepage.store.ts`
  - `src/apps/client/pages/products/products.store.ts`
  - `src/apps/client/pages/productDetail/productDetail.store.ts`
  - `src/apps/client/pages/cart/cart.store.ts`
- **Features**: Cần thêm thư mục `hooks` (queries, mutations, keys) cho các tính năng: `cart`, `products`, `favorite`, `profile`, `review`.

## 7. Ước lượng phạm vi thay đổi
- **Số lượng file thêm mới**: ~15-20 files (chủ yếu là các custom hooks rất ngắn gọn đóng gói logic của React Query và các Zustand store độc lập).
- **Số lượng file chỉnh sửa/xóa**: ~10 files (chỉnh sửa các `*.store.ts` để xóa logic `useEffect` và thủ công `useState`; xóa hoàn toàn các Provider file cũ).
- **Độ phức tạp**: Trung bình - Cao. (Phase 1, 2 khá đơn giản, Phase 3 ảnh hưởng luồng bảo mật cần cẩn thận, Phase 4 khó nhất do cơ chế Optimistic Updates).
- **Rủi ro hồi quy (Regression)**: Thấp ở giai đoạn View, vì API đầu ra của các file `*.store.ts` cấp cho Controller vẫn được giữ nguyên (vẫn return `{ data, isLoading, error }`), chỉ thay đổi "ruột" ở bên trong Store.
