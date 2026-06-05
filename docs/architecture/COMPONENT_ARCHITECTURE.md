# Component Architecture Standard

## 1. Nguyên Tắc Trách Nhiệm Đơn Lẻ (Component Responsibility)
Trong dự án này, một React Component (hay Presentational Component) **chỉ chịu trách nhiệm**:
- Render UI (HTML/JSX).
- Quản lý Styling.
- Mapping dữ liệu từ Props hoặc Controller ra giao diện.
- Khai báo các UI helper nội bộ cực nhỏ (VD: map enum ra màu badge).

## 2. Khi Nào Bắt Buộc Tạo Controller?
Nếu một component chứa các logic phức tạp vượt ngoài phạm vi hiển thị thuần túy, **bắt buộc phải tách logic ra một file Controller riêng** (`use[ComponentName].controller.ts`).

Các dấu hiệu vi phạm cần tách Controller:
- Có chứa Mutation Hook (`useMutation`) hoặc tự gọi trực tiếp API Services.
- Quản lý luồng thời gian: Debounce, Throttling, setTimeout, setInterval.
- Xử lý Validation dữ liệu (như validate form, input rỗng, giới hạn min/max).
- Có Orchestration Logic (VD: click một nút vừa phải update UI optimistic, vừa gọi API, vừa điều hướng trang).
- Quản lý nhiều Event Handler phức tạp lồng vào nhau.
- Business Rules (quy tắc nghiệp vụ).

## 3. Quy Tắc Khai Báo Component Controller
- Thư mục: Đặt trong thư mục con `componentControllers/` nằm cùng cấp với nơi chứa component.
- Tên file: BẮT BUỘC theo chuẩn naming convention: `use[ComponentName].controller.ts`.
- **Cấm tạo Pass-through Controller:** Không được phép tạo Controller rỗng chỉ với mục đích forward dữ liệu một cách máy móc. Controller chỉ được sinh ra khi component thực sự cần giải quyết bài toán nghiệp vụ/validation.

## 4. Ví Dụ Thực Tiễn

### ✘ Ví Dụ Xấu (Vi Phạm Trách Nhiệm)
```tsx
// Không tách Controller, nhét toàn bộ state, validation, event handler vào Component
export const CartItemCard = ({ item, onUpdate }) => {
    const [val, setVal] = useState(item.qty);

    const handleBlur = () => {
        // Validation Logic
        if (val < 1) setVal(1); 
        // Orchestration Logic
        onUpdate(val); 
    };

    return <input value={val} onBlur={handleBlur} />;
};
```

### ✅ Ví Dụ Tốt (Tuân Thủ Tiêu Chuẩn)
```typescript
// componentControllers/useCartItemCard.controller.ts
export const useCartItemCardController = (item, onUpdate) => {
    const [val, setVal] = useState(item.qty);
    const handleBlur = () => {
        if (val < 1) setVal(1);
        onUpdate(val);
    };
    return { val, handleBlur };
};
```

```tsx
// CartItemCard.tsx
export const CartItemCard = ({ item, onUpdate }) => {
    const controller = useCartItemCardController(item, onUpdate);
    return <input value={controller.val} onBlur={controller.handleBlur} />;
};
```

## 5. File Naming Convention
Toàn bộ dự án áp dụng chuẩn hậu tố `.feature.ts` cho các file kiến trúc React:
- Controller: `useFeature.controller.ts`
- ViewModel: `useFeature.viewmodel.ts`
- Query: `useFeature.query.ts`
- Mutation: `useFeature.mutation.ts`
- Service: `feature.service.ts`
- Repository: `feature.repository.ts`
- Guard: `feature.guard.tsx`
- Interceptor: `feature.interceptor.ts`
