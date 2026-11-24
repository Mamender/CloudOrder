'use client';

import React, { useState } from 'react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  onDelete: (id: number) => Promise<void>;
}

export function ProductCard({ product, isAdmin, onDelete }: ProductCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
      try {
        setIsDeleting(true);
        await onDelete(product.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="px-2.5 py-0.5 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full capitalize">
            {product.category}
          </span>
          {product.brand && (
            <span className="text-xs text-slate-500 font-medium truncate max-w-[120px]">
              {product.brand}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-slate-900 line-clamp-1 mb-1.5" title={product.title}>
          {product.title}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4 h-8 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
            {product.discountPercentage ? (
              <span className="ml-2 text-xs text-emerald-600 font-semibold">
                {product.discountPercentage}% off
              </span>
            ) : null}
          </div>

          <div className="text-right">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${
                product.stock > 10
                  ? 'bg-emerald-50 text-emerald-700'
                  : product.stock > 0
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Admin Action Section */}
      {isAdmin && (
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">ID: #{product.id}</span>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-xs font-semibold px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition duration-150 disabled:opacity-50 border border-red-200"
          >
            {isDeleting ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>
      )}
    </div>
  );
}
