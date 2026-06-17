# VariantPricingTable Refactor — Báo cáo

**Ngày thực hiện**: 2026-06-17  
**Phiên bản Plan**: Implementation Plan v2 (Variant Workspace Architecture — Updated)

---

## 1. Chức năng Auto-generate Variant đã được khôi phục

### Root Cause của bug cũ

`useEffect` trong `VariantPricingTable.tsx` (cũ) dùng **stale closure** để đọc `variants`:

```ts
// BUG: variants đọc từ stale closure (luôn là giá trị cũ khi effect mount)
useEffect(() => {
    const existing = variants.find(...); // ← stale variants
}, [combinations]); // ← thiếu variants, setValue trong deps
```

Thêm `variants` vào deps sẽ gây infinite loop: `variants` thay đổi → effect → `setValue` → `variants` thay đổi → ...

### Giải pháp được áp dụng

Dùng **ref pattern** — update ref trực tiếp trong render body, đọc từ ref trong `useEffect`:

```ts
// Trong useVariantPricingController:
const variantsRef = useRef<ProductVariant[]>(variants);
variantsRef.current = variants; // luôn là giá trị mới nhất

useEffect(() => {
    const merged = mergeAndSyncVariants(combinations, variantsRef.current, defaultsRef.current);
    if (!isVariantListEqual(merged, variantsRef.current)) {
        setValue('variants', merged, { shouldDirty: true });
    }
}, [generatedCombinations]); // chỉ trigger khi options thay đổi
```

**Tại sao không loop**:
- `generatedCombinations` chỉ thay đổi khi `options` thay đổi (useMemo với JSON.stringify)
- `variants` không có trong deps (đọc từ ref)
- Guard `isVariantListEqual` ngăn `setValue` khi cấu trúc không đổi

### Hành vi sau khi sửa

| Thao tác của Admin | Kết quả |
|---|---|
| Thêm Option "Size" với S, M | Bảng tự sinh 2 dòng: S, M |
| Thêm Option "Color" với Red, Blue | Bảng tự sinh 4 dòng: S-Red, S-Blue, M-Red, M-Blue |
| Xóa Color | Bảng thu gọn về S, M — data S và M giữ nguyên |
| Thêm "L" vào Size | Append L-Red, L-Blue — S/M data không đổi |

---

## 2. Cách Preserve dữ liệu khi Regenerate

Hàm `mergeAndSyncVariants` trong controller:

```
Với mỗi combination trong generatedCombinations:
  ├── Tìm variant cũ có attributes khớp (matchAttributes)
  │     └── Tìm thấy → copy TOÀN BỘ object (price, stock, sku, ...)
  └── Không tìm thấy → tạo mới với default values
```

**Key matching** dùng `makeAttributeKey` — sort keys trước khi stringify để đảm bảo
`{ Size:'S', Color:'Red' }` và `{ Color:'Red', Size:'S' }` ra cùng key.

**Trường hợp bị reset**: Khi đổi **tên** Option (ví dụ "Size" → "Kích thước"), attributes key thay đổi hoàn toàn → không thể match → tạo mới với defaults. Đây là hành vi có thể chấp nhận (data không khớp semantic).

**Delete variant**: Xóa trực tiếp khỏi `variants[]`. Variant bị xóa sẽ **không tự restore** khi options thay đổi sau đó (vì `mergeAndSyncVariants` chỉ produce variants theo `generatedCombinations` hiện tại — không theo variants cũ).

---

## 3. Logic đã chuyển sang `VariantPricingTable.controller.ts`

### Pure Functions (stateless, không có side effect)

| Function | Mô tả |
|---|---|
| `makeAttributeKey(attributes)` | Tạo stable key từ attributes (sort keys) |
| `matchAttributes(variantAttrs, comboAttrs)` | So khớp 2 attributes objects |
| `generateVariantCombinations(options)` | Cartesian Product từ options |
| `mergeAndSyncVariants(combos, existing, defaults)` | Merge + preserve + append |
| `isVariantListEqual(a, b)` | Guard để tránh gọi setValue không cần thiết |
| `isVariantAlreadyExists(attrs, variants)` | Kiểm tra duplicate |
| `checkValueAvailable(optionName, value, ...)` | Dropdown Add Variant: value có khả dụng không |
| `addNewVariant(combo, existing, defaults)` | Append variant mới vào danh sách |
| `deleteVariant(variants, index)` | Xóa variant tại index |
| `updateVariantField(variants, index, field, value)` | Cập nhật field của variant |
| `syncVariantPricing(variants, index, field, value)` | Cập nhật price với auto-sync discount |

