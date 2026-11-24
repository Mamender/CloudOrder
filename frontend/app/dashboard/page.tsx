'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { AddProductModal } from '@/components/AddProductModal';
import { EditProductModal } from '@/components/EditProductModal';
import { Alert } from '@/components/Alert';
import { api } from '@/lib/api';
import { Product, CreateProductInput, UpdateProductInput } from '@/types';

export default function DashboardPage() {
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  // Protected route check
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  // Load products
  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.getProducts({
        search: search.trim() || undefined,
        category: category !== 'all' ? category : undefined,
      });

      if (res.data) {
        setProducts(res.data);
        setTotalCount(res.total ?? res.data.length);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch products from backend';
      setAlert({
        type: 'error',
        message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    let active = true;
    if (user) {
      api.getProducts({
        search: search.trim() || undefined,
        category: category !== 'all' ? category : undefined,
      })
        .then((res) => {
          if (active && res.data) {
            setProducts(res.data);
            setTotalCount(res.total ?? res.data.length);
            setIsLoading(false);
          }
        })
        .catch((err: unknown) => {
          if (active) {
            const message = err instanceof Error ? err.message : 'Failed to fetch products';
            setAlert({ type: 'error', message });
            setIsLoading(false);
          }
        });
    }
    return () => {
      active = false;
    };
  }, [user, search, category]);

  // Admin Add Product Handler
  const handleAddProduct = async (input: CreateProductInput) => {
    try {
      const res = await api.createProduct(input);
      setAlert({
        type: 'success',
        message: `Product "${res.data?.title}" created successfully!`,
      });
      loadProducts();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create product';
      setAlert({
        type: 'error',
        message,
      });
      throw err;
    }
  };

  // Admin Delete Product Handler
  const handleDeleteProduct = async (id: number) => {
    try {
      await api.deleteProduct(id);
      setAlert({
        type: 'success',
        message: `Product #${id} removed successfully.`,
      });
      loadProducts();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete product';
      setAlert({
        type: 'error',
        message,
      });
    }
  };

  // Admin Update Product Handler
  const handleUpdateProduct = async (id: number, input: UpdateProductInput) => {
    try {
      const res = await api.updateProduct(id, input);
      setAlert({
        type: 'success',
        message: `Product #${id} ("${res.data?.title || 'Product'}") updated successfully!`,
      });
      loadProducts();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update product';
      setAlert({
        type: 'error',
        message,
      });
      throw err;
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Alerts */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Product Inventory
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Showing {products.length} of {totalCount} items &bull;{' '}
              {isAdmin ? (
                <span className="text-purple-700 font-semibold">
                  Administrator Mode (Add & Delete Enabled)
                </span>
              ) : (
                <span className="text-blue-700 font-semibold">
                  Customer Mode (Read-Only Catalog)
                </span>
              )}
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition duration-150"
            >
              + Add New Product
            </button>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products by title, description, or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="sm:w-56">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="beauty">Beauty</option>
              <option value="fragrances">Fragrances</option>
              <option value="furniture">Furniture</option>
              <option value="groceries">Groceries</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm font-medium text-slate-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
            <span className="text-4xl block mb-2">🔍</span>
            <h3 className="text-lg font-semibold text-slate-900">No products found</h3>
            <p className="text-sm text-slate-500 mt-1">
              Try adjusting your search criteria or category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAdmin={isAdmin}
                onEdit={setEditingProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add Product Modal (Admin Only) */}
      {isAdmin && (
        <>
          <AddProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddProduct}
          />
          <EditProductModal
            isOpen={Boolean(editingProduct)}
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSubmit={handleUpdateProduct}
          />
        </>
      )}
    </div>
  );
}
