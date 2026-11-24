import fs from 'fs/promises';
import { config } from '../config/index.js';
import type { Product, ProductDataPayload, CreateProductDTO, UpdateProductDTO } from '../types/product.types.js';

class ProductService {
  private filePath: string;

  constructor() {
    this.filePath = config.dataPath;
  }

  private async readData(): Promise<ProductDataPayload> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as ProductDataPayload;
    } catch (error) {
      console.error('Error reading product data file:', error);
      throw new Error('Unable to read products database');
    }
  }

  private async writeData(data: ProductDataPayload): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing product data file:', error);
      throw new Error('Unable to save products database');
    }
  }

  public async getAll(options?: {
    search?: string | undefined;
    category?: string | undefined;
    limit?: number | undefined;
    skip?: number | undefined;
  }): Promise<{ products: Product[]; total: number; skip: number; limit: number }> {
    const data = await this.readData();
    let filtered = data.products;

    if (options?.category) {
      const categoryLower = options.category.toLowerCase();
      filtered = filtered.filter((p) => p.category.toLowerCase() === categoryLower);
    }

    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          (p.brand && p.brand.toLowerCase().includes(searchLower))
      );
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

  public async getById(id: number): Promise<Product | null> {
    const data = await this.readData();
    const product = data.products.find((p) => p.id === id);
    return product || null;
  }

  public async create(productData: CreateProductDTO): Promise<Product> {
    const data = await this.readData();

    // Generate unique ID if not provided
    const nextId = productData.id || (
      data.products.length > 0 
        ? Math.max(...data.products.map((p) => p.id)) + 1 
        : 1
    );

    const newProduct: Product = {
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

  public async update(id: number, updates: UpdateProductDTO): Promise<Product | null> {
    const data = await this.readData();
    const index = data.products.findIndex((p) => p.id === id);

    if (index === -1) {
      return null;
    }

    const existingProduct = data.products[index];
    if (!existingProduct) {
      return null;
    }

    const updatedProduct: Product = {
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

  public async delete(id: number): Promise<Product | null> {
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
