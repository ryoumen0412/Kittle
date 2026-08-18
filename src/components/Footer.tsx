'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useReaderPreferences } from './ReaderPreferencesProvider';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024);
  const { isZenMode } = useReaderPreferences();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  if (isZenMode) {
    return null;
  }

  return (
    <footer className="mt-auto border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-14 md:py-18 text-xs transition-colors">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Manifesto / Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl text-[var(--text-primary)]">Kittle</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-burdeo)]" />
            </div>
            <p className="text-base text-[var(--text-secondary)] font-serif italic max-w-md leading-relaxed">
              «Escribir para fijar lo efímero. Leer para detener el ruido del mundo.»
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-md">
              Un rincón digital artesanal para narrativas extensas, relatos breves y apuntes de paso. Sin algoritmos ni notificaciones.
            </p>
          </div>

          {/* Catalog Links */}
          <div>
            <h4 className="font-sans font-semibold text-[var(--text-primary)] uppercase tracking-wider text-xs mb-3.5">
              Catálogo
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)] font-sans">
              <li>
                <Link href="/historias" className="hover:text-[var(--accent-burdeo)] transition-colors">
                  Historias
                </Link>
              </li>
              <li>
                <Link href="/cuentos" className="hover:text-[var(--accent-cactus)] transition-colors">
                  Cuentos
                </Link>
              </li>
              <li>
                <Link href="/novelas" className="hover:text-[var(--accent-navy)] transition-colors">
                  Novelas
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[var(--accent-ochre)] transition-colors">
                  Diario & Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Info & Access */}
          <div>
            <h4 className="font-sans font-semibold text-[var(--text-primary)] uppercase tracking-wider text-xs mb-3.5">
              Bitácora
            </h4>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)] font-sans">
              <li>
                <Link href="/acerca" className="hover:text-[var(--text-primary)] transition-colors">
                  Acerca del autor
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[var(--accent-burdeo)] transition-colors text-[var(--text-muted)] text-xs">
                  Acceso de autor →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[var(--text-muted)] text-xs font-sans">
          <p>© {currentYear} Kittle. Lectura y escritura independiente.</p>
          <p>Tipografía optimizada para lectura</p>
        </div>
      </div>
    </footer>
  );
}
