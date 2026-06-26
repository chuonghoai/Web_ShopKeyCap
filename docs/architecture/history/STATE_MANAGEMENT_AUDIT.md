# Báo Cáo Đánh Giá Tình Trạng Quản Lý State
**Tệp**: `STATE_MANAGEMENT_AUDIT.md`
**Dự án**: Web_ShopKeyCap

## 1. Tổng quan kiến trúc hiện tại
Dự án được tổ chức dựa trên sự kết hợp giữa **Feature-Sliced Design (FSD)** và mô hình **MVC Hooks Pattern**.
- **Luồng dữ liệu**: `View (.tsx)` -> `Controller (.controller.ts)` -> `Store (.store.ts)` -> `Service (.service.ts)` -> `Repository (.repo.ts)`.
- **Thực trạng State Management**: Không sử dụng các thư viện quản lý state toàn cục (như Redux, Zustand) hay quản lý server state (như TanStack Query). Trạng thái (đặc biệt là Server State) được quản lý một cách hoàn toàn thủ công thông qua `useState` và `useEffect` bên trong các tệp `*.store.ts` và `Context API`. Điều này dẫn đến lượng lớn boilerplate code cho việc xử lý các cờ `isLoading`, `error` và thao tác lưu trữ cache thủ công.

## 2. Danh sách Page
- **Client**:
  - `Homepage` (Trang chủ)
  - `Products` (Danh sách sản phẩm)
  - `ProductDetail` (Chi tiết sản phẩm)
  - `Cart` (Giỏ hàng)
- **Auth**:
  - `Auth` (Trang Xác thực Login/Register nguyên khối)
- **Admin**:
  - `AdminDashboard` (Đang nằm dưới dạng placeholder component trong thư mục routes)

## 3. Danh sách Feature/Module
Dự án hiện đang cấu trúc các modules nghiệp vụ (Features) sau:
1. **Cart**: 
   - *Chức năng*: Quản lý giỏ hàng, thông tin thanh toán.
   - *Mức độ hoàn thiện*: Cao (có Context Provider, Storage, đầy đủ API/Mock repo).
   - *Components*: `cartRelatedProducts`.
   - *Hooks*: `useCart`.
   - *Repositories*: `cartApi.repo.ts`, `cartMock.repo.ts`.
2. **Favorite**: 
   - *Chức năng*: Sản phẩm yêu thích.
   - *Mức độ hoàn thiện*: Cơ bản.
   - *Repositories*: `favoriteApi.repo.ts`, `favoriteMock.repo.ts`.
3. **Products**: 
   - *Chức năng*: Xử lý lấy thông tin, danh sách sản phẩm.
   - *Mức độ hoàn thiện*: Cao.
   - *Repositories*: `productApi.repo.ts`, `productMock.repo.ts`.
4. **Profile**: 
   - *Chức năng*: Quản lý hồ sơ người dùng.
   - *Mức độ hoàn thiện*: Cơ bản.
   - *Repositories*: `profileApi.repo.ts`, `profileMock.repo.ts`.
5. **Review**: 
   - *Chức năng*: Xử lý bình luận, đánh giá.
   - *Mức độ hoàn thiện*: Trung bình.
   - *Repositories*: `reviewApi.repo.ts`, `reviewMock.repo.ts`.
6. **Auth**: 
   - *Chức năng*: Xác thực người dùng, JWT.
   - *Mức độ hoàn thiện*: Cao.
   - *Repositories*: `authApi.repo.ts`, `authMock.repo.ts`.

## 4. Danh sách State hiện tại
Dưới đây là thống kê toàn bộ nơi đang quản lý state thủ công.

### Quản lý bằng `useState` & `Context API`:
| File | State Name | Phân loại | Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| `auth.provider.tsx` | `user` | **Server State** | Context API - Lưu thông tin user đang đăng nhập toàn cục |
| `cart.provider.tsx` | `cartCount` | **Server State** | Context API - Lưu số lượng item trong giỏ hàng (hiển thị ở Navbar) |
| `toast.tsx` | `isVisible`, `toasts` | **Client State** | Context API - Quản lý hàng đợi và hiển thị thông báo |
| `products.store.ts` | `products`, `totalPages` | **Server State** | Lưu danh sách sản phẩm từ API và phân trang |
| `products.store.ts` | `filter`, `isLoading` | **Client State** | Lưu bộ lọc (category, brand, type) và cờ loading |
| `products.controller.ts` | `currentPage`, `pageInput` | **Client State** | Xử lý logic chuyển trang UI |
| `productDetail.store.ts`| `product`, `reviewList`, `totalElements`, `totalPages` | **Server State** | Lưu chi tiết sản phẩm và danh sách đánh giá từ API |
| `productDetail.store.ts`| `isLoading`, `error`, `loadingReview`, `errorReview` | **Client State** | Các cờ loading và error handling thủ công |
| `productDetail.controller.ts`| `selectedAttributes`, `quantity`, `isAddingToCart`| **Client State** | Trạng thái UI khi user chọn size/màu và số lượng |
| `homepage.store.ts` | `sections` | **Server State** | Lưu cấu trúc nội dung trang chủ gọi từ API |
| `section.controller.ts` | `startIndex` | **Client State** | Trạng thái slider/carousel UI trên trang chủ |
| `cart.store.ts` | `items`, `relatedProducts`, `deliveryInfo` | **Server State** | Thông tin các item trong giỏ hàng và sp liên quan |
| `cart.store.ts` | `totalPrice`, `isLoading`, `loadingRelatedProducts`, `loadingDelivery` | **Client State** | State tính toán phía client và loading indicators |
| `cartRelatedProducts.controller.ts` | `currentIndex`, `itemsPerView` | **Client State** | Trạng thái carousel của slider sản phẩm giỏ hàng |
| `authPage.controller.ts`| `currentView`, `resetEmail`, `mousePos` | **Client State** | Logic chuyển tab Login/Register và hiệu ứng UI |

