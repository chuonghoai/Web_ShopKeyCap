# AI Component Generation Rules

Tài liệu này chứa các quy tắc **BẮT BUỘC** khi AI tạo mới hoặc refactor React Component.

1. **COMPONENT RESPONSIBILITY**:
   - Khi viết UI Component, AI chỉ được tập trung vào cấu trúc thẻ (JSX), các class styling (Tailwind) và hiển thị dữ liệu thô.
   - **Cấm tuyệt đối** nhét Business Rules, Debounce logic, Throttling, Validation phức tạp, hay Mutation hooks trực tiếp vào bên trong React Component.

2. **COMPONENT CONTROLLER PATTERN**:
   - Nếu component vượt quá ngưỡng hiển thị đơn thuần (có form input cần validate, gọi update API, xử lý nghiệp vụ), AI **phải tự động tạo Controller**.
   - Vị trí: Đặt trong thư mục `componentControllers/use[ComponentName].controller.ts` (cùng cấp với thư mục chứa UI component).
   - Controller sẽ expose ra các biến state và hàm handle, Component chỉ việc lấy ra dùng.

3. **CẤM PASS-THROUGH CONTROLLER**:
   - AI không được tự động tạo Controller một cách vô tội vạ cho mọi component.
   - Nếu một component chỉ thuần túy nhận Props và hiển thị (VD: `ProductBadge`, `SectionTitle`) hoặc chỉ có 1 nút bấm toggle state cực kỳ đơn giản, thì **KHÔNG ĐƯỢC TẠO** Controller.
   - Việc tách ra file riêng chỉ có giá trị khi logic bên trong thực sự đủ lớn.

4. **FILE NAMING CONVENTION**:
   - Khi tạo mới các file architecture, BẮT BUỘC dùng định dạng hậu tố `.[feature].ts`:
     - Controller: `use[Name].controller.ts`
     - ViewModel: `use[Name].viewmodel.ts`
     - Query: `use[Name].query.ts`
     - Mutation: `use[Name].mutation.ts`
     - Service: `[name].service.ts`
     - Repository: `[name].repository.ts`
     - Guard: `[name].guard.tsx`
     - Interceptor: `[name].interceptor.ts`
