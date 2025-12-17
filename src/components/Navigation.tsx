'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/historias', label: 'Historias' },
    { href: '/cuentos', label: 'Cuentos' },
    { href: '/novelas', label: 'Novelas' },
    { href: '/blog', label: 'Blog' },
    { href: '/acerca', label: 'Acerca de' },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="glass-dark sticky top-0 z-50">
            <div className="container">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl md:text-3xl font-serif font-bold gradient-text"
                    >
                        Kittle
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`text-sm font-medium transition-colors duration-200 ${pathname === item.href
                                            ? 'text-[var(--pink-neon)]'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[var(--text-secondary)]"
                        aria-label="Menu"
                        onClick={() => {
                            const menu = document.getElementById('mobile-menu');
                            if (menu) {
                                menu.classList.toggle('hidden');
                            }
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div id="mobile-menu" className="hidden md:hidden pb-4">
                    <ul className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`block py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${pathname === item.href
                                            ? 'text-[var(--pink-neon)] bg-[var(--navy-800)]'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--navy-800)]'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
