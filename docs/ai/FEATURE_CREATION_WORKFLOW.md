# Feature Creation Workflow

Quy trình tự động cho AI Agent khi thêm tính năng/feature mới.

---

## 1. Bắt buộc ban đầu
* **Tìm ít nhất 3 feature tương tự**: Ví dụ `products`, `cart`, `review`.
* **So sánh implementation**: Nhận thấy rằng các feature đều tuân thủ kiến trúc tách biệt Model - DTO - Repo - Service.
* **Chọn pattern phổ biến nhất**: Sử dụng pattern MVC Hook kết hợp Feature Slices.

## 2. Quy trình chi tiết tạo Feature

### Bước 1: Folder Creation
Tạo cấu trúc thư mục chuẩn tại `src/apps/[app]/features/[featureName]`:
```text
[featureName]/
├── dto/
├── model/
├── repo/
├── services/
└── hooks/ (tùy chọn)
```

### Bước 2: Model & DTO Creation
- Định nghĩa type/interface cho domain object trong `model/[feature].model.ts`.
- Tạo payload input/output trong `dto/[request_name].dto.ts`.

### Bước 3: Repository Creation
- Tạo `repo/[feature].repo.ts`: Khai báo Interface (e.g. `interface ProductRepo`).
- Tạo `repo/[feature]Mock.repo.ts`: Implement interface trả về mock data (dùng `Promise.resolve`).
- Tạo `repo/[feature]Api.repo.ts`: Implement interface sử dụng `apiClient`/`axios`.

### Bước 4: Service Creation
- Tạo `services/[feature].service.ts`.
- Tạo Class (VD: `ProductService`) nhận vào `ProductRepo` (Dependency Injection).
- Cung cấp singleton export (cân nhắc cờ `USE_MOCK`).
```typescript
export const featureService = new FeatureService(
    USE_MOCK ? new FeatureMockRepo() : new FeatureApiRepo()
);
```

### Bước 5: State (Store) Creation
- Trong thư mục trang liên quan `pages/[pageName]/`.
- Tạo `[pageName].store.ts` sử dụng `useState` và gọi các hàm từ Service.

### Bước 6: Page & Routing Creation
- Tạo `[pageName].controller.ts` để đọc params, xử lý event.
- Tạo `[pageName].tsx` để render giao diện.
- Khai báo route mới tại `routes/[app].routes.tsx`.
