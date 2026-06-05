# BÁO CÁO CẬP NHẬT NAMING CONVENTION

## 1. Old Convention (Chuẩn cũ)
Trong các phiên bản trước, dự án sử dụng định dạng CamelCase kết hợp hậu tố trực tiếp để đặt tên file. Ví dụ:
- `useCartItemCardController.ts`
- `useProductDetailViewModel.ts`
- `useAddToCartMutation.ts`
- `useCartQuery.ts`

Tuy nhiên, định dạng này gây khó khăn trong việc phân biệt rạch ròi loại file và không nhất quán với định dạng `.service.ts` hay `.repository.ts` đang tồn tại.

---

## 2. New Convention (Chuẩn mới)
Dự án chính thức chuyển sang chuẩn **Dot-Notation Feature Suffix**.
Tất cả các file kiến trúc React Hooks sẽ có hậu tố `.feature.ts` rõ ràng:
- **Controller:** `use[Name].controller.ts`
- **ViewModel:** `use[Name].viewmodel.ts`
- **Query Hook:** `use[Name].query.ts`
- **Mutation Hook:** `use[Name].mutation.ts`

---

## 3. Files Updated (Danh sách file đã đổi tên)
Dưới đây là danh sách 20 file đã được script tự động tìm kiếm, đổi tên và cập nhật lại toàn bộ đường dẫn `import` trên phạm vi toàn project:

**Mutations (7 file):**
1. `useLoginMutation.ts` ➔ `useLogin.mutation.ts`
2. `useLogoutMutation.ts` ➔ `useLogout.mutation.ts`
3. `useRegisterMutation.ts` ➔ `useRegister.mutation.ts`
4. `useAddToCartMutation.ts` ➔ `useAddToCart.mutation.ts`
5. `useDeleteCartItemMutation.ts` ➔ `useDeleteCartItem.mutation.ts`
6. `useUpdateCartItemMutation.ts` ➔ `useUpdateCartItem.mutation.ts`
7. `useToggleFavoriteMutation.ts` ➔ `useToggleFavorite.mutation.ts`

**Queries (10 file):**
8. `useUserProfileQuery.ts` ➔ `useUserProfile.query.ts`
9. `useCartQuery.ts` ➔ `useCart.query.ts`
10. `useCartSummaryQuery.ts` ➔ `useCartSummary.query.ts`
11. `useFilterQuery.ts` ➔ `useFilter.query.ts`
12. `useHomepageSectionsQuery.ts` ➔ `useHomepageSections.query.ts`
13. `useProductDetailQuery.ts` ➔ `useProductDetail.query.ts`
14. `useProductsQuery.ts` ➔ `useProducts.query.ts`
15. `useRelatedProductsQuery.ts` ➔ `useRelatedProducts.query.ts`
16. `useDeliveryInfoQuery.ts` ➔ `useDeliveryInfo.query.ts`
17. `useProductReviewsQuery.ts` ➔ `useProductReviews.query.ts`

**ViewModels & Controllers (3 file):**
18. `useCartViewModel.ts` ➔ `useCart.viewmodel.ts`
19. `useProductDetailViewModel.ts` ➔ `useProductDetail.viewmodel.ts`
20. `useCartItemCardController.ts` ➔ `useCartItemCard.controller.ts`

> Toàn bộ logic bên trong (Business Logic) vẫn được giữ nguyên vẹn để không làm vỡ kiến trúc hiện hành.

---

## 4. Documentation Updated (Tài liệu đã cập nhật)
Tất cả các tài liệu chuẩn hóa AI và Architecture đã được scan và cập nhật ví dụ, đồng thời bổ sung thêm mục **File Naming Convention**:
- `docs/ai/AI_COMPONENT_RULES.md`
- `docs/ai/AI_STATE_MANAGEMENT_RULES.md`
- `docs/architecture/COMPONENT_ARCHITECTURE.md`
- `docs/architecture/VIEWMODEL_GUIDELINES.md`

Điều này đảm bảo mọi LLM Agent hay Developer mới khi tham gia dự án đều phải bắt buộc tuân theo chuẩn Naming này ngay từ khâu tạo file.

---

## 5. Final Naming Standard (Chuẩn Naming Cuối Cùng)
**Chốt lại chuẩn đặt tên file mới nhất của Web ShopKeyCap:**

- **Controller:** `useFeature.controller.ts`
- **ViewModel:** `useFeature.viewmodel.ts`
- **Query:** `useFeature.query.ts`
- **Mutation:** `useFeature.mutation.ts`
- **Service:** `feature.service.ts`
- **Repository:** `feature.repository.ts`
- **Guard:** `feature.guard.tsx`
- **Interceptor:** `feature.interceptor.ts`
