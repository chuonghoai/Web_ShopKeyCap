# Technical Design Document: Update Manage Profile & Cloud Media System

Tài liệu này được tạo ra để cung cấp cho đội ngũ Backend (Server-KeyCapShop) bản thiết kế chi tiết về cấu trúc cơ sở dữ liệu và API liên quan đến tính năng cập nhật Profile và hệ thống Cloud Media dùng chung.

> **Lưu ý Quan Trọng:** Theo yêu cầu kiến trúc, toàn bộ các cột `id` của mọi bảng trong database đều bắt buộc phải là **STRING** (ví dụ: UUID, chuỗi ngẫu nhiên, hoặc snowflake id dạng chuỗi).

---

## 1. Database Schema Proposal

### 1.1 Bảng `medias` (Tạo mới hoàn toàn)

Bảng này quản lý tất cả các file media (ảnh, video) tải lên Cloudinary.

| Column          | Type         | Nullable | Description                                                                 |
| :-------------- | :----------- | :------- | :-------------------------------------------------------------------------- |
| `id`            | VARCHAR(255) | No       | **Primary Key**. Phải là STRING.                                            |
| `public_id`     | VARCHAR(255) | No       | ID tài nguyên do Cloudinary trả về (dùng để xóa/quản lý trên cloud).        |
| `secure_url`    | TEXT         | No       | HTTPS URL của ảnh, phục vụ render hiển thị cho client.                      |
| `resource_type` | VARCHAR(50)  | No       | Phân loại (Ví dụ: `image`, `video`, `raw`).                               |
| `format`        | VARCHAR(50)  | No       | Định dạng file (Ví dụ: `jpg`, `png`, `webp`).                             |
| `bytes`         | INT          | No       | Kích thước file theo byte.                                                  |
| `width`         | INT          | Yes      | Chiều rộng ảnh (pixel).                                                     |
| `height`        | INT          | Yes      | Chiều cao ảnh (pixel).                                                      |
| `status`        | VARCHAR(50)  | No       | Trạng thái của media (`ACTIVE`, `PENDING`, v.v.). Mặc định `ACTIVE`.        |
| `created_at`    | TIMESTAMP    | No       | Thời gian tạo record.                                                       |

### 1.2 Bảng `users` (Chỉnh sửa)

Bảng User hiện tại cần chỉnh sửa liên kết với bảng `medias`.

*   **Thêm cột mới:** `avatar_media_id` (Type: `VARCHAR(255)`, Nullable: Yes)
*   **Xóa cột cũ:** `avatar_url` (Chỉ xóa sau khi đã migrate dữ liệu thành công).
*   **Foreign Key (FK Name):** `fk_users_avatar_media_id`
*   **Relationship:** `OneToOne` hoặc `ManyToOne` (Bảng `users` tham chiếu tới `medias(id)`).
*   **Cascade Strategy:** `SET NULL` (Khi xóa media trong DB, field `avatar_media_id` trong user chuyển về null, tránh lỗi mất user).

---

## 2. API Contract Proposal

### 2.1 API Lấy Signature Upload Cloudinary

*   **Endpoint:** `POST /api/v1/media/signature` (Tùy theo cấu trúc prefix hiện tại)
*   **Mục đích:** Cấp signature an toàn để frontend upload trực tiếp lên Cloudinary.
*   **Request Body:** (Có thể rỗng hoặc chứa metadata)
    ```json
    {}
    ```
*   **Response:**
    ```json
    {
      "signature": "ab123cd456ef...",
      "timestamp": 1718012345,
      "apiKey": "123456789012345",
      "cloudName": "your_cloud_name",
      "expiresIn": 3600
    }
    ```

### 2.2 API Lưu Media Vào Database

