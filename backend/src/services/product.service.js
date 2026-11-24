import fs from 'fs/promises';
import { config } from '../config/index.js';
class ProductService {
    filePath;
    constructor() {
        this.filePath = config.dataPath;
    }
    async readData() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error reading product data file:', error);
            throw new Error('Unable to read products database');
        }
    }
    async writeData(data) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
        }
        catch (error) {
            console.error('Error writing product data file:', error);
            throw new Error('Unable to save products database');
        }
    }
    async getAll(options) {
        const data = await this.readData();
        let filtered = data.products;
        if (options?.category) {
            const categoryLower = options.category.toLowerCase();
            filtered = filtered.filter((p) => p.category.toLowerCase() === categoryLower);
        }
        if (options?.search) {
            const searchLower = options.search.toLowerCase();
            filtered = filtered.filter((p) => p.title.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower) ||
                (p.brand && p.brand.toLowerCase().includes(searchLower)));
        }
        const total = filtered.length;
        const skip = options?.skip ?? 0;
        const limit = options?.limit ?? total;
        const paginatedProducts = filtered.slice(skip, skip + limit);
        return {
            products: paginatedProducts,
            total,
            skip,
            limit,
        };
    }
    async getById(id) {
        const data = await this.readData();
        const product = data.products.find((p) => p.id === id);
        return product || null;
    }
    async create(productData) {
        const data = await this.readData();
        // Generate unique ID if not provided
        const nextId = productData.id || (data.products.length > 0
            ? Math.max(...data.products.map((p) => p.id)) + 1
            : 1);
        const newProduct = {
            ...productData,
            id: nextId,
            meta: productData.meta || {
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                barcode: '',
                qrCode: '',
            },
        };
        data.products.push(newProduct);
        data.total = data.products.length;
        await this.writeData(data);
        return newProduct;
    }
    async update(id, updates) {
        const data = await this.readData();
        const index = data.products.findIndex((p) => p.id === id);
        if (index === -1) {
            return null;
        }
        const existingProduct = data.products[index];
        if (!existingProduct) {
            return null;
        }
        const updatedProduct = {
            ...existingProduct,
            ...updates,
            id: existingProduct.id, // ID remains immutable
            meta: {
                ...(existingProduct.meta || {
                    createdAt: new Date().toISOString(),
                    barcode: '',
                    qrCode: '',
                }),
                ...(updates.meta || {}),
                updatedAt: new Date().toISOString(),
            },
        };
        data.products[index] = updatedProduct;
        await this.writeData(data);
        return updatedProduct;
    }
    async delete(id) {
        const data = await this.readData();
        const index = data.products.findIndex((p) => p.id === id);
        if (index === -1) {
            return null;
        }
        const [deletedProduct] = data.products.splice(index, 1);
        data.total = data.products.length;
        await this.writeData(data);
        return deletedProduct ?? null;
    }
}
export const productService = new ProductService();
//# sourceMappingURL=product.service.js.map