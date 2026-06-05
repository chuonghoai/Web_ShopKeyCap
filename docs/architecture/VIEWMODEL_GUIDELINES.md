# Hướng Dẫn Sử Dụng ViewModel (ViewModel Guidelines)

Dự án này sử dụng kiến trúc MVC Hooks Pattern (Model - View - Controller). Trong một số trường hợp, logic UI quá nặng và cần thiết kế thêm một tầng trung gian (ViewModel) để chuẩn bị dữ liệu cho Controller.

## 1. Khi nào tạo ViewModel (`use[Name].viewmodel.ts`)
Tầng ViewModel **không phải là bắt buộc**. Chỉ tạo ViewModel khi rơi vào các trường hợp sau:
* **Ghép nhiều queries**: Màn hình cần kết hợp dữ liệu từ nhiều nguồn khác nhau (Ví dụ: Trang chi tiết sản phẩm cần load Product, Reviews, và Related Products cùng lúc).
* **Ghép query + mutation**: Màn hình có dữ liệu phức tạp đi kèm với nhiều hành động tương tác (Ví dụ: Trang giỏ hàng vừa load danh sách items, vừa xử lý tính toán lại total price khi update, delete).
* **Business logic phức tạp**: Khi cần map/reduce/filter mảng dữ liệu khổng lồ từ API sang định dạng UI phù hợp trước khi đưa cho Controller.

## 2. Khi nào KHÔNG ĐƯỢC tạo ViewModel (Single Query Screen)
**Cấm tạo ViewModel** cho những màn hình đơn giản chỉ gọi đúng 1 query duy nhất.
Ví dụ:
- Homepage (Chỉ gọi `useHomepageQuery`).
- Products Page (Chỉ gọi `useProductsQuery`).

Trong các trường hợp này, **Controller phải gọi trực tiếp Query Hook**.

### Anti-Pattern: Pass-through ViewModel
```typescript
// ✘ CẤM LÀM THẾ NÀY (Pass-through vô nghĩa)
export const useProductsViewModel = () => {
    return useProductsQuery(); 
};

export const useProductsController = () => {
    const { data } = useProductsViewModel();
    return { data };
}
```

```typescript
// ✅ CHUẨN (Controller gọi trực tiếp)
export const useProductsController = () => {
    const { data } = useProductsQuery();
    return { data };
}
```

## 3. File Naming Convention
- Tên file ViewModel bắt buộc tuân theo định dạng: `use[Name].viewmodel.ts` (ví dụ: `useProductDetail.viewmodel.ts`).
- Các file liên quan cũng sử dụng chuẩn `.feature.ts` tương ứng:
  - Controller: `useFeature.controller.ts`
  - Query: `useFeature.query.ts`
  - Mutation: `useFeature.mutation.ts`