*   **Endpoint:** `POST /api/v1/medias`
*   **Mục đích:** Sau khi frontend upload lên Cloudinary thành công, gọi API này để backend tạo record trong bảng `medias`.
*   **Lưu ý nghiệp vụ:** Backend chỉ lấy thông tin này chèn vào DB, KHÔNG tương tác với Cloudinary lúc này. Thẻ `tmp` đã được Frontend chèn trong lúc upload.
*   **Request Body:** (Mảng các object)
    ```json
    [
      {
        "public_id": "profile_pics/xyz123",
        "secure_url": "https://res.cloudinary.com/...",
        "resource_type": "image",
        "format": "webp",
        "bytes": 55000,
        "width": 500,
        "height": 500
      }
    ]
    ```
*   **Response:**
    ```json
    [
      {
        "id": "media-1234-5678",
        "url": "https://res.cloudinary.com/..."
      }
    ]
    ```

### 2.3 API Cập Nhật Profile User

*   **Endpoint:** `PATCH /api/v1/users/profile`
*   **Mục đích:** Cập nhật thông tin cá nhân của User hiện tại, đồng thời chốt (commit) media được sử dụng.
*   **Nghiệp vụ kèm theo:** Sau khi cập nhật DB thành công, Backend gọi Cloudinary SDK Admin API để xóa tag `tmp` trên `public_id` tương ứng với `avatarMediaId`.
*   **Request Body:**
    ```json
    {
      "fullName": "Nguyen Van A",
      "phone": "0987654321",
      "avatarMediaId": "media-1234-5678"
    }
    ```
*   **Response Body:** Trả về entity User / Profile đã cập nhật.

---

## 3. Cloudinary Lifecycle & Cleanup Strategy (Dọn Rác)

Việc tích hợp Cloudinary có thể phát sinh "file rác" (Orphan Media) nếu người dùng đang upload thì tắt máy, hoặc upload thành công nhưng không ấn "Lưu Profile".

### 3.1 Quy Trình Xử Lý "tmp" tag
1.  Frontend khi gọi Cloudinary Upload SDK, luôn truyền kèm thông số `tags=["tmp"]`. Do đó, mọi file lên Cloudinary mặc định mang tag `tmp`.
2.  Frontend gọi `POST /api/v1/medias`. Backend tạo record trong DB (record này hiện trôi nổi, chưa gắn vào User nào).
3.  Frontend gọi `PUT /api/v1/users/profile`. Backend lưu ID Media vào User. Tiếp đó, Backend gọi Cloudinary SDK để xóa tag `tmp` trên tài nguyên đó, báo hiệu đây là file chính thức vĩnh viễn.

### 3.2 Cronjob Cleanup (Tránh rác rưởi)
*   **Tần suất:** Chạy ngầm định kỳ (VD: Mỗi 2h sáng).
*   **Điều kiện quét:** Sử dụng hàm search của Cloudinary SDK để tìm tất cả tài nguyên có chứa tag `tmp` và có độ tuổi tạo ra (created_at) > 24 giờ.
*   **Hành động xóa:**
    1.  Lấy mảng `public_id` từ kết quả search.
    2.  Xóa các dòng dữ liệu trong bảng `medias` có `public_id` trùng khớp.
    3.  Gọi hàm destroy của Cloudinary để xóa triệt để file trên cloud.

---

## 4. Migration Proposal

Đây là các bước an toàn để chuyển đổi database hiện hữu của dự án sang hệ thống Media mới.

*   **Bước 1:** Chạy script tạo bảng `medias`.
*   **Bước 2:** Chạy script ALTER table `users` thêm cột `avatar_media_id VARCHAR(255)`.
*   **Bước 3 (Backfill Script - Dữ liệu cũ):**
    Viết 1 file logic đọc tất cả các user đang có `avatar_url` khác NULL.
    Với mỗi user:
    - Tạo một bản ghi mới trong bảng `medias` (id: tự random chuỗi, public_id: có thể extract từ url hoặc null, secure_url: lấy từ avatar_url cũ).
    - Cập nhật id của bản ghi medias vừa tạo vào cột `avatar_media_id` của user đó.
*   **Bước 4:** Xóa cột `avatar_url` trong bảng `users` (Hoặc giữ lại tạm một vài ngày đến khi mọi API ổn định rồi hãy DROP).
