'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useReaderPreferences, SiteTheme } from './ReaderPreferencesProvider';

const navItems = [
  { href: '/', label: 'Portada' },
  { href: '/historias', label: 'Historias' },
  { href: '/cuentos', label: 'Cuentos' },
  { href: '/novelas', label: 'Novelas' },
  { href: '/blog', label: 'Blog' },
  { href: '/acerca', label: 'Acerca' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme, isZenMode } = useReaderPreferences();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isZenMode) {
    return null;
  }

  const themeLabels: Record<SiteTheme, { icon: string; name: string }> = {
    light: { icon: '☀️', name: 'Claro' },
    dark: { icon: '🌙', name: 'Oscuro' },
    sepia: { icon: '🍷', name: 'Burdeo' },
    cactus: { icon: '🌵', name: 'Cactus' },
  };

  const nextTheme: Record<SiteTheme, SiteTheme> = {
    light: 'dark',
    dark: 'sepia',
    sepia: 'cactus',
    cactus: 'light',
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/90 backdrop-blur-md transition-colors">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group text-decoration-none"
          >
            <span className="font-serif font-bold text-2xl tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-burdeo)] transition-colors">
              Kittle
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-burdeo)] inline-block mt-0.5" />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm tracking-normal transition-all py-1 px-1 relative ${
                      isActive
                        ? 'text-[var(--text-primary)] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--accent-burdeo)] after:rounded-full'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-normal'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Actions: Theme Selector & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(nextTheme[theme])}
              className="px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              title={`Ambiente actual: ${themeLabels[theme].name}. Clic para alternar.`}
              aria-label="Cambiar tema visual"
            >
              <span className="text-sm leading-none">{themeLabels[theme].icon}</span>
              <span className="font-medium">{themeLabels[theme].name}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
              aria-label="Menú de navegación"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border-subtle)] animate-fade-in">
            <ul className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block py-2.5 px-3.5 rounded-lg text-sm transition-all ${
                        isActive
                          ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold border-l-2 border-[var(--accent-burdeo)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
