# Quy tắc Kiến trúc (Architecture Rules)

Bộ quy tắc này hướng dẫn cách tổ chức code và thêm mới tính năng theo kiến trúc MVC Hook và Feature-Sliced đang có trong dự án.

## 1. Khi nào tạo Feature
* **Purpose**: Gom nhóm code thuộc về một miền nghiệp vụ (domain) cụ thể để có thể tái sử dụng.
* **Required**: Khi bạn có các entities độc lập (như Product, Cart, User, Review) cần xử lý dữ liệu qua API.
* **Forbidden**: Tạo feature cho những logic thuần UI (như Button, Modal).
* **Example**: `src/apps/client/features/cart/`

## 2. Khi nào tạo Page
* **Purpose**: Tạo một giao diện hoàn chỉnh ánh xạ với một URL cụ thể trên hệ thống.
* **Required**: Khi thêm một màn hình/route mới.
* **Forbidden**: Sử dụng Page class/hook ở những nơi không phải là entry point của một route.
* **Example**: `src/apps/client/pages/productDetail/`

## 3. Khi nào tạo Service
* **Purpose**: Chứa logic nghiệp vụ không phụ thuộc vào framework UI (React). Chuyển đổi DTO thành Model.
* **Required**: Trong thư mục feature, khi cần gọi API và xử lý data format.
* **Forbidden**: Chứa logic liên quan tới React (như hook `useState`, `useEffect`, DOM manipulation).
* **Example**: `product.service.ts`

## 4. Khi nào tạo Repository
* **Purpose**: Trừu tượng hóa nguồn dữ liệu (API, Mock, LocalStorage).
* **Required**: Bắt buộc phải tạo interface Repo và ít nhất một ApiRepo, một MockRepo khi khai báo một Model cần lưu trữ.
* **Forbidden**: Gọi trực tiếp `axios` trong Service hay Controller. Bắt buộc phải qua Repository.
* **Example**: `productApi.repo.ts`, `productMock.repo.ts`

## 5. Khi nào tạo Controller (`[name].controller.ts`)
* **Purpose**: Xử lý logic hiển thị, tương tác với URL (search parameters) và trả về state/handlers cho View.
* **Required**: Mọi thư mục Page đều phải có một controller, trừ khi page đó hoàn toàn tĩnh.
* **Forbidden**: Fetch API trực tiếp. Trả về JSX/React Node.
* **Example**: `products.controller.ts`

## 6. Khi nào tạo Feature Hooks (TanStack Query / Zustand)
* **Purpose**: Quản lý Server State (TanStack Query) và Global Client State (Zustand).
* **Required**: Khi Controller cần lấy dữ liệu từ API hoặc thay đổi dữ liệu (Mutations).
* **Forbidden**: Sử dụng `useState` để lưu lại (mirror) dữ liệu từ `query.data`. Trả về hàm event UI thuần túy.
* **Example**: `useProductsQuery.ts`, `useToastStore.ts`

## 7. Khi nào tách Component
* **Purpose**: Tránh việc file View (`.tsx`) quá dài (trên 200 dòng), tái sử dụng UI.
* **Required**:
  - Nếu component dùng cho nhiều trang => Đưa vào `src/apps/[app]/components/` hoặc `src/components/`.
  - Nếu component chỉ dùng ở 1 trang => Đưa vào thư mục `components/` bên trong thư mục page đó.
* **Forbidden**: Viết logic gọi API, khai báo state phức tạp bên trong component con. Component con nên dùng props.
* **Example**: `src/apps/client/pages/homepage/components/ProductCard.tsx`
