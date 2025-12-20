import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass-dark mt-auto border-t-2 border-[var(--arcade-cyan)]">
            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="text-lg font-[family-name:var(--font-pixel)] gradient-text tracking-wide"
                        >
                            KITTLE
                        </Link>
                        <p className="mt-4 text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
                            Un lugar donde guardo lo que escribo.
                            Nada más, nada menos.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs font-[family-name:var(--font-pixel)] text-[var(--arcade-cyan)] uppercase tracking-wider mb-4">
                            Contenido
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/historias"
                                    className="text-sm text-[var(--text-muted)] hover:text-[var(--arcade-magenta)] hover:pl-2 transition-all duration-200"
                                >
                                    → Historias
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cuentos"
                                    className="text-sm text-[var(--text-muted)] hover:text-[var(--arcade-magenta)] hover:pl-2 transition-all duration-200"
                                >
                                    → Cuentos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/novelas"
                                    className="text-sm text-[var(--text-muted)] hover:text-[var(--arcade-magenta)] hover:pl-2 transition-all duration-200"
                                >
                                    → Novelas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-[var(--text-muted)] hover:text-[var(--arcade-magenta)] hover:pl-2 transition-all duration-200"
                                >
                                    → Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h4 className="text-xs font-[family-name:var(--font-pixel)] text-[var(--arcade-cyan)] uppercase tracking-wider mb-4">
                            Info
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/acerca"
                                    className="text-sm text-[var(--text-muted)] hover:text-[var(--arcade-magenta)] hover:pl-2 transition-all duration-200"
                                >
                                    → Sobre mí
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 pt-8 border-t border-[var(--navy-700)]">
                    <p className="text-center text-xs font-[family-name:var(--font-pixel)] text-[var(--text-muted)] tracking-wide">
                        © {currentYear} <span className="text-[var(--arcade-yellow)]">KITTLE</span> <span className="text-[var(--arcade-cyan)]">•</span> PRESS START
                    </p>
                </div>
            </div>
        </footer>
    );
}
