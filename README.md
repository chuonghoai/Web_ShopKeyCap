<div align="center">
  <img src="https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</div>

<h1 align="center">Shop Keycap Frontend ⌨️</h1>

<p align="center">
  Dự án cung cấp giao diện người dùng (Client) và trang quản trị (Admin) cho hệ thống cửa hàng bán Keycap, được xây dựng với các công nghệ web hiện đại, tốc độ cao và tối ưu hóa trải nghiệm người dùng.
</p>

<details open>
  <summary><b>📋 Nội dung</b></summary>
  <ol>
    <li><a href="#-giới-thiệu">Giới thiệu</a></li>
    <li><a href="#-chức-năng">Chức năng</a></li>
    <li><a href="#-công-nghệ-sử-dụng">Công nghệ sử dụng</a></li>
    <li><a href="#-cấu-trúc-thư-mục">Cấu trúc thư mục</a></li>
    <li><a href="#-yêu-cầu-môi-trường">Yêu cầu môi trường</a></li>
    <li><a href="#-cài-đặt">Cài đặt</a></li>
    <li><a href="#️-cấu-hình-môi-trường">Cấu hình môi trường</a></li>
    <li><a href="#-chạy-dự-án">Chạy dự án</a></li>
    <li><a href="#-liên-kết-với-backend">Liên kết với Backend</a></li>
    <li><a href="#-tác-giả">Tác giả</a></li>
  </ol>
</details>

<hr>

## 🌟 Giới thiệu

Shop Keycap Frontend là ứng dụng Single Page Application (SPA) đóng vai trò giao tiếp trực tiếp với người dùng cuối và quản trị viên hệ thống. Dự án được chia làm 3 phân hệ chính:
- **Client**: Dành cho khách hàng tìm kiếm, mua sắm keycap và quản lý đơn hàng.
- **Admin**: Dành cho ban quản trị và nhân viên quản lý sản phẩm, đơn hàng, thống kê.
- **Auth**: Xử lý toàn bộ luồng đăng nhập, đăng ký và bảo mật (bao gồm Google OAuth).

## ✨ Chức năng

### 🛍️ Khách hàng
- **Xác thực**: Đăng nhập (tài khoản hệ thống & Google), đăng ký, quên mật khẩu, đặt lại mật khẩu.
- **Sản phẩm**: Xem danh sách sản phẩm, chi tiết sản phẩm.
- **Mua sắm**: Xem giỏ hàng, đặt hàng, thanh toán, trang kết quả đặt hàng.
- **Đơn hàng**: Xem lịch sử đơn hàng, chi tiết đơn hàng.
- **Hồ sơ**: Quản lý thông tin cá nhân, cập nhật địa chỉ giao hàng.
- **Tương tác**: Đánh giá (Review) sản phẩm sau khi mua.

### ⚙️ Admin / Staff
- **Dashboard**: Xem thống kê tổng quan với biểu đồ.
- **Quản lý sản phẩm**: Xem danh sách và chi tiết các sản phẩm đang bán.
- **Quản lý đơn hàng**: Xem danh sách đơn, chi tiết và xử lý trạng thái giao hàng.
- **Quản lý nhân viên**: Quản lý danh sách nhân sự trong hệ thống.
*(Hỗ trợ phân quyền chặt chẽ thông qua Role: ADMIN và STAFF).*

## 🛠️ Công nghệ sử dụng

Dự án áp dụng các công nghệ mới và mạnh mẽ nhất:

### 🎯 Core
- **React** (v19.2)
- **TypeScript** (~v6.0)
- **Vite** (v8.0)

### 🛣️ Routing & State Management
- **React Router DOM** (v7.15) - Quản lý điều hướng.
- **Zustand** (v5.0) - Quản lý Client State (nhẹ & nhanh).
- **TanStack React Query** (v5.101) - Quản lý Server State, caching & fetching API.

### 🌐 API & Networking
- **Axios** (v1.16) - HTTP Client linh hoạt.
- **jwt-decode** - Giải mã và xử lý token phân quyền.

### 🎨 Styling & UI
- **Tailwind CSS** (v4.3) sử dụng `@tailwindcss/vite`.
- **clsx** - Xử lý class linh hoạt.
- **Lucide React** - Hệ thống icon sắc nét.
- **Recharts** - Vẽ biểu đồ thống kê trong Admin.
- **Leaflet & React-Leaflet** - Tích hợp bản đồ trực quan cho địa chỉ.

