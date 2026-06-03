export interface CartItemModel {
    id: string;
    product: {
        id: string;
        name: string;
        slug: string;
        imageUrl: string;
    };
    variant?: {
        id: string;
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
