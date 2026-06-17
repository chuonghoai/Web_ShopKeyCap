# Tích hợp Brand / Category / Type vào luồng Product Detail và Create/Edit

---

## 1. Các file đã chỉnh sửa

| File | Loại thay đổi |
|---|---|
| `src/apps/admin/pages/products/ProductDetail.controller.ts` | Sửa `defaultValues`, `form.reset()`, `handleSave` |
| `src/apps/admin/features/products/models/create-product.request.ts` | Đã có `brandId`, `categoryId`, `typeId` (cập nhật bởi user) |
| `src/apps/admin/features/brands/repos/brandApi.repo.ts` | Refactor sang Class, `async` method |
| `src/apps/admin/features/brands/repos/brandMock.repo.ts` | Refactor sang Class, bỏ `statusCode` |
| `src/apps/admin/features/categories/repos/categoryApi.repo.ts` | Refactor sang Class, `async` method |
| `src/apps/admin/features/categories/repos/categoryMock.repo.ts` | Refactor sang Class, bỏ `statusCode` |
| `src/apps/admin/features/types/repos/typeApi.repo.ts` | Refactor sang Class, `async` method |
| `src/apps/admin/features/types/repos/typeMock.repo.ts` | Refactor sang Class, bỏ `statusCode`, cập nhật mock data |
| `src/apps/admin/pages/products/components/ProductClassificationSection.tsx` | Sửa import path |

---

## 2. Luồng Get Product đã được tích hợp như thế nào

```
API → productService.getProductById(id)
    → productDetailRes.data (AdminProductDetail)
    → productDetail.brand  { id, name, slug }
    → productDetail.category { id, name, slug }
    → productDetail.type  { id, name, slug }
    → form.reset({
          ...productDetail,
          brandId:    productDetail.brand?.id    ?? 0,  ← mapping object → ID
          categoryId: productDetail.category?.id ?? 0,
          typeId:     productDetail.type?.id     ?? 0,
      })
    → Controller name="brandId" value={field.value}
    → <select> hiển thị đúng option được chọn ✓
```

**Vấn đề gốc rễ đã được sửa:** `form.reset()` cũ chỉ spread `...productDetail` — nhưng `productDetail` có `brand` là object `{id, name, slug}`, không phải số. `<select value={field.value}>` lúc đó nhận object, không khớp với bất kỳ option nào → dropdown hiển thị trắng. Sau sửa, `brandId: productDetail.brand?.id ?? 0` truyền đúng số ID vào form.

---

## 3. Luồng Create/Edit đã được tích hợp như thế nào

```
User chọn Brand/Category/Type dropdown
    → Controller onChange: field.onChange(Number(e.target.value))
    → form state: brandId=1, categoryId=2, typeId=1

handleSave() {
    // Validate IDs
    const brandId    = Number(data.brandId)    || 0
    const categoryId = Number(data.categoryId) || 0
    const typeId     = Number(data.typeId)     || 0

    // Guard: tất cả phải > 0
    if (!brandId || !categoryId || !typeId) { toast error; return }

    // Omit object fields (brand, category, type) — chỉ giữ IDs
    const { brand: _b, category: _c, type: _t, ...restData } = data

    const payload = {
        ...restData,    ← name, slug, description, imageUrl, etc.
        brandId,        ← số ID
        categoryId,
        typeId,
        minPrice,       ← tính từ variants
        maxPrice,
        totalStockQuantity,
        variants: activeVariants,
    }

    createMutation.mutate(payload)   // hoặc updateMutation
}
```

**Flow đầy đủ Form → API:**
```
Form (brandId=1)
  → handleSave (extract & validate brandId)
  → payload { brandId: 1, categoryId: 2, typeId: 1, ... }
  → createMutation.mutate(payload: CreateProductRequest)
  → productService.createProduct(request)
  → ProductApiRepo.createProduct(request)
  → POST /admin/products { ..., brandId: 1, categoryId: 2, typeId: 1 }
```

---

## 4. Các DTO được cập nhật

### `CreateProductRequest`
```ts
interface CreateProductRequest {
    name: string;
    slug?: string;

    brandId: number;     // ← required
    categoryId: number;  // ← required
    typeId: number;      // ← required

    description: string;
    imageUrl: string;
    thumbnailUrl: string[];
    specifications: Specifications[];
    options: ProductOption[];
    variants: ProductVariant[];

    minPrice: number;         // ← tính từ variants (không còn price/originalPrice)
    maxPrice: number;
    totalStockQuantity: number;
}
```

### `UpdateProductRequest`
```ts
interface UpdateProductRequest extends Partial<CreateProductRequest> {
    id: number;
}
```
Không cần thay đổi — kế thừa đầy đủ từ `CreateProductRequest`.

