# Code Review Checklist

Danh sách kiểm tra (checklist) này giúp người review code và AI Agent đảm bảo code tuân thủ đúng kiến trúc, tiêu chuẩn mã và không phát sinh bug kiến trúc.

---

## 1. Architecture (Kiến trúc)
- [ ] **Checklist Item**: Layer phân tách rõ ràng (View -> Controller -> Store -> Service -> Repo).
  - **Why It Matters**: Giữ logic có thể test độc lập và khả năng maintain cao.
  - **How To Validate**: Kiểm tra file View (`.tsx`) không import trực tiếp `axios`, không gọi trực tiếp Service. Kiểm tra Controller không xử lý logic format data nặng.
- [ ] **Checklist Item**: Sự phụ thuộc một chiều (Unidirectional Dependency).
  - **Why It Matters**: Tránh vòng lặp phụ thuộc (circular dependency).
  - **How To Validate**: Core không import Feature. Service không import Controller. Repository không import Service.

## 2. Folder Structure (Cấu trúc thư mục)
- [ ] **Checklist Item**: Tính năng mới đặt đúng vị trí.
  - **Why It Matters**: Dễ tìm kiếm, dễ hiểu.
  - **How To Validate**: Giao diện chung thuộc `/components`, màn hình đặt tại `/pages`, logic API/Data đặt tại `/features/[tên]/`.

## 3. Naming Convention (Quy ước đặt tên)
- [ ] **Checklist Item**: Hậu tố file chuẩn xác.
  - **Why It Matters**: Nhìn tên file hiểu ngay trách nhiệm.
  - **How To Validate**: View là `.tsx`. Controller có hậu tố `.controller.ts`. Store có `.store.ts`. Service có `.service.ts`. Repo có `.repo.ts`. DTO có `.dto.ts`.

## 4. Code Quality (Chất lượng mã)
- [ ] **Checklist Item**: Tránh Magic Strings/Numbers.
  - **Why It Matters**: Giảm lỗi sai chính tả khi gõ nhiều lần, dễ sửa khi logic thay đổi.
  - **How To Validate**: Kiểm tra xem các string hardcode (ví dụ: role name, API endpoint) đã đưa vào `/core/constants/` chưa.

## 5. Maintainability (Khả năng bảo trì)
- [ ] **Checklist Item**: Khai báo Interface cho Repo.
  - **Why It Matters**: Để chuyển đổi dễ dàng giữa API thật và Mock data.
  - **How To Validate**: Mọi Service phải tiêm (inject) Interface Repo, không gọi trực tiếp Class ApiRepo.

## 6. Reusability (Khả năng tái sử dụng)
- [ ] **Checklist Item**: Chia tách logic UI ra khỏi logic Component.
  - **Why It Matters**: Tái sử dụng hooks và logic.
  - **How To Validate**: Nếu UI component dài quá 200 dòng, xem xét đưa logic vào Controller.

## 7. Performance (Hiệu suất)
- [ ] **Checklist Item**: Tránh Re-render không cần thiết.
  - **Why It Matters**: Giữ UX mượt mà.
  - **How To Validate**: Sử dụng `useEffect` đúng dependency, tách các context lớn thành nhỏ nếu cần.

## 8. Security (Bảo mật)
- [ ] **Checklist Item**: Authentication & Authorization check.
  - **Why It Matters**: Tránh lộ dữ liệu nhạy cảm.
  - **How To Validate**: Đảm bảo các route protected được bọc bởi `AuthGuard`, các repo cần token dùng Interceptor.

## 9. Testing (Kiểm thử)
- [ ] **Checklist Item**: Mock Repo luôn cập nhật.
  - **Why It Matters**: Cho phép dev/UI/UX làm việc không phụ thuộc backend.
  - **How To Validate**: Nếu ApiRepo có hàm mới, MockRepo phải triển khai hàm mock tương tự.
