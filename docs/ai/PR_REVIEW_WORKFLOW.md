# Pull Request Review Workflow

Hướng dẫn AI thực hiện Code Review trên các nhánh PR mới.

## Các tiêu chí kiểm tra

1. **Architecture** (Kiến trúc): Code có đúng chuẩn MVC Hook + Feature Slices chưa?
2. **Dependency Direction** (Hướng phụ thuộc): View -> Controller -> Store -> Service -> Repo. Có bị ngược không?
3. **Naming** (Đặt tên): File có đúng đuôi `.controller.ts`, `.service.ts`, `.repo.ts`?
4. **Code Quality** (Chất lượng mã): Tránh magic string, file View < 200 dòng.
5. **Maintainability** (Khả năng bảo trì): Việc xử lý Mock data có bị bỏ quên không?
6. **Scalability** (Khả năng mở rộng): Lỗi render loop có xảy ra không? Có nhồi nhét quá nhiều logic vào 1 hàm không?
7. **Reusability** (Tái sử dụng): Component này đáng ra nên là Shared Component hay Local Component?

---

## Tiêu chuẩn Báo lỗi (Issue Severity)

Khi phát hiện lỗi, AI phải phân loại mức độ và báo cáo:

### 1. CRITICAL
* **Description**: Phá vỡ hướng phụ thuộc (VD: Import View vào trong Service) hoặc phá vỡ cấu trúc config/api cốt lõi.
* **Impact**: Gây lỗi vòng lặp, crash app, hoặc tê liệt toàn bộ hệ thống.
* **Recommendation**: Tách biệt logic và tiêm phụ thuộc chiều từ dưới lên trên. Yêu cầu sửa đổi NGAY LẬP TỨC.

### 2. HIGH
* **Description**: Gọi API axios trực tiếp tại View (.tsx) mà không qua Repo/Service. Không tạo MockRepo.
* **Impact**: Phá vỡ kiến trúc, không thể test, không hoạt động với cờ USE_MOCK.
* **Recommendation**: Di chuyển logic axios vào ApiRepo, tạo interface và tiêm vào Service.

### 3. MEDIUM
* **Description**: Viết 1 file `.tsx` quá khổng lồ (vừa quản lý State, URL params, fetch data, vừa render).
* **Impact**: Giảm khả năng bảo trì và tái sử dụng trầm trọng.
* **Recommendation**: Bóc tách Controller Hook và Store Hook.

### 4. LOW
* **Description**: Đặt tên file sai chuẩn, lỗi CSS nhẹ, thiếu comment, magic string.
* **Impact**: Chỉ ảnh hưởng đến thẩm mỹ và Code Smell nhẹ.
* **Recommendation**: Sửa đổi tên biến, di chuyển string vào `constants`.
