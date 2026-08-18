'use client';

import React, { useState, useEffect } from 'react';
import {
  useReaderPreferences,
  SiteTheme,
  ReaderFontFamily,
  ReaderLineHeight,
  ReaderContentWidth,
  ReaderTextAlign,
  ReadingMode,
} from './ReaderPreferencesProvider';

interface ReaderToolbarProps {
  readingTimeMinutes?: number;
}

export default function ReaderToolbar({ readingTimeMinutes = 5 }: ReaderToolbarProps) {
  const {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    lineHeight,
    setLineHeight,
    contentWidth,
    setContentWidth,
    textAlign,
    setTextAlign,
    readingMode,
    setReadingMode,
    isZenMode,
    setIsZenMode,
    resetPreferences,
  } = useReaderPreferences();

  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress
  useEffect(() => {
    if (readingMode !== 'scroll') return;

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setScrollProgress(Math.min(Math.max(Math.round(scrolled), 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [readingMode]);

  const themes: { id: SiteTheme; name: string; bg: string; border: string }[] = [
    { id: 'light', name: 'Claro', bg: '#FAF8F5', border: '#E2DBD0' },
    { id: 'dark', name: 'Oscuro', bg: '#111215', border: '#383D4C' },
    { id: 'sepia', name: 'Burdeo', bg: '#251D21', border: '#54414B' },
    { id: 'cactus', name: 'Cactus', bg: '#15211B', border: '#365345' },
  ];

  return (
    <>
      {/* Scroll Progress Bar (Top of screen) when in scroll mode */}
      {readingMode === 'scroll' && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
          <div
            className="h-full bg-[var(--accent-burdeo)] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Floating Reader Control Bar */}
      <div className="sticky top-20 z-40 mb-6 py-2 flex items-center justify-between border-y border-[var(--border-subtle)] bg-[var(--bg-base)]/90 backdrop-blur-md transition-all">
        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
          {/* Reading Mode Switcher */}
          <div className="inline-flex rounded-lg border border-[var(--border-subtle)] p-0.5 bg-[var(--bg-surface)]">
            <button
              onClick={() => setReadingMode('scroll')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                readingMode === 'scroll'
                  ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title="Lectura continua con scroll"
            >
              📜 Scroll
            </button>
            <button
              onClick={() => setReadingMode('paginated')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                readingMode === 'paginated'
                  ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title="Lectura paginada estilo libro"
            >
              📖 Páginas
            </button>
          </div>

          {/* Reading Time Remaining info */}
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[var(--text-muted)]">
            <span>•</span>
            <span>~{readingTimeMinutes} min lectura</span>
            {readingMode === 'scroll' && scrollProgress > 0 && (
              <span className="font-mono text-[11px]">({scrollProgress}%)</span>
            )}
          </span>
        </div>

        {/* Right side: Settings button + Zen toggle */}
        <div className="flex items-center gap-2">
          {/* Quick Font Size */}
          <div className="hidden md:flex items-center gap-1 border border-[var(--border-subtle)] rounded-lg p-0.5 bg-[var(--bg-surface)]">
            <button
              onClick={() => setFontSize((s) => s - 1)}
              disabled={fontSize <= 15}
              className="px-2 py-0.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30"
              title="Reducir tamaño de letra"
            >
              A-
            </button>
            <span className="text-[11px] font-mono px-1 text-[var(--text-muted)]">{fontSize}px</span>
            <button
              onClick={() => setFontSize((s) => s + 1)}
              disabled={fontSize >= 26}
              className="px-2 py-0.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30"
              title="Aumentar tamaño de letra"
            >
              A+
            </button>
          </div>

          {/* Zen Mode Toggle */}
          <button
            onClick={() => setIsZenMode(!isZenMode)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
              isZenMode
                ? 'bg-[var(--accent-burdeo)] text-white border-[var(--accent-burdeo)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
            }`}
            title="Modo Enfoque sin distracciones"
          >
            <span>{isZenMode ? '✕ Salir Zen' : '👁️ Enfoque'}</span>
          </button>

          {/* Settings Drawer Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
              isOpen
                ? 'bg-[var(--bg-elevated)] border-[var(--border-strong)] text-[var(--text-primary)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
            }`}
            aria-expanded={isOpen}
            aria-label="Ajustes de lectura y tipografía"
          >
            <span>Aa</span>
            <span className="hidden sm:inline">Ajustes</span>
            <svg
              className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Collapsible Settings Panel */}
      {isOpen && (
        <div className="mb-8 p-5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-card animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            {/* Theme Selector */}
            <div>
              <label className="block font-medium text-[var(--text-secondary)] mb-2.5 uppercase tracking-wider text-[10px]">
                Ambiente / Tema
              </label>
              <div className="grid grid-cols-4 gap-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border text-[11px] font-medium transition-all ${
                      theme === t.id
                        ? 'border-[var(--accent-burdeo)] shadow-sm'
                        : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border shadow-inner"
                      style={{ backgroundColor: t.bg, borderColor: t.border }}
                    />
                    <span className={theme === t.id ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-muted)]'}>
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Family */}
            <div>
              <label className="block font-medium text-[var(--text-secondary)] mb-2.5 uppercase tracking-wider text-[10px]">
                Tipografía de Lectura
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setFontFamily('serif')}
                  className={`p-2 rounded-lg border text-center font-serif text-sm transition-all ${
                    fontFamily === 'serif'
                      ? 'bg-[var(--bg-elevated)] border-[var(--accent-burdeo)] text-[var(--text-primary)] font-bold'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  Editorial
                  <span className="block text-[10px] font-sans font-normal text-[var(--text-muted)]">Serif</span>
                </button>
                <button
                  onClick={() => setFontFamily('sans')}
                  className={`p-2 rounded-lg border text-center font-sans text-sm transition-all ${
                    fontFamily === 'sans'
                      ? 'bg-[var(--bg-elevated)] border-[var(--accent-burdeo)] text-[var(--text-primary)] font-bold'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  Moderna
                  <span className="block text-[10px] font-sans font-normal text-[var(--text-muted)]">Sans</span>
                </button>
                <button
                  onClick={() => setFontFamily('mono')}
                  className={`p-2 rounded-lg border text-center font-mono text-sm transition-all ${
                    fontFamily === 'mono'
                      ? 'bg-[var(--bg-elevated)] border-[var(--accent-burdeo)] text-[var(--text-primary)] font-bold'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  Máquina
                  <span className="block text-[10px] font-sans font-normal text-[var(--text-muted)]">Mono</span>
                </button>
              </div>
            </div>

            {/* Text Alignment & Width */}
            <div>
              <label className="block font-medium text-[var(--text-secondary)] mb-2.5 uppercase tracking-wider text-[10px]">
                Distribución en Pantalla
              </label>
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setTextAlign('left')}
                    className={`py-1.5 px-3 rounded-lg border text-xs text-center transition-all ${
                      textAlign === 'left'
                        ? 'bg-[var(--bg-elevated)] border-[var(--accent-burdeo)] text-[var(--text-primary)] font-semibold'
                        : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    ⇤ Izquierda
                  </button>
                  <button
                    onClick={() => setTextAlign('justify')}
                    className={`py-1.5 px-3 rounded-lg border text-xs text-center transition-all ${
                      textAlign === 'justify'
                        ? 'bg-[var(--bg-elevated)] border-[var(--accent-burdeo)] text-[var(--text-primary)] font-semibold'
                        : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    ⇥ Justificado
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  {(['narrow', 'medium', 'wide'] as ReaderContentWidth[]).map((w) => (
                    <button
                      key={w}
                      onClick={() => setContentWidth(w)}
                      className={`py-1 px-2 rounded-md border text-[11px] text-center capitalize transition-all ${
                        contentWidth === w
                          ? 'bg-[var(--bg-elevated)] border-[var(--accent-burdeo)] text-[var(--text-primary)] font-semibold'
                          : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {w === 'narrow' ? 'Estrecho' : w === 'medium' ? 'Óptimo' : 'Amplio'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Line Spacing */}
            <div>
              <label className="block font-medium text-[var(--text-secondary)] mb-2.5 uppercase tracking-wider text-[10px]">
                Interlineado
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['normal', 'relaxed', 'loose'] as ReaderLineHeight[]).map((h) => (
                  <button
                    key={h}
                    onClick={() => setLineHeight(h)}
                    className={`py-1.5 px-2 rounded-lg border text-xs text-center capitalize transition-all ${
                      lineHeight === h
                        ? 'bg-[var(--bg-elevated)] border-[var(--accent-burdeo)] text-[var(--text-primary)] font-semibold'
                        : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    {h === 'normal' ? 'Normal' : h === 'relaxed' ? 'Cómodo' : 'Espacioso'}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size controls */}
            <div>
              <label className="block font-medium text-[var(--text-secondary)] mb-2.5 uppercase tracking-wider text-[10px]">
                Tamaño del Texto ({fontSize}px)
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFontSize((s) => s - 1)}
                  disabled={fontSize <= 15}
                  className="flex-1 py-1.5 border border-[var(--border-subtle)] rounded-lg text-sm font-semibold hover:bg-[var(--bg-elevated)] disabled:opacity-30"
                >
                  A-
                </button>
                <input
                  type="range"
                  min="15"
                  max="26"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="flex-1 accent-[var(--accent-burdeo)] cursor-pointer"
                />
                <button
                  onClick={() => setFontSize((s) => s + 1)}
                  disabled={fontSize >= 26}
                  className="flex-1 py-1.5 border border-[var(--border-subtle)] rounded-lg text-sm font-semibold hover:bg-[var(--bg-elevated)] disabled:opacity-30"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
                onClick={resetPreferences}
                className="w-full py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] underline transition-colors"
              >
                Restablecer ajustes por defecto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
