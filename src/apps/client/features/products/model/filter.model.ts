export interface FilterModel {
    category: Category[];
    type: Type[];
    brand: Brand[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Type {
    id: number;
    name: string;
    slug: string;
}

export interface Brand {
    id: number;
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