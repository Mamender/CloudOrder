'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl">☁️</span>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">CloudOrder</span>
              <span className="ml-2 text-xs uppercase px-2 py-0.5 rounded font-mono font-medium bg-slate-800 text-slate-300">
                Dashboard
              </span>
            </div>
          </div>

          {/* User profile & controls */}
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-slate-300 font-medium">{user.name}</span>
                {isAdmin ? (
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/50">
                    ADMIN
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/50">
                    USER
                  </span>
                )}
              </div>

              <button
                onClick={logout}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition duration-150 border border-slate-700"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
