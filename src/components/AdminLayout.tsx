'use client';

import { useState, useEffect, ReactNode } from 'react';
import { isAdminAuthenticated, authenticateAdmin } from '@/lib/publications';
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
        setIsAuthenticated(isAdminAuthenticated());
        setIsLoading(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (authenticateAdmin(password)) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Contrasena incorrecta');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-[var(--text-muted)]">Cargando...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="card p-8 w-full max-w-md">
                    <h1 className="text-2xl font-serif font-bold text-[var(--text-primary)] mb-2 text-center">
                        Panel de Administracion
                    </h1>
                    <p className="text-sm text-[var(--text-muted)] text-center mb-8">
                        Ingresa tu contrasena para continuar
                    </p>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                            >
                                Contrasena
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--navy-800)] border border-[var(--navy-700)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-neon)] transition-colors"
                                placeholder="Ingresa la contrasena"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-[var(--pink-neon)] mb-4">{error}</p>
                        )}

                        <button type="submit" className="btn-primary w-full">
                            Ingresar
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="text-sm text-[var(--text-muted)] hover:text-[var(--pink-neon)] transition-colors"
                        >
                            Volver al sitio
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Admin Header */}
            <header className="glass-dark border-b border-[var(--navy-700)]">
                <div className="container">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <Link
                                href="/admin"
                                className="text-xl font-serif font-bold gradient-text"
                            >
                                Kittle Admin
                            </Link>
                            <nav className="hidden md:flex items-center gap-6">
                                <Link
                                    href="/admin"
                                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    Publicaciones
                                </Link>
                                <Link
                                    href="/admin/nueva"
                                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    Nueva Publicacion
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                Ver sitio
                            </Link>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('kittle_admin_auth');
                                    setIsAuthenticated(false);
                                }}
                                className="text-sm text-[var(--text-muted)] hover:text-[var(--pink-neon)] transition-colors"
                            >
                                Cerrar sesion
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Admin Content */}
            <main className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
                {children}
            </main>
        </div>
    );
}
