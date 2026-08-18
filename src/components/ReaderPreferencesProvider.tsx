'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type SiteTheme = 'light' | 'dark' | 'sepia' | 'cactus';
export type ReaderFontFamily = 'serif' | 'sans' | 'mono';
export type ReaderLineHeight = 'normal' | 'relaxed' | 'loose';
export type ReaderContentWidth = 'narrow' | 'medium' | 'wide';
export type ReaderTextAlign = 'left' | 'justify';
export type ReadingMode = 'scroll' | 'paginated';

interface ReaderPreferences {
  theme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
  fontSize: number; // 16 to 24
  setFontSize: (size: number | ((prev: number) => number)) => void;
  fontFamily: ReaderFontFamily;
  setFontFamily: (font: ReaderFontFamily) => void;
  lineHeight: ReaderLineHeight;
  setLineHeight: (height: ReaderLineHeight) => void;
  contentWidth: ReaderContentWidth;
  setContentWidth: (width: ReaderContentWidth) => void;
  textAlign: ReaderTextAlign;
  setTextAlign: (align: ReaderTextAlign) => void;
  readingMode: ReadingMode;
  setReadingMode: (mode: ReadingMode) => void;
  isZenMode: boolean;
  setIsZenMode: (zen: boolean | ((prev: boolean) => boolean)) => void;
  resetPreferences: () => void;
}

const defaultPreferences = {
  theme: 'light' as SiteTheme,
  fontSize: 18,
  fontFamily: 'serif' as ReaderFontFamily,
  lineHeight: 'relaxed' as ReaderLineHeight,
  contentWidth: 'medium' as ReaderContentWidth,
  textAlign: 'left' as ReaderTextAlign,
  readingMode: 'scroll' as ReadingMode,
  isZenMode: false,
};

const ReaderContext = createContext<ReaderPreferences>({
  ...defaultPreferences,
  setTheme: () => {},
  setFontSize: () => {},
  setFontFamily: () => {},
  setLineHeight: () => {},
  setContentWidth: () => {},
  setTextAlign: () => {},
  setReadingMode: () => {},
  setIsZenMode: () => {},
  resetPreferences: () => {},
});

export function ReaderPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<SiteTheme>('light');
  const [fontSize, setFontSizeState] = useState<number>(18);
  const [fontFamily, setFontFamilyState] = useState<ReaderFontFamily>('serif');
  const [lineHeight, setLineHeightState] = useState<ReaderLineHeight>('relaxed');
  const [contentWidth, setContentWidthState] = useState<ReaderContentWidth>('medium');
  const [textAlign, setTextAlignState] = useState<ReaderTextAlign>('left');
  const [readingMode, setReadingModeState] = useState<ReadingMode>('scroll');
  const [isZenMode, setIsZenMode] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load initial settings from localStorage on client
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('kittle_theme') as SiteTheme | null;
      if (savedTheme && ['light', 'dark', 'sepia', 'cactus'].includes(savedTheme)) {
        setThemeState(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = prefersDark ? 'dark' : 'light';
        setThemeState(initial);
        document.documentElement.setAttribute('data-theme', initial);
      }

      const savedFontSize = localStorage.getItem('kittle_font_size');
      if (savedFontSize) setFontSizeState(Number(savedFontSize));

      const savedFontFamily = localStorage.getItem('kittle_font_family') as ReaderFontFamily | null;
      if (savedFontFamily) setFontFamilyState(savedFontFamily);

      const savedLineHeight = localStorage.getItem('kittle_line_height') as ReaderLineHeight | null;
      if (savedLineHeight) setLineHeightState(savedLineHeight);

      const savedWidth = localStorage.getItem('kittle_content_width') as ReaderContentWidth | null;
      if (savedWidth) setContentWidthState(savedWidth);

      const savedAlign = localStorage.getItem('kittle_text_align') as ReaderTextAlign | null;
      if (savedAlign) setTextAlignState(savedAlign);

      const savedMode = localStorage.getItem('kittle_reading_mode') as ReadingMode | null;
      if (savedMode) setReadingModeState(savedMode);
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }
    setIsHydrated(true);
  }, []);

  const setTheme = (newTheme: SiteTheme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    try {
      localStorage.setItem('kittle_theme', newTheme);
    } catch (e) {}
  };

  const setFontSize = (sizeOrUpdater: number | ((prev: number) => number)) => {
    setFontSizeState((prev) => {
      const val = typeof sizeOrUpdater === 'function' ? sizeOrUpdater(prev) : sizeOrUpdater;
      const clamped = Math.min(Math.max(val, 15), 26);
      try {
        localStorage.setItem('kittle_font_size', String(clamped));
      } catch (e) {}
      return clamped;
    });
  };

  const setFontFamily = (font: ReaderFontFamily) => {
    setFontFamilyState(font);
    try {
      localStorage.setItem('kittle_font_family', font);
    } catch (e) {}
  };

  const setLineHeight = (height: ReaderLineHeight) => {
    setLineHeightState(height);
    try {
      localStorage.setItem('kittle_line_height', height);
    } catch (e) {}
  };

  const setContentWidth = (width: ReaderContentWidth) => {
    setContentWidthState(width);
    try {
      localStorage.setItem('kittle_content_width', width);
    } catch (e) {}
  };

  const setTextAlign = (align: ReaderTextAlign) => {
    setTextAlignState(align);
    try {
      localStorage.setItem('kittle_text_align', align);
    } catch (e) {}
  };

  const setReadingMode = (mode: ReadingMode) => {
    setReadingModeState(mode);
    try {
      localStorage.setItem('kittle_reading_mode', mode);
    } catch (e) {}
  };

  const resetPreferences = () => {
    setFontSizeState(defaultPreferences.fontSize);
    setFontFamilyState(defaultPreferences.fontFamily);
    setLineHeightState(defaultPreferences.lineHeight);
    setContentWidthState(defaultPreferences.contentWidth);
    setTextAlignState(defaultPreferences.textAlign);
    setReadingModeState(defaultPreferences.readingMode);
  };

  return (
    <ReaderContext.Provider
      value={{
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
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
}

export function useReaderPreferences() {
  return useContext(ReaderContext);
}
