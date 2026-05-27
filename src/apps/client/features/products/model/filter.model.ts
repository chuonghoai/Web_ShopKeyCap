export interface FilterModel {
    category: Category[];
    type: Type[];
    brand: Brand[];
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface Type {
    id: string;
    name: string;
    slug: string;
}

interface Brand {
    id: string;
    name: string;
    slug: string;
}

export const SORT_OPTIONS = [
    { slug: 'DEFAULT', name: "Mặc định" },
    { slug: 'A_Z', name: 'Tên: A - Z' },
    { slug: 'Z_A', name: 'Tên: Z - A' },
    { slug: 'NEWEST', name: 'Mới nhất' },
    { slug: 'PRICE_ASC', name: 'Giá: Thấp đến cao' },
    { slug: 'PRICE_DESC', name: 'Giá: Cao đến thấp' },
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number]['slug'];