### 📝 Form & Text Editor
- **React Hook Form** (v7.79) - Xử lý form và validation hiệu năng cao.
- **Tiptap** - Trình soạn thảo văn bản Rich Text Editor.

### ⚙️ Utilities & Tools
- **jsPDF & jsPDF-AutoTable** - Xuất dữ liệu báo cáo ra file PDF.
- **DOMPurify** - XSS Sanitizer bảo mật dữ liệu.
- **Google OAuth** (`@react-oauth/google`) - Đăng nhập bằng Google.
- **Vitest** - Framework chạy unit test siêu tốc.
- **ESLint** - Kiểm soát chất lượng mã nguồn.

## 📁 Cấu trúc thư mục

```text
src
├── apps              # Chứa các phân hệ module chức năng chính
│   ├── admin         # Các page/routes của Admin và Staff
│   ├── auth          # Các page xử lý Đăng nhập, Đăng ký, Quên mật khẩu
│   └── client        # Các page giao diện Khách hàng (Trang chủ, Giỏ hàng, Hồ sơ...)
├── assets            # Chứa hình ảnh tĩnh, fonts, stylesheet toàn cục
├── components        # Component UI dùng chung toàn app
├── core              # Core logic: api config, auth guard, constants, hooks, store, interceptors
├── lib               # Wrapper cấu hình cho các thư viện bên thứ 3
├── models            # Chứa các interface/type TypeScript định nghĩa dữ liệu
├── routes            # Cấu hình hệ thống Router tổng của ứng dụng
├── shared            # Logic, Helper, Components chia sẻ dùng chung
└── utils             # Các hàm tiện ích hỗ trợ format số, ngày tháng...
```

## 📦 Yêu cầu môi trường

- **Node.js** >= 18.x (Khuyên dùng >= 20.x)
- **npm** (Package manager mặc định)
- **Backend API** đã được khởi chạy.

## 🚀 Cài đặt

1. **Clone dự án từ repository:**
   ```bash
   git clone https://github.com/chuonghoai/Web_ShopKeyCap.git
   cd Web_ShopKeyCap
   ```

2. **Cài đặt các thư viện (Dependencies):**
   ```bash
   npm install
   ```

## ⚙️ Cấu hình môi trường

Tạo file `.env` ở thư mục gốc (ngang hàng `package.json`), sử dụng các biến sau:

| Variable | Mô tả | Ví dụ |
| -------- | ----- | ----- |
| `VITE_GOOGLE_CLIENT_ID` | Client ID dùng để xác thực đăng nhập qua Google OAuth | `45340158...googleusercontent.com` |
| `VITE_API_URL` | Base URL trỏ tới hệ thống Backend API | `http://localhost:3000` |
| `VITE_API_TIMEOUT` | Thời gian chờ phản hồi tối đa của mỗi API request (ms) | `10000` |

## 🏃 Chạy dự án

Các lệnh script được định nghĩa sẵn trong `package.json`:

- **Khởi động server development:**
  ```bash
  npm run dev
  ```
- **Build production bundle:**
  ```bash
  npm run build
  ```
- **Chạy ESLint kiểm tra lỗi code:**
  ```bash
  npm run lint
  ```
- **Xem trước bản build production tại local:**
  ```bash
  npm run preview
  ```
- **Chạy Unit Test với Vitest:**
  ```bash
  npm run test
  ```

## 🔗 Liên kết với Backend

- **Base URL API**: Thiết lập thông qua biến `VITE_API_URL`. Nếu chạy ở local, Backend thường chạy tại `http://localhost:3000`.
- **Authentication Header**: Khi đăng nhập thành công, Access Token được gửi tự động thông qua **Axios Interceptor** (`src/core/interceptors`) với header `Authorization: Bearer <token>`.
- **Khởi động**: Đảm bảo Backend API phải được chạy **trước** khi dùng Frontend. Nếu Backend chưa chạy, các request sử dụng React Query sẽ báo lỗi Network Error hoặc Timeout (cấu hình mặc định 10 giây).

## 👨‍💻 Tác giả

* **Nhóm thực hiện:**
    * **Trương Hoài Chương**
    * **Phan Phúc Hậu**
    * **Lê Hữu Văn**
    * **Phạm Thị Kim Ngân**
* **Trường:** Đại học Công nghệ Kỹ thuật TP.HCM (HCMUTE)

---

<div align="center">
<i>Dự án này là mã nguồn mở và được tạo ra với mục đích học tập.

</i>
</div>
