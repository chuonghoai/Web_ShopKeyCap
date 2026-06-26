export interface CartItemModel {
    id: number;
    product: {
        id: number;
        name: string;
        slug: string;
        imageUrl: string;
    };
    variant?: {
        id: number;
        attributes: Record<string, string>;

        price: number;
        originalPrice: number;
        percentDiscount: number;
        quantity: number;

        stockQuantity: number;
    };
}

export interface CartDetailModel {
    items: CartItemModel[];
    summary: {
        total: number;
        cartCount: number;
    };
}