---

## 5. Các Controller được cập nhật

### `ProductDetail.controller.ts`

**Thay đổi 1 — `defaultValues`:**
```ts
// Trước: thiếu brandId, categoryId, typeId
defaultValues: { name: '', slug: '', ... }

// Sau: đầy đủ
defaultValues: {
    name: '', slug: '', description: '', imageUrl: '',
    thumbnailUrl: [], options: [], variants: [], specifications: [],
    brandId: 0,     // ← mới
    categoryId: 0,  // ← mới
    typeId: 0,      // ← mới
}
```

**Thay đổi 2 — `form.reset()` trong useEffect:**
```ts
// Trước: brand/category/type là objects, không match dropdown
form.reset({ ...productDetail })

// Sau: map objects sang IDs
form.reset({
    ...productDetail,
    brandId:    productDetail.brand?.id    ?? 0,
    categoryId: productDetail.category?.id ?? 0,
    typeId:     productDetail.type?.id     ?? 0,
})
```

**Thay đổi 3 — `handleSave` payload:**
```ts
// Trước: spread restData có thể chứa brand/category/type objects
const { price, originalPrice, ..., ...restData } = data

// Sau: destructure để omit objects, extract IDs rõ ràng
const { brand: _b, category: _c, type: _t, excludedVariantKeys: _ex, ...restData } = data
const brandId = Number(data.brandId) || 0
// + validation guard nếu thiếu
```

---

## 6. Các Form Binding được cập nhật

### `ProductClassificationSection.tsx`

| Field | Controller name | onChange | value binding |
|---|---|---|---|
| Thương hiệu | `"brandId"` | `field.onChange(Number(e.target.value))` | `value={field.value \|\| ""}` |
| Danh mục | `"categoryId"` | `field.onChange(Number(e.target.value))` | `value={field.value \|\| ""}` |
| Loại sản phẩm | `"typeId"` | `field.onChange(Number(e.target.value))` | `value={field.value \|\| ""}` |

- `value={field.value || ""}`: khi `field.value = 0` → hiển thị placeholder disabled; khi có ID hợp lệ → match đúng `<option value={id}>`.
- `onChange` convert string từ HTML select → number để khớp với DTO.

---

## 7. Kết quả kiểm tra end-to-end

### ✅ Create Product
- Ba dropdown load dữ liệu từ query hooks (Brands, Categories, Types)
- Loading spinner hiển thị khi đang fetch
- Error state hiển thị nếu fetch thất bại
- Chọn giá trị → `brandId`, `categoryId`, `typeId` cập nhật trong form state
- Submit → validation guard kiểm tra 3 IDs > 0
- `payload` gửi API chứa đầy đủ `brandId`, `categoryId`, `typeId`

### ✅ Edit Product
- Load Product Detail → `productDetail.brand.id` → mapped vào `brandId` → dropdown hiển thị đúng
- Tương tự Category và Type
- Thay đổi dropdown → `brandId` cập nhật
- Submit → payload chứa IDs mới
- Update thành công

### ✅ Regression
- `ProductForm.tsx`: không thay đổi behavior, chỉ render thêm `<ProductClassificationSection />`
- Variant logic: không bị ảnh hưởng
- SpecificationEditor, ProductOptionEditor, RichTextEditor: không bị ảnh hưởng
- Existing validations (variant count, price > 0): vẫn giữ nguyên
- Existing API integration: không thay đổi endpoint hay method

---

## 8. Những rủi ro hoặc TODO còn tồn tại

> **Rủi ro 1 — Slug không reset khi Edit:**  
> `useEffect` watch `nameValue` và auto-generate slug khi `isEditing && nameValue`. Khi người dùng bật chế độ Edit và không sửa tên, slug đã được `form.reset()` set đúng. Nhưng nếu họ sửa tên thì slug bị overwrite. Đây là behavior hiện tại, không phải bug mới.

> **Rủi ro 2 — `form` object trong deps của `useEffect`:**  
> `[productDetail, form, isNew]` — `form` object không thay đổi reference giữa renders (react-hook-form đảm bảo), nên không gây vòng lặp vô hạn. Tuy nhiên ESLint có thể cảnh báo. Có thể dùng `form.reset` thay vì `form` nếu cần.

> **TODO — Validation phía UI cho dropdown khi submit:**  
> `rules={{ required: "..." }}` trong Controller được đặt nhưng validation của RHF chỉ kích hoạt khi `handleSubmit`. Guard thủ công trong controller (`if (!brandId)`) đảm bảo UX fallback nếu RHF validation không chạy kịp. Có thể thống nhất một trong hai cách nếu muốn.
