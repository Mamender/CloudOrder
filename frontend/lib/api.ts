import { ApiResponse, AuthResponseData, CreateProductInput, Product, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('cloudorder_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data: ApiResponse<T> = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An unexpected error occurred');
      }

      return data;
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : 'Unknown network error';
      console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, errMessage);
      throw error;
    }
  }

  // Auth Methods
  public async register(payload: {
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'admin';
  }): Promise<ApiResponse<AuthResponseData>> {
    return this.request<AuthResponseData>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  public async login(payload: {
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthResponseData>> {
    return this.request<AuthResponseData>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  public async getMe(): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/me', {
      method: 'GET',
    });
  }

  // Product Methods
  public async getProducts(params?: {
    search?: string;
    category?: string;
  }): Promise<ApiResponse<Product[]>> {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.category && params.category !== 'all') {
      query.append('category', params.category);
    }

    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request<Product[]>(`/products${qs}`, {
      method: 'GET',
    });
  }

  public async getProductById(id: number): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${id}`, {
      method: 'GET',
    });
  }

  public async createProduct(payload: CreateProductInput): Promise<ApiResponse<Product>> {
    return this.request<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  public async deleteProduct(id: number): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();
