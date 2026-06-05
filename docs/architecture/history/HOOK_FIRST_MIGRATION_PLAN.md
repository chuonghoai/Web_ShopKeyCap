# Kế Hoạch Migration Kiến Trúc Hook-First (Loại bỏ Pass-through Store)
**Tệp**: `HOOK_FIRST_MIGRATION_PLAN.md`
**Dự án**: Web_ShopKeyCap

Dựa trên yêu cầu kiến trúc mới, chúng ta sẽ thiết lập lại ranh giới rõ ràng cho các Layer để loại bỏ sự thừa thãi. Data flow mới sẽ được tinh gọn để Controller trực tiếp lấy dữ liệu từ Feature Hooks.

---

## 1. Các Quy Tắc Kiến Trúc (Architecture Rules) Cập Nhật

1. **Không tạo ViewModel cho các màn hình chỉ sử dụng 1 query**:
   - Các màn hình như Homepage, Products, Favorites.
   - Controller phải gọi query trực tiếp. KHÔNG tạo layer trung gian chỉ để forward dữ liệu (Ví dụ cấm: `useProductsViewModel() -> useProductsQuery()`).

2. **Chỉ được tạo ViewModel khi**:
   - Kết hợp từ nhiều query.
   - Hoặc có business logic tổng hợp phức tạp (ví dụ: `Product Detail`, `Cart`, `Checkout`).

3. **React Query là nguồn sự thật duy nhất (Single Source of Truth) cho Server State**:
   - KHÔNG duplicate state bằng `useState`.
   - KHÔNG copy data từ query sang Zustand hay Store nội bộ.

4. **Cart Badge Count (Đếm số lượng giỏ hàng)**:
   - Phải ưu tiên derive từ React Query cache (sử dụng `useQuery` để lấy từ cache).
   - Chỉ sử dụng Zustand nếu có lý do hiệu năng hoặc UX đặc biệt.

5. **Xử lý Token và Auth State**:
   - Token KHÔNG lưu trong Zustand nếu chỉ phục vụ Axios Interceptor. Ưu tiên giữ trong `token.service.ts` / `userStorage.service.ts`.
   - Trạng thái User hiển thị trên UI có thể sử dụng TanStack Query (vd: `useUserProfileQuery()`) thay vì Context.

6. **Giới hạn của Zustand**:
   - Chỉ dùng cho Global Client State (Toast, Theme, Sidebar State, Modal State).
   - Tuyệt đối không dùng Zustand để lưu: Products, Product Detail, Reviews, Cart Items, Profile Data, Homepage Sections.

---

## 2. Những Store sẽ bị xóa hoàn toàn
Các store chỉ thực hiện 1 hoặc các query độc lập, không có logic composition phức tạp:
- `homepage.store.ts` ➔ Xóa. Di chuyển sang `homepage.controller.ts`.
- `products.store.ts` ➔ Xóa. Di chuyển sang `products.controller.ts`.

## 3. Những Store đổi thành ViewModel/Composition Layer
Các store kết hợp nhiều nguồn dữ liệu (nhiều queries khác nhau) hoặc cần xử lý mapping trước khi ném cho Controller:
- `productDetail.store.ts` ➔ **Đổi thành `useProductDetailViewModel.ts`**: Nơi này sẽ gom `useProductDetailQuery(id)` và `useReviewsQuery(id)` lại với nhau.
- `cart.store.ts` ➔ **Đổi thành `useCartViewModel.ts`**: Nơi này sẽ kết hợp `useCartItemsQuery()`, `useRelatedProductsQuery()` và `useDeliveryInfoQuery()`.

## 4. Cấu trúc thư mục mới

