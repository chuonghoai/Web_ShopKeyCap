import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { FavoriteRepo } from "./favorite.repo";

export class FavoriteApiRepo implements FavoriteRepo {
    /**
     * POST /favorites/:productId
     * @param productId
     * @returns isFavorite
     */
    async toggleFavorite(productId: number): Promise<ApiResponse<{ isFavorite: boolean }>> {
        const response = await apiClient.post<ApiResponse<{ isFavorite: boolean }>>(`/favorites/${productId}`);
        return response;
    }
}
