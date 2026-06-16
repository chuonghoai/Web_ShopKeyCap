import { typeApiRepo } from "../repos/typeApi.repo";
import { typeMockRepo } from "../repos/typeMock.repo";
import type { Type } from "../models/type.model";
import { USE_MOCK } from "../../../../../core/config/useMock.config";

export const typeService = {
    getTypes: async (): Promise<Type[]> => {
        if (USE_MOCK) {
            return typeMockRepo.getTypes();
        }
        return typeApiRepo.getTypes();
    }
};
