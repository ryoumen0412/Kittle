'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';

// Grilla más densa para pixeles más pequeños
const GRID_COLS = 24;
const GRID_ROWS = 16;
const TOTAL_BLOCKS = GRID_COLS * GRID_ROWS;
const BLOCK_DELAY = 8; // ms entre cada diagonal (más lento)
const MAX_DIAGONAL = GRID_COLS + GRID_ROWS - 2;
const ANIMATION_DURATION = (MAX_DIAGONAL * BLOCK_DELAY) + 400; // Más tiempo total

// Paleta de colores del sitio (synthwave)
const BLOCK_COLORS = [
    'var(--arcade-cyan)',      // #00d4ff
    'var(--arcade-magenta)',   // #ff2d95
    'var(--synthwave-purple)', // #9d4edd
    'var(--arcade-cyan)',
    'var(--neon-pink)',        // #ff2d95
    'var(--arcade-magenta)',
];

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showContent, setShowContent] = useState(true);
    const previousPathRef = useRef(pathname);
    const isFirstRender = useRef(true);

    const startTransition = useCallback(() => {
        setShowContent(false);
        setIsTransitioning(true);

        // Mostrar contenido cuando la ola llegue a ~60% del recorrido
        const showContentTimer = setTimeout(() => {
            setShowContent(true);
        }, ANIMATION_DURATION * 0.6);

        const cleanupTimer = setTimeout(() => {
            setIsTransitioning(false);
        }, ANIMATION_DURATION);

        return () => {
            clearTimeout(showContentTimer);
            clearTimeout(cleanupTimer);
        };
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (previousPathRef.current !== pathname) {
            previousPathRef.current = pathname;
            return startTransition();
        }
    }, [pathname, startTransition]);

    const renderBlocks = () => {
        const blocks = [];
        for (let i = 0; i < TOTAL_BLOCKS; i++) {
            const row = Math.floor(i / GRID_COLS);
            const col = i % GRID_COLS;

            // Delay basado en diagonal para barrido de arriba-izq a abajo-der
            const diagonalIndex = row + col;
            const delay = diagonalIndex * BLOCK_DELAY;

            // Color siguiendo la paleta synthwave
            const colorIndex = diagonalIndex % BLOCK_COLORS.length;

            blocks.push(
                <div
                    key={i}
                    className="pixel-block-disintegrate"
                    style={{
                        '--block-color': BLOCK_COLORS[colorIndex],
                        '--delay': `${delay}ms`,
                    } as React.CSSProperties}
                />
            );
        }
        return blocks;
    };

    return (
        <>
            <div
                style={{
                    opacity: showContent ? 1 : 0,
                    transition: 'opacity 150ms ease-out'
                }}
            >
                {children}
            </div>
            {isTransitioning && (
                <div className="pixel-transition-overlay" aria-hidden="true">
                    {renderBlocks()}
                </div>
            )}
        </>
    );
}
