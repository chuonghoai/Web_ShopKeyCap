import type { CreateProductRequest } from "./create-product.request";

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
    id: number;
}
