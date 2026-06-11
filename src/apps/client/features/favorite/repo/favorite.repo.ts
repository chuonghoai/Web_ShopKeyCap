import type { ApiResponse } from "../../../../../core/api/apiResponse";

export interface FavoriteRepo {
    toggleFavorite(productId: number): Promise<ApiResponse<{ isFavorite: boolean }>>;
}