### Hook: `useVariantPricingController(control, setValue)`

Chịu trách nhiệm:
- Đọc form state qua `useWatch`
- Quản lý `addPanelOpen`, `partialSelection` state (cho Add Variant panel)
- Auto-generate `useEffect` với stale closure fix
- Export toàn bộ handlers cho component

---

## 4. Danh sách file đã chỉnh sửa

| File | Action | Mô tả |
|---|---|---|
| `cpnControllers/VariantPricingTable.controller.ts` | **[NEW]** | Toàn bộ business logic, pure functions, hook controller |
| `components/VariantPricingTable.tsx` | **[REWRITE]** | Chỉ còn render UI + bind controller |
| `ProductDetail.controller.ts` | Không thay đổi | Submit flow không cần sửa |
| `ProductForm.tsx` | Không thay đổi | API call sang VariantPricingTable không thay đổi |
| `ProductOptionEditor.tsx` | Không thay đổi | Logic options độc lập |

---

## 5. Xác nhận VariantPricingTable.tsx chỉ còn nhiệm vụ Render UI

File sau refactor chứa:
- ✅ Import `useVariantPricingController` và `makeAttributeKey`
- ✅ Render `<table>` với header/body chuẩn
- ✅ Bind handlers từ `ctrl.*` vào inputs và buttons
- ✅ Render "Add Variant" panel UI với dropdown thông minh

File **không còn** chứa:
- ❌ `generateCombinations` (chuyển sang controller: `generateVariantCombinations`)
- ❌ `useEffect` (chuyển sang controller: auto-generate effect)
- ❌ `useMemo` (chuyển sang controller: `generatedCombinations`)
- ❌ `handleVariantChange` (chuyển sang controller: `handleVariantFieldChange`)
- ❌ `handleVariantPriceSync` (chuyển sang controller: `handleVariantPriceSync`)
- ❌ `handleDeleteVariant` (chuyển sang controller: `handleDeleteVariant`)
- ❌ `useWatch` cho `options`, `variants`, `price`, `stock`... (chuyển hết vào controller)

---

## 6. Xác nhận không thay đổi DTO/API và không phá vỡ chức năng hiện có

- ✅ `ProductVariant` interface không thay đổi
- ✅ `ProductOption` interface không thay đổi
- ✅ `AdminProductDetail` model không thay đổi
- ✅ `ProductDetail.controller.ts` submit flow giữ nguyên: `form.handleSubmit(data => ...)` với `data.variants` là mảng clean do Admin quản lý
- ✅ Props của `VariantPricingTable` (`control`, `register`, `setValue`, `isEditing`) giữ nguyên — `ProductForm.tsx` không cần sửa
- ✅ Không thêm field mới vào backend DTO
- ✅ Không thay đổi API request/response

---

## 7. Rủi ro còn lại

| Rủi ro | Mức độ | Ghi chú |
|---|---|---|
| Đổi tên Option reset data variant | Thấp | Đây là hành vi tất yếu do attribute key thay đổi. Admin cần nhập lại giá nếu đổi tên option. |
| `useMemo` với `JSON.stringify(options)` | Thấp | Stringify đảm bảo deep compare cho options array. Nếu options object rất lớn, có thể tốn performance nhẹ. Thực tế số options của sản phẩm ít (< 5) nên không đáng lo. |
| TypeScript `Control<any>` | Thấp | Dùng `any` cho form control để tương thích với react-hook-form không có generic strict. Pre-existing pattern trong project. |
| Add Variant mở sau khi delete tất cả | Thấp | Khi `variants.length === 0` nhưng `generatedCombinations.length > 0`, component chỉ hiện nút "Thêm Variant". UX hơi trống nhưng chức năng vẫn đúng. |
