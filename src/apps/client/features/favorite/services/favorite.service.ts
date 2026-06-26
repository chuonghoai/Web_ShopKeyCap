import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { FavoriteRepo } from "../repo/favorite.repo";
import { FavoriteApiRepo } from "../repo/favoriteApi.repo";
import { FavoriteMockRepo } from "../repo/favoriteMock.repo";

export class FavoriteService {
    private readonly favoriteRepo: FavoriteRepo;

    constructor(favoriteRepo?: FavoriteRepo) {
        this.favoriteRepo = favoriteRepo ?? new FavoriteApiRepo();
    }

    async toggleFavorite(productId: number): Promise<ApiResponse<{ isFavorite: boolean }>> {
        return this.favoriteRepo.toggleFavorite(productId);
    }
}

export const favoriteService = new FavoriteService(USE_MOCK ? new FavoriteMockRepo() : undefined);
