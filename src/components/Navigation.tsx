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
                        className="text-lg md:text-xl font-[family-name:var(--font-pixel)] glitch-text gradient-text tracking-wide"
                    >
                        KITTLE
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <li key={item.href} className="relative">
                                <Link
                                    href={item.href}
                                    className={`text-xs font-[family-name:var(--font-pixel)] uppercase tracking-wider transition-all duration-200 px-2 py-1 ${pathname === item.href
                                            ? 'text-[var(--arcade-magenta)] neon-glow-pink'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--arcade-cyan)] hover:neon-glow-cyan'
                                        }`}
                                >
                                    {pathname === item.href && (
                                        <span className="absolute -left-3 text-[var(--arcade-yellow)]">▶</span>
                                    )}
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[var(--arcade-cyan)] border-2 border-[var(--arcade-cyan)] hover:bg-[var(--arcade-cyan)] hover:text-[var(--navy-900)] transition-all"
                        aria-label="Menú"
                        onClick={() => {
                            const menu = document.getElementById('mobile-menu');
                            if (menu) {
                                menu.classList.toggle('hidden');
                            }
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="square"
                            strokeLinejoin="miter"
                        >
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div id="mobile-menu" className="hidden md:hidden pb-4">
                    <ul className="flex flex-col gap-1 border-t-2 border-[var(--arcade-cyan)] pt-4">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`block py-3 px-4 text-xs font-[family-name:var(--font-pixel)] uppercase tracking-wider transition-all duration-200 border-l-4 ${pathname === item.href
                                            ? 'text-[var(--arcade-magenta)] border-[var(--arcade-magenta)] bg-[rgba(255,0,255,0.1)]'
                                            : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--arcade-cyan)] hover:border-[var(--arcade-cyan)] hover:bg-[rgba(0,255,255,0.05)]'
                                        }`}
                                    onClick={() => {
                                        const menu = document.getElementById('mobile-menu');
                                        if (menu) {
                                            menu.classList.add('hidden');
                                        }
                                    }}
                                >
                                    {pathname === item.href && (
                                        <span className="mr-2 text-[var(--arcade-yellow)]">▶</span>
                                    )}
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
