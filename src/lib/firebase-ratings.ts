import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore';
import { db } from './firebase';

const RATINGS_COLLECTION = 'ratings';

// Check if Firebase is configured
function isFirebaseConfigured(): boolean {
    return Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
}

// LocalStorage fallback keys
const RATINGS_STORAGE_KEY = 'kittle_ratings';

// Get ratings from localStorage (fallback)
function getLocalRatings(): Record<string, number[]> {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(RATINGS_STORAGE_KEY);
    try {
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

function saveLocalRatings(data: Record<string, number[]>): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(data));
}

// Get average rating for a publication
export async function getAverageRating(publicationId: string): Promise<{ average: number; total: number }> {
    if (!isFirebaseConfigured()) {
        const ratings = getLocalRatings()[publicationId] || [];
        if (ratings.length === 0) return { average: 0, total: 0 };
        const sum = ratings.reduce((a, b) => a + b, 0);
        return { average: sum / ratings.length, total: ratings.length };
    }

    try {
        const docRef = doc(db, RATINGS_COLLECTION, publicationId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return { average: 0, total: 0 };
        }

        const data = docSnap.data();
        const ratings = data.ratings || [];

        if (ratings.length === 0) return { average: 0, total: 0 };

        const sum = ratings.reduce((a: number, b: number) => a + b, 0);
        return { average: sum / ratings.length, total: ratings.length };
    } catch (error) {
        console.error('Error getting ratings:', error);
        return { average: 0, total: 0 };
    }
}

// Add rating to publication
export async function addRating(publicationId: string, rating: number): Promise<void> {
    if (!isFirebaseConfigured()) {
        const ratings = getLocalRatings();
        if (!ratings[publicationId]) {
            ratings[publicationId] = [];
        }
        ratings[publicationId].push(rating);
        saveLocalRatings(ratings);
        return;
    }

    try {
        const docRef = doc(db, RATINGS_COLLECTION, publicationId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                ratings: arrayUnion(rating),
            });
        } else {
            await setDoc(docRef, {
                ratings: [rating],
            });
        }
    } catch (error) {
        console.error('Error adding rating:', error);
        throw error;
    }
}

// Check if user has rated (uses localStorage for user tracking)
export function hasUserRated(publicationId: string): boolean {
    if (typeof window === 'undefined') return false;
    const key = `kittle_user_rated_${publicationId}`;
    return localStorage.getItem(key) === 'true';
}

// Mark user as having rated
export function markUserRated(publicationId: string): void {
    if (typeof window === 'undefined') return;
    const key = `kittle_user_rated_${publicationId}`;
    localStorage.setItem(key, 'true');
}
