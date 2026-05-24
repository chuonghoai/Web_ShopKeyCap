const SortOption = {
    POPULAR: 'popular',
    NEWEST: 'newest',
    PRICE_ASC: 'price_asc',
    PRICE_DESC: 'price_desc',
} as const;
export type SortOption = (typeof SortOption)[keyof typeof SortOption];

export interface FilterState {
    keyword: string;
    categoryIds: string[];
    sort: SortOption;
    priceMin: number;
    priceMax: number;
}