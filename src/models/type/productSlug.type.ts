export const ProductTypeSlug = {
    KEYBOARD: "ban-phim",
} as const;

export type ProductTypeSlug = (typeof ProductTypeSlug)[keyof typeof ProductTypeSlug];