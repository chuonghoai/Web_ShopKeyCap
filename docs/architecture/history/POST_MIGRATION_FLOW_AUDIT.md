# POST_MIGRATION_FLOW_AUDIT

*Tài liệu này ghi lại kết quả Audit toàn diện luồng dữ liệu (State Management Flow) sau khi di chuyển sang kiến trúc TanStack Query + Zustand.*

---

## 1. PUBLIC PAGE AUDIT

**Các trang Public (không yêu cầu đăng nhập):**
- `/` (Homepage)
- `/products` (Products Page)
- `/product/:slug` (Product Detail)
- Các trang Auth (`/login`, `/register`, `/forgot-password`, `/reset-password`)

**Kết quả Audit đối với Guest User (Không có Token):**
- **Hooks được mount:**
  - `useUserProfileQuery()`: Chạy mặc định thông qua `AuthGuard` và `HeaderController`. Truy xuất dữ liệu từ `userStorageService` (Local Storage) trả về `null`. Không kích hoạt gọi API dư thừa.
  - `useCartCount()`: Chạy ở Header để đếm số sản phẩm trong giỏ hàng.
- **Tính ổn định của Guest Flow:**
  - Tại hook `useCartCount()`, có cơ chế chặn: `if (!hasToken) return 0;`. Do đó React Query không được kích hoạt (`enabled: false`), không có lỗi 401 xảy ra.
  - **Redirect ngoài ý muốn:** Không xảy ra. Guest truy cập an toàn mọi trang Public. Component Header, Navbar và Layout hiển thị đúng trạng thái "Chưa đăng nhập" (không lỗi).

---

## 2. PRIVATE PAGE AUDIT

**Các trang Private:**
- `/profile`
- `/cart`

**Mô phỏng các trường hợp truy cập:**
1. **Không có token (Guest):**
   - **Guard chạy:** `AuthGuard` lấy `tokenService.getAccessToken()` trả về `null`.
   - **Redirect:** Chuyển hướng ngay lập tức về `/login` với lệnh `replace`. Trải nghiệm an toàn, không rò rỉ layout mờ.
2. **Token hợp lệ:**
   - **Component mount:** Render `<Outlet />`.
   - **Query chạy:** Tại trang `/cart`, hook `useCartQuery()` kích hoạt fetch dữ liệu giỏ hàng thật (`enabled: true`). 
3. **Token hết hạn (Expired Token):**
   - **Guard:** Vì không decode JWT, `AuthGuard` vẫn cho phép render `CartPage`.
   - **Query:** `useCartQuery()` thực thi và API trả về `401 Unauthorized`.
   - **Interceptor:** `error.interceptor.ts` bắt được lỗi 401 (khác đường dẫn `/login`).
   - **Redirect:** Chuyển hướng tự động về `/login?reason=expired` (chạy qua `window.location.href`).
4. **User Role không hợp lệ:**
   - **Guard:** Chặn tại `!allowedRoles.includes(user.role)`.
   - **Redirect:** Chuyển hướng về `/login?reason=unauthorized`.

---

## 3. AUTH FLOW AUDIT

- **Login (`useLoginMutation`):** 
  - Call API `authService.login`.
  - Save token và user profile vào Local Storage (`tokenService`, `userStorageService`).
  - Gọi `queryClient.setQueryData(profileKeys.user(), data.user)` -> React Query Cache được cấp dữ liệu ngay lập tức, UI cập nhật mượt mà.
- **Logout (`useLogoutMutation`):**
  - Đã thực thi chính xác:
    - `userStorageService.clear()`
    - `cartSummaryStorageService.clear()`
    - `tokenService.clear()`
    - `queryClient.clear()` (Chạy trong khối `onSuccess`).
- **F5 Reload / Session Restore:**
  - Không có call API "verify token" nào khi Reload. Dữ liệu User được restore hoàn toàn từ Local Storage với `staleTime: Infinity`. 

---

## 4. CART SYNCHRONIZATION AUDIT (CRITICAL)

Đây là luồng phức tạp nhất liên quan đến sự đồng bộ của Header Cart Badge.

