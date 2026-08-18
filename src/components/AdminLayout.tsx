'use client';

import { useState, useEffect, ReactNode } from 'react';
import { getAdminPassword } from '@/lib/firebase-publications';
import Link from 'next/link';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('kittle_admin_auth');
    setIsAuthenticated(auth === 'true');
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = getAdminPassword();

    if (password === adminPassword) {
      localStorage.setItem('kittle_admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--border-strong)] border-t-[var(--accent-burdeo)] animate-spin" />
        <span className="text-xs text-[var(--text-muted)] font-mono">Verificando sesión...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-base)]">
        <div className="indie-card p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <span className="text-2xl font-serif font-bold text-[var(--text-primary)] block mb-1">
              Kittle Studio
            </span>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Acceso a la mesa de redacción
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
              >
                Clave de administración
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-burdeo)] text-sm transition-colors"
                placeholder="••••••••"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-xs text-[var(--accent-burdeo)] font-medium">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary w-full py-2.5">
              Entrar al panel
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-mono"
            >
              ← Volver a la portada
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col">
      <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/90 backdrop-blur-md">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6 md:gap-8">
              <Link
                href="/admin"
                className="font-serif font-bold text-lg text-[var(--text-primary)] hover:text-[var(--accent-burdeo)] transition-colors"
              >
                Kittle Studio
              </Link>
              <nav className="flex items-center gap-4 text-xs font-medium">
                <Link
                  href="/admin"
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Manuscritos
                </Link>
                <Link
                  href="/admin/nueva"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-burdeo)] transition-colors"
                >
                  + Nueva obra
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <Link
                href="/"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                target="_blank"
              >
                Ver portal ↗
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('kittle_admin_auth');
                  setIsAuthenticated(false);
                }}
                className="text-[var(--text-muted)] hover:text-[var(--accent-burdeo)] transition-colors font-mono"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container flex-grow py-8 md:py-12">
        {children}
      </main>
    </div>
  );
}
