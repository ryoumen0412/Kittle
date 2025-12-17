'use client';

import { useState, useEffect } from 'react';
import { addRating, getAverageRating, hasUserRated, markUserRated } from '@/lib/firebase-ratings';

interface StarRatingProps {
    publicationId: string;
    readonly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    showCount?: boolean;
}

const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
};

export default function StarRating({
    publicationId,
    readonly = false,
    size = 'md',
    showCount = true
}: StarRatingProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);
    const [hasRated, setHasRated] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setHasRated(hasUserRated(publicationId));

        // Load ratings
        getAverageRating(publicationId).then(({ average, total }) => {
            setAverageRating(average);
            setTotalRatings(total);
        });
    }, [publicationId]);

    const handleClick = async (value: number) => {
        if (readonly || hasRated || isSubmitting) return;

        setIsSubmitting(true);
        setRating(value);

        try {
            await addRating(publicationId, value);
            markUserRated(publicationId);
            setHasRated(true);

            // Refresh ratings
            const { average, total } = await getAverageRating(publicationId);
            setAverageRating(average);
            setTotalRatings(total);
        } catch (error) {
            console.error('Error submitting rating:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const displayRating = readonly ? averageRating : (hoverRating || rating || averageRating);

    if (!isClient) {
        return (
            <div className="flex items-center gap-2">
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            className={`${sizeClasses[size]} star star-empty`}
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        disabled={readonly || hasRated || isSubmitting}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => !readonly && !hasRated && setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`${readonly || hasRated ? 'cursor-default' : 'cursor-pointer'} focus:outline-none`}
                        aria-label={`Puntuar ${star} estrellas`}
                    >
                        <svg
                            className={`${sizeClasses[size]} star ${star <= Math.round(displayRating) ? 'star-filled' : 'star-empty'
                                }`}
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    </button>
                ))}
            </div>

            {showCount && (
                <span className="text-sm text-[var(--text-muted)]">
                    {averageRating > 0 ? (
                        <>
                            <span className="text-[var(--orange-neon)] font-medium">
                                {averageRating.toFixed(1)}
                            </span>
                            {' '}
                            ({totalRatings} {totalRatings === 1 ? 'voto' : 'votos'})
                        </>
                    ) : (
                        'Sin votos'
                    )}
                </span>
            )}

            {hasRated && !readonly && (
                <span className="text-xs text-[var(--text-muted)]">
                    Gracias
                </span>
            )}
        </div>
    );
}
