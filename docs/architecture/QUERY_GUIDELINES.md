# Hướng Dẫn Sử Dụng TanStack Query (Query Guidelines)

Tài liệu này định nghĩa chuẩn mực khai báo và quản lý các Hooks tương tác với API.

## 1. Query Key Factory Standard
Mỗi feature gọi API bắt buộc phải định nghĩa một tập hợp các Query Keys tập trung (Factory).
Điều này giúp tránh sai sót khi gọi hàm `invalidateQueries`.

**Cấm:** Hardcode mảng trực tiếp trong Component/Hook.
```typescript
// ✘ CẤM LÀM THẾ NÀY
useQuery({ queryKey: ['products'] })
```

**Bắt buộc:** Khai báo Factory.
```typescript
// src/apps/client/features/products/hooks/productKeys.ts
export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters: string) => [...productKeys.lists(), { filters }] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: string) => [...productKeys.details(), id] as const,
};
```
Sử dụng:
```typescript
// ✅ CHUẨN
useQuery({ queryKey: productKeys.list(filters) })
```

## 2. Mutation Standard
Sau khi thực thi một Mutation (POST/PUT/DELETE) làm thay đổi dữ liệu trên server, **BẮT BUỘC** phải có hành động cập nhật lại Cache ở client.

Không bao giờ được để Cache ở trạng thái "Stale" mà không có hành động xử lý.

**Cách 1: Invalidate Queries (Làm mới ngầm)**
Dùng khi data thay đổi ảnh hưởng nhiều nơi hoặc không thể tính toán trước kết quả.
```typescript
onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: productKeys.all });
}
```

**Cách 2: Optimistic Update / Set Query Data (Cập nhật tức thời)**
Dùng khi có thể tự tính toán hoặc API trả về ngay dữ liệu mới.
```typescript
onSuccess: (newData) => {
    queryClient.setQueryData(productKeys.detail(id), newData);
}
```

## 3. Hydration & Initial Data
- Đối với dữ liệu User Profile: Khởi tạo từ `userStorageService.getUser()` (Local Storage) thông qua tham số `initialData` của `useQuery` để tránh màn hình chớp (flash) khi F5.
- Đối với dữ liệu Cart Badge: Sử dụng thuộc tính `enabled: hasToken` để kiểm soát thời điểm fetch an toàn (chỉ fetch khi đã có token).
