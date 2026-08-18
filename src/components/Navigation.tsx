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

  // If in Zen mode, hide navbar completely for immersion
  if (isZenMode) {
    return null;
  }

  const themeIcons: Record<SiteTheme, string> = {
    light: '☀️',
    dark: '🌙',
    sepia: '🍷',
    cactus: '🌵',
  };

  const nextTheme: Record<SiteTheme, SiteTheme> = {
    light: 'dark',
    dark: 'sepia',
    sepia: 'cactus',
    cactus: 'light',
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/85 backdrop-blur-md transition-colors">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group text-decoration-none"
          >
            <span className="font-serif font-bold text-xl md:text-2xl tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-burdeo)] transition-colors">
              Kittle
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-burdeo)] inline-block mt-1" />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all ${
                      isActive
                        ? 'text-[var(--text-primary)] bg-[var(--bg-surface)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Actions: Theme Toggle & Admin/Mobile */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Cycle */}
            <button
              onClick={() => setTheme(nextTheme[theme])}
              className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-1.5"
              title={`Tema actual: ${theme}. Haz clic para cambiar.`}
              aria-label="Cambiar tema"
            >
              <span className="text-sm">{themeIcons[theme]}</span>
              <span className="capitalize text-[11px] font-mono hidden sm:inline">{theme}</span>
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
          <div className="md:hidden py-3 border-t border-[var(--border-subtle)] animate-fade-in">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block py-2 px-3 rounded-lg text-sm transition-all ${
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
