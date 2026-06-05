# AI Agent State Management Rules

Tài liệu này chứa các quy tắc **CẤM KỴ** (Mandatory Rules) mà AI Agent phải tuân thủ tuyệt đối khi gen code liên quan đến State.

1. **KHÔNG ĐƯỢC ĐỀ XUẤT REDUX**:
   - Dự án đã chốt sử dụng TanStack Query (Server State) và Zustand (Client State). Cấm gợi ý Redux, Redux Toolkit, MobX hay Recoil.

2. **KHÔNG DÙNG CONTEXT API CHO SERVER STATE**:
   - `AuthContext` hay `CartContext` cũ đã bị xóa. Cấm tạo lại Context API để lưu trữ dữ liệu fetch từ Backend. Mọi dữ liệu Server State phải lấy từ `useQuery`.

3. **KHÔNG ĐƯỢC TẠO STORE LAYER TRUNG GIAN**:
   - Tầng `Store` (`[page].store.ts`) đã bị gỡ bỏ khỏi MVC Pattern của dự án. 
   - Từ nay, Controller sẽ gọi trực tiếp các **Feature Hooks** (như `useProductQuery`, `useCartSummaryQuery`). 
   - Cấm tạo layer Store chỉ để "pass-through" (gọi Query rồi return lại nguyên vẹn dữ liệu).

4. **KHÔNG MIRROR SERVER STATE VÀO ZUSTAND/USESTATE**:
   - Cấm fetch dữ liệu từ `useQuery` sau đó bỏ vào `useEffect` để `setState` hay đẩy vào Zustand Store. 
   - Điều này tạo ra Multiple Source Of Truth. Dữ liệu từ query phải được render trực tiếp hoặc derive trực tiếp thông qua biến.

5. **MỌI MUTATION PHẢI QUẢN LÝ CACHE**:
   - Bất kỳ khi nào gen code `useMutation`, BẮT BUỘC phải viết thêm khối `onSuccess` chứa lệnh `queryClient.invalidateQueries(...)` hoặc `queryClient.setQueryData(...)`.
   - Cấm để cache tự phân rã (stale) mà không can thiệp.

6. **CART BADGE ĐÃ TỐI ƯU**:
   - Header Cart Badge đã được tối ưu hóa bằng `CartSummaryModel`.
   - Cấm import `CartDetailModel` (chứa toàn bộ item, hình ảnh) ở Header chỉ để đếm số lượng. Bắt buộc gọi `useCartCount()`.

7. **FILE NAMING CONVENTION**:
   - Khi tạo mới các file architecture, BẮT BUỘC dùng định dạng hậu tố `.[feature].ts`:
     - Controller: `use[Name].controller.ts`
     - ViewModel: `use[Name].viewmodel.ts`
     - Query: `use[Name].query.ts`
     - Mutation: `use[Name].mutation.ts`
     - Service: `[name].service.ts`
     - Repository: `[name].repository.ts`
     - Guard: `[name].guard.tsx`
     - Interceptor: `[name].interceptor.ts`
