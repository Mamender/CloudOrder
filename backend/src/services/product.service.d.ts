import type { Product, CreateProductDTO, UpdateProductDTO } from '../types/product.types.js';
declare class ProductService {
    private filePath;
    constructor();
    private readData;
    private writeData;
    getAll(options?: {
        search?: string | undefined;
        category?: string | undefined;
        limit?: number | undefined;
        skip?: number | undefined;
    }): Promise<{
        products: Product[];
        total: number;
        skip: number;
        limit: number;
    }>;
    getById(id: number): Promise<Product | null>;
    create(productData: CreateProductDTO): Promise<Product>;
    update(id: number, updates: UpdateProductDTO): Promise<Product | null>;
    delete(id: number): Promise<Product | null>;
}
export declare const productService: ProductService;
export {};
//# sourceMappingURL=product.service.d.ts.map