import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass-dark mt-auto">
            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="text-2xl font-serif font-bold gradient-text"
                        >
                            Kittle
                        </Link>
                        <p className="mt-4 text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
                            Un lugar donde guardo lo que escribo.
                            Nada mas, nada menos.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                            Contenido
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/historias"
                                    className="text-sm text-[var(--text-muted)] hover:text-[var(--pink-neon)] transition-colors"
                                >
                                    Historias
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cuentos"
                                    className="text-sm text-[var(--text-muted)] hover:text-[var(--pink-neon)] transition-colors"
                                >
                                    Cuentos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/novelas"
                                    className="text-sm text-[var(--text-muted)] hover:text-[var(--pink-neon)] transition-colors"
                                >
                                    Novelas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-[var(--text-muted)] hover:text-[var(--pink-neon)] transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                            Info
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/acerca"
                                    className="text-sm text-[var(--text-muted)] hover:text-[var(--pink-neon)] transition-colors"
                                >
                                    Sobre mi
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 pt-8 border-t border-[var(--navy-700)]">
                    <p className="text-center text-sm text-[var(--text-muted)]">
                        {currentYear} Kittle
                    </p>
                </div>
            </div>
        </footer>
    );
}