```text
src/
├── core/
│   ├── store/                # Chứa Zustand Global Stores (Chỉ Client State)
│   │   └── useToastStore.ts  # Quản lý Toast
│   ├── auth/                 # Quản lý Token và User Auth Query
│
├── apps/client/
│   ├── features/[feature]/
│   │   ├── hooks/            # TanStack Query Hooks
│   │   │   ├── queries/useProductsQuery.ts
│   │   │   └── mutations/useAddToCartMutation.ts
│   │
│   ├── pages/[page]/
│   │   ├── [page].tsx                   # View
│   │   ├── [page].controller.ts         # Controller (gọi trực tiếp hooks)
│   │   └── use[Page]ViewModel.ts        # (Tùy chọn) Chỉ tồn tại nếu có composition
```

## 5. Ví dụ Code Pattern Chuẩn (Direct Query Call)

**Tệp**: `products.controller.ts` (Sau khi xóa `products.store.ts`)
```tsx
import { useState } from 'react';
import { useProductsQuery } from '../../features/products/hooks/queries/useProductsQuery';

export function useProductsController() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ category: [], type: [], brand: [] });

  // Nguồn sự thật duy nhất cho Server State
  const { data, isLoading, isError } = useProductsQuery({ page: currentPage, filters });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1); 
  };

  return {
    products: data?.items || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    isError,
    currentPage,
    filters,
    handlePageChange: setCurrentPage,
    handleFilterChange
  };
}
```

## 6. Danh sách File Cần Refactor
**XÓA (Delete):**
- `src/components/toast/toast.tsx` (Context API)
- `src/core/auth/auth.context.tsx` & `auth.provider.tsx`
- `src/apps/client/features/cart/context/cart.context.tsx` & `cart.provider.tsx`
- `src/apps/client/pages/homepage/homepage.store.ts`
- `src/apps/client/pages/products/products.store.ts`

**TẠO MỚI (Create):**
- Cấu hình: `src/lib/queryClient.ts`
- Zustand Stores: `useToastStore.ts` (Chỉ duy nhất Toast).
- React Query Hooks: `products`, `cart`, `favorite`, `profile`, `review`, `auth` (để thay thế Context User).

**CHỈNH SỬA & ĐỔI TÊN (Modify/Rename):**
- `homepage.controller.ts`: Gọi Query Hooks.
- `products.controller.ts`: Gọi Query Hooks.
- `productDetail.store.ts` ➔ `useProductDetailViewModel.ts`.
- `cart.store.ts` ➔ `useCartViewModel.ts`.

## 7. Kế hoạch Migration Cập Nhật (Hook-First)

- **Phase 1: Foundation Setup**:
  - Cài đặt `@tanstack/react-query` & `zustand`.
  - Khởi tạo `queryClient.ts` và bọc `QueryClientProvider` tại `main.tsx`.
  - Chuyển đổi Toast Notification sang `useToastStore` (Zustand).

- **Phase 2: Auth & Cart Context Elimination**:
  - Viết Query Hook `useUserQuery()` để truy xuất user profile lưu vào cache, loại bỏ `AuthContext`.
  - Cart Badge Count đọc trực tiếp từ cache hoặc dùng Query Hook `useCartSummaryQuery()`. Xóa `CartContext`.
  - Giữ token trong `token.service.ts` và dùng để setup axios auth header.

- **Phase 3: Controller Hook-First Refactoring (Read-Only)**:
  - Triển khai `useHomepageSectionsQuery` vào `homepage.controller.ts`. Xóa `homepage.store.ts`.
  - Triển khai `useProductsQuery` vào `products.controller.ts`. Xóa `products.store.ts`.

- **Phase 4: ViewModel Composition Refactoring**:
  - Triển khai các hooks cho chi tiết sản phẩm. Đổi tên `productDetail.store.ts` thành `useProductDetailViewModel.ts` và gộp các query.
  - Triển khai các queries/mutations cho Giỏ hàng. Đổi tên `cart.store.ts` thành `useCartViewModel.ts` và xử lý Optimistic Updates.

- **Phase 5: Clean Up & Verification**:
  - Chạy `npm run build` để kiểm tra độ nghiêm ngặt của TypeScript.
  - Hoàn thiện `STATE_MIGRATION_REPORT.md`.
