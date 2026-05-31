# AI Default Workflow

Quy trình chuẩn dành cho AI Agent khi thực hiện bất kỳ task nào trên dự án này.

---

## 1. Startup Workflow
Trước khi bắt đầu sửa/tạo code, AI phải thực hiện:
* **Đọc architecture documents**: Load các file trong `docs/architecture/` để hiểu quy tắc.
* **Xác định module cần sửa**: Dùng search tool tìm các file hiện tại có liên quan đến tính năng người dùng yêu cầu.
* **Tìm implementation tương tự**: Nếu là làm tính năng mới, tìm tính năng tương tự đang có (ví dụ: products module).

## 2. Architecture Validation Workflow
* **Kiểm tra architecture trước khi code**:
  - Tính năng này nên làm ở Frontend hay Backend?
  - Dữ liệu này nên gọi qua Repo hay gọi axios thẳng? (Trả lời: Bắt buộc qua Repo).
  - Có tạo mới Service class không? Nếu có, khai báo singleton chưa?
* **Kiểm tra architecture sau khi code**:
  - File `.tsx` có chứa logic fetch data/useState quá lớn không? Nếu có -> bóc tách sang Controller/Store.
  - Chạy validation dựa trên `CODE_REVIEW_CHECKLIST.md`.

## 3. Coding Workflow

Quy trình vòng lặp 6 bước của AI:

1. **Understand (Hiểu)**: Làm rõ yêu cầu. Không hiểu -> Ask question.
2. **Analyze (Phân tích)**: Xác định các layer bị ảnh hưởng (DTO, Model, Repo, Service, Controller, Store, View).
3. **Find Existing Pattern (Tìm mẫu hiện có)**: Quét codebase xem có code nào tương tự không.
4. **Implement (Lập trình)**:
   - Tạo Model/DTO trước.
   - Tạo Repository (Api, Mock).
   - Tạo Service.
   - Tạo Store & Controller.
   - Lắp ráp View (UI).
5. **Validate (Kiểm tra)**: Đảm bảo code chạy đúng, đáp ứng `USE_MOCK`.
6. **Review (Đánh giá)**: Xem lại code mình viết có vướng anti-pattern không.

---

## 4. Mandatory Rules (Quy định bắt buộc)

AI **KHÔNG ĐƯỢC**:
* **Tạo architecture mới**: Không mang Redux, Zustand, MobX, CQRS, GraphQL... vào nếu user không yêu cầu rõ ràng và chưa có trong project.
* **Tạo pattern mới**: Không tạo Class Controller (thay vì hook), không tự ý gộp Service và Repo thành 1 file.
* **Duplicate code**: Nếu UI giống nhau, tạo Component trong thư mục `components`. Nếu logic giống nhau, viết file `utils`.
* **Bỏ qua convention hiện có**: Quy tắc đặt tên (camelCase, `.controller.ts`, `.service.ts`, `.dto.ts`) là luật bất khả xâm phạm.
