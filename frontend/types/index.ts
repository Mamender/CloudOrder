export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  thumbnail?: string;
  images?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  total?: number;
  skip?: number;
  limit?: number;
}

export interface AuthResponseData {
  user: User;
  token: string;
}

export interface CreateProductInput {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand?: string;
}