| Case | Flow | Hoạt động ngầm (Code Audit) | Tình trạng Cache / Badge | Đánh giá |
|:---|:---|:---|:---|:---|
| **1 & 2** | Thêm sp vào giỏ ở Product Detail / Products | `useAddToCartMutation` chạy, sau đó gọi `queryClient.invalidateQueries(cartKeys.all)`. | **Không cập nhật!** Vì `useCartCount` đang set `enabled: false`. Lệnh `invalidate` chỉ đánh dấu cache bị cũ (stale), nhưng do không có active listener nào được `enabled`, React Query không tự động fetch lại API. | ❌ Lỗi mất đồng bộ |
| **3** | Sửa số lượng trong `/cart` | `useUpdateCartItemMutation` gọi Optimistic Update thông qua `setQueryData`. | **Thiếu trường cartCount!** Function `setQueryData` cập nhật số lượng item, nhưng quên cập nhật tổng `summary.cartCount` bên trong cache. | ❌ Lỗi mất đồng bộ |
| **4** | Xóa sản phẩm trong `/cart` | `useDeleteCartItemMutation` gọi Optimistic Update thông qua `setQueryData`. | Đã gán `cartCount: newCartCount ?? oldData.summary.cartCount`. Cache được update hoàn chỉnh. | ✅ Hoạt động tốt |
| **5** | Đăng xuất -> Đăng nhập lại user khác | `useLoginMutation` không khởi tạo dữ liệu giỏ hàng. `useCartCount()` đọc từ Storage trống rỗng. | Header Badge sẽ hiển thị `0` mặc dù API có giỏ hàng, cho đến khi user bấm vào trang `/cart` lần đầu tiên. | ❌ Lỗi thiếu hydration |

---

## 5. CACHE CONSISTENCY AUDIT

Sau khi rà soát các hàm thay đổi cache trực tiếp (`setQueryData`, `invalidateQueries`, `clear`), phát hiện 2 điểm mất đồng bộ nghiêm trọng:

1. **`error.interceptor.ts` (Dòng 14-23)**
   - **Root Cause:** Khi gặp lỗi 401, interceptor chỉ gọi `userStorageService.removeUser()` và đổi trang bằng `window.location.href`. 
   - **Impact:** `tokenService` không bị xóa. `queryClient` (mặc dù bị xóa do load trang) nhưng Local Storage giữ lại 1 token đã hết hạn. Nếu login lại có thể xung đột.
   - **Severity:** High.
2. **`useAddToCartMutation.ts` (Dòng 14)**
   - **Root Cause:** Trả về API có `newCartCount` nhưng bị bỏ qua. Dùng `invalidateQueries` mù lòa trong khi không có component nào `enabled: true` đang lắng nghe. `cartSummaryStorageService` cũng không được update.
   - **Impact:** Header Cart Badge luôn hiển thị sai số lượng cho đến khi F5 trang `/cart`.
   - **Severity:** Critical.

---

## 6. ARCHITECTURE RULE VIOLATIONS

Tuyệt vời! Không phát hiện vi phạm kiến trúc nào được thiết lập ban đầu:
- ✅ **Không dùng useState(query.data):** Toàn bộ dữ liệu UI đều được liên kết trực tiếp từ query hook.
- ✅ **Không dùng Context Provider / Store Wrapper lạ:** Cấu trúc rất sạch sẽ.
- ✅ **Không hardcode Query Keys:** Toàn bộ sử dụng qua `profileKeys`, `cartKeys`, `reviewKeys`.
- ✅ **Không đưa Server State vào Zustand:** Zustand hiện tại chỉ giới hạn cho Toast UI State.

---

## 7. RECOMMENDATIONS & FIXES (HÀNH ĐỘNG CẦN LÀM)

Để dự án hoàn hảo 100%, hãy thực hiện các bản vá (Patch) sau:

1. **Vá lỗi Cart Badge khi Add To Cart (`useAddToCartMutation`):**
   - Đọc `newCartCount` từ response.
   - Tự tay update cache thay vì `invalidateQueries`:
     ```typescript
     queryClient.setQueryData(cartKeys.items(), (oldData: any) => ({ ...oldData }));
     ```
   - Cập nhật Local Storage: `cartSummaryStorageService.save(res.data.newCartCount)`.
2. **Vá lỗi Header Badge sau khi Đăng Nhập (`useLoginMutation`):**
   - Khi onSuccess, nên gọi thêm 1 lệnh fetch hoặc hydrate Cart Summary: `queryClient.prefetchQuery(...)` hoặc fetch qua axios thuần để set giá trị khởi tạo.
3. **Vá lỗi rác Token (`error.interceptor.ts`):**
   - Thay vì chỉ remove User, hãy gọi thêm `tokenService.clear()` và `cartSummaryStorageService.clear()` trước khi redirect.
4. **Vá lỗi tính toán thiếu ở `useUpdateCartItemMutation`:**
   - Bổ sung logic tính toán tổng `newCartCount` bên trong khối `setQueryData` của Optimistic Update.
