import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { ApiException } from "../../../../../core/exceptions/api.exception";
import type { UpdateCartRequest } from "../dto/UpdateCartRequest.dto";
import type { CartSummaryModel } from "../model/summary.model";
import type { CartDetailModel, CartItemModel } from "../model/cart.model";
import type { CartRepo } from "./cart.repo";

// Mock database (variantId -> quantity)
const mockItems: Map<string, number> = new Map([
    ["v1", 2],
    ["v2", 1],
    ["v3", 1],
]);

// Single source of truth for mock product data, simulating the database records
const mockProducts: Record<string, CartItemModel> = {
    "v1": {
        id: "c1",
        product: { id: "p1", name: "Bàn phím cơ Akko Mod007 PC", slug: "akko-mod007", imageUrl: "https://placehold.co/150x150/e2e8f0/64748b?text=Akko" },
        variant: { id: "v1", attributes: { "Màu sắc": "Trắng", "Switch": "CS Piano" }, price: 1500000, originalPrice: 1800000, percentDiscount: 16, quantity: 2, stockQuantity: 10 }
    },
    "v2": {
        id: "c2",
        product: { id: "p2", name: "Bộ Keycap PBT Cherry Profile", slug: "keycap-pbt", imageUrl: "https://placehold.co/150x150/e2e8f0/64748b?text=Keycap" },
        variant: { id: "v2", attributes: { "Màu sắc": "Botanical", "Profile": "Cherry" }, price: 500000, originalPrice: 500000, percentDiscount: 0, quantity: 1, stockQuantity: 3 }
    },
    "v3": {
        id: "c3",
        product: { id: "p3", name: "Chuột không dây Logitech G Pro X", slug: "logi-gpro", imageUrl: "https://placehold.co/150x150/e2e8f0/64748b?text=Logitech" },
        variant: { id: "v3", attributes: { "Màu sắc": "Đen" }, price: 2500000, originalPrice: 2900000, percentDiscount: 14, quantity: 1, stockQuantity: 5 }
    }
};

const totalCount = () => Array.from(mockItems.values()).reduce((sum, q) => sum + q, 0);

const calculateTotalPrice = () => {
    let total = 0;
    mockItems.forEach((qty, id) => {
        const p = mockProducts[id];
        if (p?.variant) total += p.variant.price * qty;
    });
    return total;
};

// Helper response builders
const ok = <T>(data: T, message: string): ApiResponse<T> => ({
    success: true,
    message,
    data,
});

const fail = <T>(message: string): ApiResponse<T> => ({
    success: false,
    message,
    data: undefined as T,
});

const LOGGED_IN = true;

// Repo
export class CartMockRepo implements CartRepo {
    async getCartSummary(): Promise<ApiResponse<CartSummaryModel>> {
        return ok<CartSummaryModel>(
            { cartCount: totalCount() },
            "Lấy thông tin giỏ hàng thành công"
        );
    }

    async getCarts(): Promise<ApiResponse<CartDetailModel>> {
        if (!LOGGED_IN) {
            throw new ApiException("Bạn phải đăng nhập để xem giỏ hàng", 401);
        }

        const items = Array.from(mockItems.entries()).map(([variantId, qty]) => {
            const p = mockProducts[variantId];
            if (!p || !p.variant) return null;
            return {
                ...p,
                variant: {
                    ...p.variant,
                    quantity: qty,
                }
            };
        }).filter(Boolean) as CartItemModel[];

        const total = calculateTotalPrice();

        return ok<CartDetailModel>({
            items,
            summary: {
                total,
                cartCount: totalCount(),
            }
        }, "Lấy giỏ hàng thành công");
    }

    async addToCart(variantId: string, quantity: number): Promise<ApiResponse<{ newCartCount: number }>> {
        if (LOGGED_IN) {
            if (quantity <= 0) {
                return fail<null>("Số lượng phải lớn hơn 0");
            }

            const current = mockItems.get(variantId) ?? 0;
            mockItems.set(variantId, current + quantity);

            return ok({ newCartCount: totalCount() }, "Thêm sản phẩm vào giỏ hàng thành công");
        }
        throw new ApiException("Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng", 401);
    }

    async updateCartItem(request: UpdateCartRequest[]): Promise<ApiResponse<{ newCartCount: number; totalPrice?: number }>> {
        if (LOGGED_IN) {
            for (const { variantId, quantity } of request) {
                if (quantity <= 0) {
                    return fail<null>(`Số lượng của variant ${variantId} phải lớn hơn 0`);
                }

                if (!mockItems.has(variantId)) {
                    return fail<null>(`Variant ${variantId} không tồn tại trong giỏ hàng`);
                }

                mockItems.set(variantId, quantity);
            }

            return ok({ newCartCount: totalCount(), totalPrice: calculateTotalPrice() }, "Cập nhật giỏ hàng thành công");
        }
        throw new ApiException("Bạn phải đăng nhập để cập nhật giỏ hàng", 401);
    }

    async deleteCartItem(variantId: string): Promise<ApiResponse<{ newCartCount: number; totalPrice?: number }>> {
        if (LOGGED_IN) {
            if (!mockItems.has(variantId)) {
                return fail<null>(`Variant ${variantId} không tồn tại trong giỏ hàng`);
            }

            mockItems.delete(variantId);

            return ok({ newCartCount: totalCount(), totalPrice: calculateTotalPrice() }, "Xóa sản phẩm khỏi giỏ hàng thành công");
        }
        throw new ApiException("Bạn phải đăng nhập để cập nhật giỏ hàng", 401);
    }
}
