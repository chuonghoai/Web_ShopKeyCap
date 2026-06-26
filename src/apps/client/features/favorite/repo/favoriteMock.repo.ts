import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { FavoriteRepo } from "./favorite.repo";
import { MOCK_PRODUCT_DETAIL } from "../../products/repo/productMock.repo";
import { ApiException } from "../../../../../core/exceptions/api.exception";

const TOGGLE_FAVORITE_SUCCESS = false;

export class FavoriteMockRepo implements FavoriteRepo {
    async toggleFavorite(productId: number): Promise<ApiResponse<{ isFavorite: boolean }>> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!TOGGLE_FAVORITE_SUCCESS) {
                    reject(new ApiException("Không thể cập nhật trạng thái yêu thích", 401));
                    return;
                }

                MOCK_PRODUCT_DETAIL.isFavorite = !MOCK_PRODUCT_DETAIL.isFavorite;

                resolve({
                    success: true,
                    message: `Cập nhật yêu thích sản phẩm ${productId} thành công`,
                    data: {
                        isFavorite: MOCK_PRODUCT_DETAIL.isFavorite
                    }
                });
            }, 300);
        });

    }
}