### Quản lý bằng Local Storage:
- `USER` (`userStorage.service.ts`): Cache thông tin User.
- `ACCESS_TOKEN_KEY` (`token.service.ts`): Lưu JWT Token.
- `CART_SUMMARY_KEY` (`CartSummaryStorage.service.ts`): Cache số lượng giỏ hàng để tránh gọi API.

## 5. Đề xuất: State nên chuyển sang TanStack Query
Tất cả các state thuộc loại **Server State** đang được lưu giữ trong các `*.store.ts` nên được chuyển sang TanStack Query:
- `products`, `product` (Chi tiết), `reviewList`, `sections`, `items` (giỏ hàng), `relatedProducts`, `deliveryInfo`.
- **Lý do**: Giải phóng hoàn toàn các boilerplate code liên quan đến `isLoading`, `error`. Cung cấp sẵn cơ chế caching, re-fetching background, invalidation (khi user thao tác xong như thêm vào giỏ hàng), và optimistic updates. Tránh việc phải dùng `useEffect` để fetch data thủ công.

## 6. Đề xuất: State nên chuyển sang Zustand
Các state dạng **Global Client State** hoặc Server state mang tính chất toàn cục đang bị lạm dụng bởi Context API:
- **Toast Queue State** (`toasts` trong `toast.tsx`).
- **Cart Summary State** (`cartCount` trong `cart.provider.tsx`).
- **User Authentication State** (có thể đưa JWT và role vào Zustand để dùng dễ dàng ở các Service/Interceptor mà không cần hook).
- **Lý do**: Context API gây re-render toàn bộ DOM tree bên dưới nếu không tối ưu hóa cẩn thận bằng `useMemo`. Zustand hỗ trợ subscribe ngoài React Tree (rất tốt khi muốn gọi thông báo Toast hoặc Auth Check từ trong tầng Service thay vì View).

## 7. Đề xuất: State nên giữ ở local (`useState`)
Các state thuần **UI/Component State** chỉ có ý nghĩa trong một vòng đời ngắn của component:
- Các state form/input: `filter`, `pageInput`, `quantity`, `resetEmail`, `selectedAttributes`.
- Các state UI animation/tabs: `currentView` (login/register), `startIndex` / `currentIndex` (carousel), `mousePos`.
- **Lý do**: Việc đưa các state này ra global store hoặc Query sẽ làm tốn bộ nhớ vô ích, phá vỡ tính đóng gói của component.

## 8. Rủi ro khi Refactor (Migration Risks)
- **Vi phạm Kiến trúc MVC Hooks hiện tại**: Hiện tại logic nằm ở Controller, Fetching nằm ở Store (`use...Store()`), gọi xuống Service. Khi áp dụng React Query, React Query bản thân nó là một hook. Cần xác định rõ `useQuery` sẽ đặt ở tầng `Controller` hay tầng `Store` để không vi phạm Data Flow.
- **Phá vỡ tính Trừu tượng**: Các file `[feature].service.ts` đang wrap logic gọi Data. Cần có cơ chế tích hợp Promise của Service vào `queryFn` của TanStack Query một cách khéo léo.
- **Rủi ro hồi quy (Regression)**: Trang `Cart` đang có sự đan xen phức tạp giữa Server state (items) và Client state (totalPrice tự tính lại, localStorage fallback). Nếu thay đổi không khéo sẽ gây sai lệch tính toán giá trị đơn hàng.

## 9. Đề xuất Lộ trình Migration
1. **Chuẩn hóa Architecture Rules**: Cập nhật `docs/architecture/ARCHITECTURE_RULES.md` để quy định vị trí gọi hook của TanStack Query (khuyến nghị: Đưa `useQuery` vào thay thế các `useEffect` fetch data trong file `*.store.ts`).
2. **Setup Hạ tầng**: Cài đặt TanStack Query (`@tanstack/react-query`) và Zustand (`zustand`). Khởi tạo `QueryClientProvider` ở `main.tsx`.
3. **Migration Global Contexts**: Thay thế `ToastContext` và `CartContext` sang Zustand store (giảm bớt DOM lồng nhau, dễ gọi toast từ mọi nơi).
4. **Thí điểm React Query trên Homepage**: Trang chủ (`homepage.store.ts`) chỉ lấy dữ liệu `sections` đọc một lần, là đối tượng lý tưởng để test pattern tích hợp React Query với MVC Hooks.
5. **Triển khai đại trà**: Áp dụng dần cho `Products` (danh sách), `ProductDetail`, và cuối cùng là `Cart` (nơi phức tạp nhất vì có Mutations như thêm, sửa, xóa giỏ hàng cần optimistic update).
