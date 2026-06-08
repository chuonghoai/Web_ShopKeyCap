/**
 * useMock.config.ts
 *
 * Cấu hình quyết định project sẽ chạy Mock Repository hay Api Repository.
 *
 * - true  → Dùng MockRepo (dữ liệu giả, không cần backend)
 * - false → Dùng ApiRepo  (gọi API thực tế)
 *
 * Thay đổi giá trị USE_MOCK để chuyển đổi chế độ toàn bộ project.
 */
export const USE_MOCK: boolean = false;
