# Báo Cáo Cập Nhật Governance Kiến Trúc

Tài liệu này đánh dấu sự kết thúc của đợt Migration State Management lớn nhất dự án, chuyển đổi thành công từ mô hình thủ công sang **TanStack Query + Zustand**. 

Dưới đây là tổng hợp những sửa đổi mang tính "Hiến pháp" (Governance) đã được áp dụng vào toàn bộ hệ thống Documentation của dự án.

## 1. Những Quy Tắc Cũ Bị Gỡ Bỏ (Deprecated Rules)
- **Tầng Store (`[page].store.ts`)**: Đã bị xóa hoàn toàn khỏi mô hình kiến trúc MVC Hooks Pattern. Không còn khái niệm Controller gọi Store để lấy dữ liệu.
- **Context API cho Data Fetching**: Các file như `AuthContext`, `CartContext` cũ đã bị cấm sử dụng để lưu trữ dữ liệu Server.
- **Controller/Store Pattern**: Đã được đổi tên thành **MVC Hooks Pattern với TanStack Query**.
- Khái niệm "Chờ `useUserProfileQuery` để Guard Route" đã bị loại bỏ. Route Guard giờ đây kiểm tra Token đồng bộ trước tiên.

## 2. Những Quy Tắc Mới Bắt Buộc (Mandatory Rules)
- **Server State**: BẮT BUỘC sử dụng TanStack Query (`useQuery`, `useMutation`).
- **Client State Toàn Cục**: BẮT BUỘC sử dụng Zustand (ví dụ `useToastStore`). Không lưu chung với Server State.
- **Single Source of Truth**: Cấm sao chép (mirror) `query.data` vào `useState` hoặc Zustand. Dữ liệu phải được đọc thẳng từ Query Cache.
- **Query Key Factory**: Không được gõ string hardcode (ví dụ `['products']`). Phải dùng Factory Pattern như `productKeys.list()`.
- **Mutation Invalidation**: Mọi hàm POST/PUT/DELETE bắt buộc phải có bước dọn Cache bằng `invalidateQueries` hoặc `setQueryData`. Cấm để Cache tự thiu (stale).
- **Quy tắc ViewModel**: Chỉ tạo `useViewModel` khi có logic cực phức tạp, ghép nhiều query. Tuyệt đối **CẤM** tạo ViewModel theo kiểu "pass-through" rỗng tuếch.

## 3. Các Tài Liệu Đã Được Cập Nhật & Tạo Mới

### Cập nhật (Refactored Docs):
1. [ARCHITECTURE_OVERVIEW.md](file:///d:/study/ute/3%20-%20HK2/z_Project_MTKPM_QLDA/PROJ_ShopKeyCap/Web_ShopKeyCap/docs/architecture/ARCHITECTURE_OVERVIEW.md)
2. [ARCHITECTURE_RULES.md](file:///d:/study/ute/3%20-%20HK2/z_Project_MTKPM_QLDA/PROJ_ShopKeyCap/Web_ShopKeyCap/docs/architecture/ARCHITECTURE_RULES.md)
3. [ANTI_PATTERN_CATALOG.md](file:///d:/study/ute/3%20-%20HK2/z_Project_MTKPM_QLDA/PROJ_ShopKeyCap/Web_ShopKeyCap/docs/architecture/ANTI_PATTERN_CATALOG.md)
4. [AI_WORKFLOW.md](file:///d:/study/ute/3%20-%20HK2/z_Project_MTKPM_QLDA/PROJ_ShopKeyCap/Web_ShopKeyCap/docs/ai/AI_WORKFLOW.md)

### Tạo mới (New Standards):
1. [STATE_MANAGEMENT_STANDARD.md](file:///d:/study/ute/3%20-%20HK2/z_Project_MTKPM_QLDA/PROJ_ShopKeyCap/Web_ShopKeyCap/docs/architecture/STATE_MANAGEMENT_STANDARD.md)
2. [QUERY_GUIDELINES.md](file:///d:/study/ute/3%20-%20HK2/z_Project_MTKPM_QLDA/PROJ_ShopKeyCap/Web_ShopKeyCap/docs/architecture/QUERY_GUIDELINES.md)
3. [VIEWMODEL_GUIDELINES.md](file:///d:/study/ute/3%20-%20HK2/z_Project_MTKPM_QLDA/PROJ_ShopKeyCap/Web_ShopKeyCap/docs/architecture/VIEWMODEL_GUIDELINES.md)
4. [AI_STATE_MANAGEMENT_RULES.md](file:///d:/study/ute/3%20-%20HK2/z_Project_MTKPM_QLDA/PROJ_ShopKeyCap/Web_ShopKeyCap/docs/ai/AI_STATE_MANAGEMENT_RULES.md)

> [!IMPORTANT]
> **Kết Luận Mở Rộng:** Kể từ bây giờ, mọi Developer (và cả AI Agent) khi tham gia vào dự án `Web_ShopKeyCap` **BẮT BUỘC** phải tuân thủ nghiêm ngặt hệ sinh thái tài liệu này để đảm bảo tính nhất quán của source code.
