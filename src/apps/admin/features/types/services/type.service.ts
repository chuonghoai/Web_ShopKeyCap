import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { TypeRepo } from "../repos/type.repo";
import { TypeApiRepo } from "../repos/typeApi.repo";
import { TypeMockRepo } from "../repos/typeMock.repo";

export class TypeService {
    private readonly repo: TypeRepo;

    constructor(typeRepo: TypeRepo) {
        this.repo = typeRepo;
    }

    async getTypes() {
        return this.repo.getTypes();
    }
}

export const typeService = new TypeService(USE_MOCK ? new TypeMockRepo() : new TypeApiRepo());
