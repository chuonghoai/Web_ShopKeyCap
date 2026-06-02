import type { ApiResponse } from "../../../../../core/api/apiResponse";

export interface FavoriteRepo {
    toggleFavorite(productId: string): Promise<ApiResponse<{ isFavorite: boolean }>>;
}
