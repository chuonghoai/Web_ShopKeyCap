export const CategorySlug = {
    GAMING: "gaming",
    VAN_PHONG: "van-phong",
} as const;

export type ProductTypeSlug = (typeof CategorySlug)[keyof typeof CategorySlug];