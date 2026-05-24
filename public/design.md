# Quy tắc Design System - Cyber Keys

Tài liệu này quy định các chuẩn mực thiết kế (Design System) cho toàn bộ dự án dựa trên các thành phần UI (Tailwind CSS) đã được phát triển. 

## 1. Typography (Nghệ thuật chữ)

### 1.1. Font chữ (Font Family)
- **Font mặc định (Sans-serif)**: `system-ui, 'Segoe UI', Roboto, sans-serif` (được định nghĩa qua biến `--sans` và `--heading`).
- **Font monospace (Code)**: `ui-monospace, Consolas, monospace` (được định nghĩa qua biến `--mono`).

### 1.2. Kích thước chữ (Font Size)
- **Văn bản phụ / Nhãn (Small text / Labels)**: `13px` - `14px` (`text-[13px]`, `text-[14px]`).
- **Văn bản thường (Body text)**: `15px` (block code) - `16px` (`text-[16px]`) - `18px` (mặc định của thẻ `body`).
- **Tiêu đề phụ (Sub-headings)**: `24px` (`h2`), `26px`, `28px`.
- **Tiêu đề chính (Headings)**: `36px` (màn hình nhỏ), `48px`, `56px` (`h1`).

### 1.3. Độ đậm (Font Weight)
- **Medium (500)**: Dùng cho labels, văn bản phụ, mô tả ngắn (`font-medium`).
- **Semi-bold (600)**: Dùng cho text trên Buttons để tạo sự nổi bật (`font-semibold`).
- **Bold (700)**: Dùng cho các tiêu đề (Headings) hoặc highlight text (`font-bold`).
- **Extra-bold (800)**: Dùng cho các Hero headings lớn (`font-extrabold`).

---

## 2. Màu sắc (Colors)

Hệ thống sử dụng mã màu của Tailwind kết hợp với biến CSS (hỗ trợ Light/Dark mode).

### 2.1. Màu chủ đạo (Primary & Accent)
- **Primary Blue**: `#2563eb` (`blue-600`) - Sử dụng cho các nút bấm chính, viền khi focus (focus:border), chữ nhấn mạnh và các liên kết.
- **Primary Shadow**: `blue-500/30` - Tạo hiệu ứng bóng đổ cho nút bấm chính (`shadow-blue-500/30`).
- **Accent Purple**: `#aa3bff` (Light) / `#c084fc` (Dark) - Màu điểm nhấn (định nghĩa qua biến `--accent`).

### 2.2. Màu nền (Backgrounds)
- **Nền chính (App background)**: `#fff` (Light) / `#16171d` (Dark) (biến `--bg`).
- **Nền Card / Form container**: `bg-white` (thường đi kèm shadow lớn trên nền sáng).
- **Nền Visual / Gradient**: `bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]` (Các khối trang trí, background phân cách).
- **Nền trang trí sáng (Glowing)**: `bg-blue-400/20`, `bg-indigo-500/15` (Kết hợp với `blur` lớn).

### 2.3. Màu văn bản (Text Colors)
- **Tiêu đề (Headings)**: `#0f172a` (`text-[#0f172a]`) - hoặc `--text-h` (`#08060d` ở Light / `#f3f4f6` ở Dark).
- **Văn bản thường (Body)**: `#334155` (`text-[#334155]`), `#475569` (`text-[#475569]`) hoặc `--text` (`#6b6375` ở Light / `#9ca3af` ở Dark).
- **Văn bản phụ (Muted)**: `text-slate-500`.
- **Placeholder (Input)**: `text-slate-400`.

### 2.4. Màu viền (Borders)
- **Border Input mặc định**: `#cbd5e1` (`border-[#cbd5e1]`).
- **Border Checkbox**: `border-gray-300`.
- **Border hệ thống**: `#e5e4e7` (Light) / `#2e303a` (Dark) (biến `--border`).

---

## 3. Kích thước & Khoảng cách (Spacing & Sizes)

### 3.1. Layout & Chiều rộng (Widths)
- **Form Card / Container**: Thường sử dụng `max-w-[400px]` với chiều rộng `w-full` để đảm bảo tính responsive.
- **Input & Buttons**: Sử dụng `w-full` để giãn đều toàn bộ khối chứa dọc.

### 3.2. Khoảng cách (Padding & Margin)
- **Padding Card / Modal**: `p-6 sm:p-7` hoặc `p-6 sm:p-8`.
- **Padding Input/Button**: `px-3 py-2` hoặc `px-3.5 py-2.5`.
- **Khoảng cách linh hoạt (Gap/Space)**: `gap-2` cho inline elements và `space-y-2`, `mb-3`, `mt-6` cho phân tầng element theo chiều dọc.

---

## 4. Hiệu ứng & Định dạng hình học (Effects & Shapes)

### 4.1. Bo góc (Border Radius)
- **Card / Block lớn**: `rounded-2xl` (1rem / 16px).
- **Input / Button**: `rounded-lg` (0.5rem / 8px).
- **Checkbox / Element nhỏ**: `rounded` (0.25rem / 4px).
- **Khối trang trí**: `rounded-full` (hình tròn / oval).

### 4.2. Đổ bóng (Shadows)
- **Card chính (Form)**: `shadow-[0_8px_30px_rgb(0,0,0,0.08)]` (Đổ bóng mềm, lan tỏa rộng).
- **Nút Primary**: `shadow-md shadow-blue-500/30` (Bóng đổ cùng tông màu với nút, tạo hiệu ứng phát sáng nhẹ).
- **Shadow hệ thống (từ CSS)**: `rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px` (biến `--shadow`).

### 4.3. Hiệu ứng (Transitions & Animations)
- **Transitions**: Thêm `transition-colors` trên buttons và inputs để chuyển đổi mượt mà khi hover/focus.
- **Trạng thái Focus (Inputs)**: Thay đổi viền thành màu Primary (`focus:border-[#2563eb]`) và thêm viền ngoài (`focus:ring-1 focus:ring-[#2563eb]`).
- **Animations tùy chỉnh**: Có các hiệu ứng chuyển động như `animate-spin` (loading spinner) và các hiệu ứng trang trí (`animate-line`, `animate-triangle`, `animate-keyboard`).
- **Blend Modes**: `mix-blend-multiply` dùng cho hình ảnh trang trí để hòa trộn với các lớp màu nền phía dưới.
