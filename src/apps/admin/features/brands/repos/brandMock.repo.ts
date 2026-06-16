import type { Brand } from "../models/brand.model";

const mockBrands: Brand[] = [
    { id: 1, name: "Akko", slug: "akko" },
    { id: 2, name: "Logitech", slug: "logitech" },
    { id: 3, name: "Razer", slug: "razer" },
    { id: 4, name: "Corsair", slug: "corsair" }
];

export const brandMockRepo = {
    getBrands: async (): Promise<Brand[]> => {
        return new Promise(resolve => {
            setTimeout(() => resolve(mockBrands), 500);
        });
    }
};
