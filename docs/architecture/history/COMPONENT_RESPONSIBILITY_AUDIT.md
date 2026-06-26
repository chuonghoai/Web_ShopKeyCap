# COMPONENT RESPONSIBILITY AUDIT

## 1. Existing Rules
Trước khi thực hiện Audit, hệ thống tài liệu kiến trúc (nằm trong thư mục `docs/architecture/` và `docs/ai/`) chủ yếu tập trung vào:
- **State Management Standard:** Quản lý vòng đời dữ liệu Server/Client với Zustand và TanStack Query.
- **ViewModel Guidelines:** Quy định cách sử dụng tầng ViewModel cho Page/Feature lớn.
- **Query Guidelines:** Chuẩn hóa Factory Keys cho API Hooks.

Tuy nhiên, **chưa có quy tắc chính thức (Missing Rules)** về việc phân chia trách nhiệm (Component Responsibility) ở mức độ chi tiết bên trong từng UI Component nhỏ lẻ.

---

## 2. Missing Rules Added
Dựa vào tình trạng trên, tôi đã biên soạn và bổ sung 2 bộ quy tắc mới để lấp đầy khoảng trống kiến trúc:
- Tạo mới `docs/architecture/COMPONENT_ARCHITECTURE.md`: Định nghĩa rõ thế nào là Trách nhiệm Đơn lẻ, khi nào phải tách Controller, và minh họa bằng ví dụ Tốt/Xấu.
- Tạo mới `docs/ai/AI_COMPONENT_RULES.md`: Ép các luồng AI trong dự án phải tuân thủ nghiêm ngặt việc bóc tách Business Rules, Validation, Debounce khỏi JSX. Cấm việc tạo Controller vô nghĩa (Pass-through Controller).

---

## 3. CartItemCard Analysis
Quá trình Audit file `CartItemCard.tsx` cho thấy Component này đang rơi vào **Trường hợp B: Vi phạm Component Responsibility Rule**.

**Bảng Phân loại Logic đang tồn tại bên trong `CartItemCard.tsx`:**
| Loại Logic | Trạng thái | Ghi chú |
|------------|------------|---------|
| **UI Logic** | ✅ Hợp lệ | Render JSX, hiển thị hình ảnh, badge kho hàng, class Tailwind. |
| **Mapping Data** | ✅ Hợp lệ | Lấy dữ liệu cơ bản từ object `item.variant` hoặc `item.product`. |
| **Validation Logic** | ❌ Vi phạm | Chặn ký tự chữ bằng Regex `/^\d*$/`, check rỗng, min `< 1` và max `> stockQuantity`. |
| **Debounce / Sync State** | ❌ Vi phạm | Khai báo `useEffect` để liên tục sync data từ Server State xuống Input State khi có thay đổi ngoại cảnh. |
| **Orchestration Logic** | ❌ Vi phạm | Logic tự tính toán `newQty`, tự trigger hàm `onUpdateQuantity`, tự quản lý rule disable/enable của nút bấm. |

**Kết luận:** Component đang gánh vác quá nhiều Business Logic không thuộc về lớp hiển thị. Cần phải được bóc tách.

---

## 4. Refactor Applied
Việc Refactor đã được tiến hành theo đúng kiến trúc mới:

1. **Tạo Controller Mới:** 
   - Vị trí: `src/apps/client/pages/cart/componentControllers/useCartItemCardController.ts`.
   - Di chuyển toàn bộ các hàm: `handleInputChange`, `handleBlur`, `handleKeyDown`, `handleIncrease`, `handleDecrease` và các điều kiện disable nút bấm sang file này.
   - Trả về đối tượng: `inputValue`, các hàm handles và các biến cờ `isDecreaseDisabled`, `isIncreaseDisabled`.

2. **Dọn dẹp Component:**
   - Trong `CartItemCard.tsx`, toàn bộ import thừa thãi (`useState`, `useEffect`) đã được gỡ bỏ.
   - Thêm import gọi `const controller = useCartItemCardController(item, onUpdateQuantity);`.
   - Map các sự kiện vào JSX (`onClick={controller.handleIncrease}`). 
   - File giờ đây thuần túy chỉ là **Presentational Component**.

---

## 5. New Architecture Standard
Từ nay, dự án sẽ chính thức áp dụng chuẩn cấu trúc mới:
- **Tầng Component:** File `.tsx` chỉ nhận props, controller và render. 
- **Tầng Component Controller:** File `.ts` nằm ở thư mục `componentControllers/` đi kèm, xử lý validation và orchestration nội bộ.
- **Tầng ViewModel:** Bao bọc nhiều components trong 1 Page lớn.
- **Nguyên tắc "Cấm Lạm Dụng":** Nếu một UI Component chỉ hiển thị badge chữ hoặc không chứa hàm handle nào rắc rối, tuyệt đối không tạo Controller dư thừa.
