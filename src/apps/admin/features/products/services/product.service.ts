import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { CreateProductRequest } from "../models/create-product.request";
import type { UpdateProductRequest } from "../models/update-product.request";
import type { ProductRepo } from "../repo/product.repo";
import { ProductApiRepo } from "../repo/productApi.repo";
import { ProductMockRepo } from "../repo/productMock.repo";

export class ProductService {
    private readonly repo: ProductRepo;

    constructor() {
        this.repo = USE_MOCK ? new ProductMockRepo() : new ProductApiRepo();
    }

    async getProducts(page: number, limit?: number, search?: string) {
        return this.repo.getProducts(page, limit, search);
    }

    async getProductById(id: number) {
        return this.repo.getProductById(id);
    }

    async createProduct(request: CreateProductRequest) {
        return this.repo.createProduct(request);
    }

    async updateProduct(request: UpdateProductRequest) {
        return this.repo.updateProduct(request);
    }

    async deleteProduct(id: number) {
        return this.repo.deleteProduct(id);
    }
}

export const productService = new ProductService();
