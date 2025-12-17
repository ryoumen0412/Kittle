'use client';

import { RatingData } from './types';

const RATINGS_STORAGE_KEY = 'kittle_ratings';

export function getRatingsFromStorage(): RatingData {
    if (typeof window === 'undefined') return {};

    const stored = localStorage.getItem(RATINGS_STORAGE_KEY);
    if (!stored) return {};

    try {
        return JSON.parse(stored);
    } catch {
        return {};
    }
}

export function saveRatingsToStorage(data: RatingData): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(data));
}

export function addRating(publicationId: string, rating: number): void {
    const data = getRatingsFromStorage();

    if (!data[publicationId]) {
        data[publicationId] = [];
    }

    data[publicationId].push(rating);
    saveRatingsToStorage(data);
}

export function getAverageRating(publicationId: string): number {
    const data = getRatingsFromStorage();
    const ratings = data[publicationId];

    if (!ratings || ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return sum / ratings.length;
}

export function getTotalRatings(publicationId: string): number {
    const data = getRatingsFromStorage();
    const ratings = data[publicationId];

    return ratings?.length || 0;
}

export function hasUserRated(publicationId: string): boolean {
    // For now, check if there are any ratings for this publication
    // In a real app, you'd track per-user ratings
    if (typeof window === 'undefined') return false;

    const userRatedKey = `kittle_user_rated_${publicationId}`;
    return localStorage.getItem(userRatedKey) === 'true';
}

export function setUserRated(publicationId: string): void {
    if (typeof window === 'undefined') return;

    const userRatedKey = `kittle_user_rated_${publicationId}`;
    localStorage.setItem(userRatedKey, 'true');
}
