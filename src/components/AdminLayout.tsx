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
            <div className="min-h-screen flex items-center justify-center">
                <div className="insert-coin-loader">Cargando...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="card p-8 w-full max-w-md">
                    <h1 className="text-base font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-cyan)] mb-2 text-center neon-glow-cyan">
                        Admin
                    </h1>
                    <p className="text-xs font-[family-name:var(--font-pixel)] uppercase text-[var(--text-muted)] text-center mb-8">
                        Ingresa la contraseña
                    </p>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--navy-800)] border-2 border-[var(--navy-700)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--arcade-cyan)] transition-colors font-mono"
                                placeholder="••••••••"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <p className="text-xs font-[family-name:var(--font-pixel)] uppercase text-[var(--arcade-red)] mb-4 text-center">
                                {error}
                            </p>
                        )}

                        <button type="submit" className="btn-primary w-full">
                            ▶ Entrar
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="text-xs font-[family-name:var(--font-pixel)] uppercase text-[var(--text-muted)] hover:text-[var(--arcade-cyan)] transition-colors"
                        >
                            ◀ Volver
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <header className="glass-dark border-b-2 border-[var(--arcade-magenta)]">
                <div className="container">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <Link
                                href="/admin"
                                className="text-sm font-[family-name:var(--font-pixel)] uppercase gradient-text"
                            >
                                Kittle
                            </Link>
                            <nav className="hidden md:flex items-center gap-6">
                                <Link
                                    href="/admin"
                                    className="text-xs font-[family-name:var(--font-pixel)] uppercase text-[var(--text-secondary)] hover:text-[var(--arcade-cyan)] transition-colors"
                                >
                                    ▶ Publicaciones
                                </Link>
                                <Link
                                    href="/admin/nueva"
                                    className="text-xs font-[family-name:var(--font-pixel)] uppercase text-[var(--text-secondary)] hover:text-[var(--arcade-cyan)] transition-colors"
                                >
                                    + Nueva
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="text-xs font-[family-name:var(--font-pixel)] uppercase text-[var(--text-muted)] hover:text-[var(--arcade-green)] transition-colors"
                            >
                                Sitio ↗
                            </Link>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('kittle_admin_auth');
                                    setIsAuthenticated(false);
                                }}
                                className="text-xs font-[family-name:var(--font-pixel)] uppercase text-[var(--text-muted)] hover:text-[var(--arcade-red)] transition-colors"
                            >
                                Salir ✕
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
                {children}
            </main>
        </div>
    );
}
