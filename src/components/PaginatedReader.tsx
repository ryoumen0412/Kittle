'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useReaderPreferences } from './ReaderPreferencesProvider';

interface PaginatedReaderProps {
  content: string;
  title: string;
}

export default function PaginatedReader({ content, title }: PaginatedReaderProps) {
  const { fontSize, fontFamily, lineHeight, textAlign, contentWidth } = useReaderPreferences();
  const [currentPage, setCurrentPage] = useState(0);

  // Parse and chunk content into sensible readable pages
  const pages = useMemo(() => {
    if (!content) return [''];

    // If HTML content from TipTap
    if (content.includes('<')) {
      // Split by block tags like </p>, </blockquote>, </h2>, </h1>, </h3>, <hr>
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      
      const blockElements = Array.from(tempDiv.children);
      if (blockElements.length === 0) {
        return [content];
      }

      const chunks: string[] = [];
      let currentChunkHtml = '';
      let currentWordCount = 0;
      const targetWordsPerPage = 220; // optimal reading chunk per page

      blockElements.forEach((el) => {
        const text = el.textContent || '';
        const words = text.trim().split(/\s+/).filter(Boolean).length;

        if (currentWordCount > 0 && currentWordCount + words > targetWordsPerPage) {
          chunks.push(currentChunkHtml);
          currentChunkHtml = el.outerHTML;
          currentWordCount = words;
        } else {
          currentChunkHtml += el.outerHTML;
          currentWordCount += words;
        }
      });

      if (currentChunkHtml) {
        chunks.push(currentChunkHtml);
      }

      return chunks.length > 0 ? chunks : [content];
    } else {
      // Plain text content
      const paragraphs = content.split('\n\n').filter((p) => p.trim().length > 0);
      const chunks: string[] = [];
      let currentChunk = '';
      let currentWordCount = 0;
      const targetWordsPerPage = 200;

      paragraphs.forEach((p) => {
        const words = p.trim().split(/\s+/).length;
        if (currentWordCount > 0 && currentWordCount + words > targetWordsPerPage) {
          chunks.push(currentChunk);
          currentChunk = `<p>${p.trim()}</p>`;
          currentWordCount = words;
        } else {
          currentChunk += `<p>${p.trim()}</p>`;
          currentWordCount += words;
        }
      });

      if (currentChunk) {
        chunks.push(currentChunk);
      }

      return chunks.length > 0 ? chunks : [content];
    }
  }, [content]);

  const totalPages = pages.length;

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        if (e.key === ' ' && (e.target as HTMLElement)?.tagName === 'BUTTON') return;
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  // Content width map
  const widthClasses = {
    narrow: 'max-w-[62ch]',
    medium: 'max-w-[74ch]',
    wide: 'max-w-[88ch]',
  }[contentWidth];

  const fontClass = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono',
  }[fontFamily];

  const lineHeightValue = {
    normal: 1.6,
    relaxed: 1.85,
    loose: 2.1,
  }[lineHeight];

  const progressPercent = totalPages > 1 ? Math.round(((currentPage + 1) / totalPages) * 100) : 100;

  return (
    <div className="paginated-reader-wrapper flex flex-col min-h-[500px] justify-between">
      {/* Book header indicator */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-6 text-xs text-[var(--text-muted)] font-mono">
        <span className="truncate max-w-[240px] md:max-w-md">{title}</span>
        <span>
          Página {currentPage + 1} de {totalPages} ({progressPercent}%)
        </span>
      </div>

      {/* Page Content */}
      <div
        className={`mx-auto w-full ${widthClasses} py-4 flex-grow`}
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: lineHeightValue,
          textAlign: textAlign === 'justify' ? 'justify' : 'left',
        }}
      >
        <div
          key={currentPage}
          className={`reader-prose ${fontClass} animate-fade-in`}
          dangerouslySetInnerHTML={{ __html: pages[currentPage] || '' }}
        />
      </div>

      {/* Navigation Footer */}
      <div className="mt-10 pt-6 border-t border-[var(--border-subtle)]">
        {/* Progress bar */}
        <div className="w-full bg-[var(--bg-elevated)] h-1 rounded-full overflow-hidden mb-6">
          <div
            className="bg-[var(--accent-burdeo)] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className={`btn-secondary text-sm ${
              currentPage === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:border-[var(--accent-burdeo)]'
            }`}
            title="Página anterior (Flecha izquierda)"
          >
            ← Página anterior
          </button>

          <div className="text-xs text-[var(--text-muted)] hidden sm:block">
            Usa las teclas <kbd className="px-1.5 py-0.5 border border-[var(--border-strong)] rounded text-[11px]">←</kbd> y{' '}
            <kbd className="px-1.5 py-0.5 border border-[var(--border-strong)] rounded text-[11px]">→</kbd> para navegar
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className={`btn-primary text-sm ${
              currentPage === totalPages - 1 ? 'opacity-40 cursor-not-allowed' : ''
            }`}
            title="Página siguiente (Flecha derecha o Espacio)"
          >
            Página siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
