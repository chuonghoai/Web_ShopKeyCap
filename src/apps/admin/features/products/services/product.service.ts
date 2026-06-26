import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { CreateProductRequest } from "../models/create-product.request";
import type { UpdateProductRequest } from "../models/update-product.request";
import type { ProductRepo } from "../repo/product.repo";
import { ProductApiRepo } from "../repo/productApi.repo";
import { ProductMockRepo } from "../repo/productMock.repo";

export class ProductService {
    private readonly repo: ProductRepo;

    constructor(productRepo: ProductRepo) {
        this.repo = productRepo;
    }

    async getProducts(page: number, limit?: number, search?: string) {
        return this.repo.getProducts(page, limit, search);
    }

    async getProductById(id: number) {
        return this.repo.getProductById(id);
    }

    async createProduct(request: CreateProductRequest) {
        console.log('Data request: ', request);
        const res = await this.repo.createProduct(request);
        console.log('Data response: ', res);
        return res;
    }

    async updateProduct(request: UpdateProductRequest) {
        console.log('Data request: ', request);
        const res = this.repo.updateProduct(request);
        console.log('Data response: ', res);
        return res;
    }

    async deleteProduct(id: number) {
        return this.repo.deleteProduct(id);
    }
}

export const productService = new ProductService(USE_MOCK ? new ProductMockRepo() : new ProductApiRepo());
