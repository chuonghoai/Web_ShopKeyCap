# Architecture Violations Report

Tài liệu liệt kê các tính năng đang tuân thủ tốt kiến trúc và các vi phạm (violations) nếu có trong dự án tính đến thời điểm hiện tại.

---

## 1. Module Tuân Thủ Tốt (Good Modules)

* **Products Module (`src/apps/client/features/products`)**:
  - Tuân thủ xuất sắc MVC Hook + Feature Slices.
  - Phân chia `Service`, `ApiRepo`, `MockRepo` rất minh bạch.
  - UI tại `pages/products` đã dùng `controller` và `store` kết hợp với `URLSearchParams` cực kỳ tối ưu.

* **Cart Module (`src/apps/client/features/cart`)**:
  - Tách logic Storage, Context Provider và Data hook `useCart` rất rõ ràng, đúng chuẩn Global State kết hợp API.

* **Auth Module (`src/apps/auth`)**:
  - Controller, DTO, Repo được thiết kế chuẩn xác phục vụ cho App Auth riêng biệt.

---

## 2. Các Vi Phạm Đang Tồn Tại (Violations)

*(Ghi chú: Dựa trên mã nguồn hiện tại, kiến trúc dự án đang rất chặt chẽ, số lượng vi phạm rất ít. Tuy nhiên, AI Agent và Dev cần lưu ý các điểm sau để làm báo cáo mẫu và tránh phát sinh)*

### 2.1. Quá nhiều logic render bên trong Component thay vì Controller
* **Module**: Không cố định (Ví dụ mẫu: `ProductsPage.tsx` có tới hơn 200 dòng HTML/Tailwind).
* **Severity**: LOW
* **Nguyên nhân**: Do layout UI phức tạp chưa được tách ra các micro-components. Controller đã bóc tách logic nhưng View vẫn còn nặng về thẻ JSX.
* **Tác động**: Hơi khó đọc code HTML, nhưng logic vẫn an toàn.
* **Hướng Refactor**: Tách các cụm JSX của FilterSidebar và MainProductList thành các Component con (VD: `FilterSidebar.tsx`, `ProductGrid.tsx`) bên trong `pages/products/components/`.

### 2.2. (Mẫu) Thiếu Mock Data cho một số logic nghiệp vụ nhỏ
* **Severity**: LOW
* **Nguyên nhân**: Đôi khi quên triển khai Mock data 100% khi backend API đã hoàn thiện nhanh chóng.
* **Tác động**: Chế độ `USE_MOCK` có thể không hoạt động tốt với toàn bộ tính năng nhỏ nhất.
* **Hướng Refactor**: Luôn giữ thói quen đồng bộ hóa MockRepo mỗi khi ApiRepo có interface mới.

---
> **Lời nhắc cho AI Agent**: Báo cáo này là một báo cáo động. Mỗi khi có đợt refactor hoặc thêm tính năng mới, AI Agent phải cập nhật các vi phạm mới vào tài liệu này và hạ mức Severity khi đã fix xong.
