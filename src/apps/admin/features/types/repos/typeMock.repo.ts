import type { Type } from "../models/type.model";

const mockTypes: Type[] = [
    { id: 1, name: "Fullsize", slug: "fullsize" },
    { id: 2, name: "TKL", slug: "tkl" },
    { id: 3, name: "75%", slug: "75" },
    { id: 4, name: "60%", slug: "60" }
];

export const typeMockRepo = {
    getTypes: async (): Promise<Type[]> => {
        return new Promise(resolve => {
            setTimeout(() => resolve(mockTypes), 500);
        });
    }
};
