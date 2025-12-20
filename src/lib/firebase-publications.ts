import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Publication, Category } from './types';
import { publications as mockPublications } from './data';

const PUBLICATIONS_COLLECTION = 'publications';

// Check if Firebase is configured
function isFirebaseConfigured(): boolean {
    return Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
}

// Get all publications
export async function getPublications(): Promise<Publication[]> {
    if (!isFirebaseConfigured()) {
        return mockPublications;
    }

    try {
        const querySnapshot = await getDocs(
            query(collection(db, PUBLICATIONS_COLLECTION), orderBy('publishedAt', 'desc'))
        );

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Publication[];
    } catch (error) {
        console.error('Error fetching publications:', error);
        return mockPublications;
    }
}

// Get publication by slug
export async function getPublicationBySlug(slug: string): Promise<Publication | null> {
    if (!isFirebaseConfigured()) {
        return mockPublications.find((p) => p.slug === slug) || null;
    }

    try {
        const querySnapshot = await getDocs(
            query(collection(db, PUBLICATIONS_COLLECTION), where('slug', '==', slug), limit(1))
        );

        if (querySnapshot.empty) return null;

        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Publication;
    } catch (error) {
        console.error('Error fetching publication:', error);
        return mockPublications.find((p) => p.slug === slug) || null;
    }
}

// Get publication by ID
export async function getPublicationById(id: string): Promise<Publication | null> {
    if (!isFirebaseConfigured()) {
        return mockPublications.find((p) => p.id === id) || null;
    }

    try {
        const docRef = doc(db, PUBLICATIONS_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return null;

        return { id: docSnap.id, ...docSnap.data() } as Publication;
    } catch (error) {
        console.error('Error fetching publication by ID:', error);
        return mockPublications.find((p) => p.id === id) || null;
    }
}

// Get publications by category
export async function getPublicationsByCategory(category: Category): Promise<Publication[]> {
    if (!isFirebaseConfigured()) {
        return mockPublications.filter((p) => p.category === category);
    }

    try {
        const querySnapshot = await getDocs(
            query(
                collection(db, PUBLICATIONS_COLLECTION),
                where('category', '==', category),
                orderBy('publishedAt', 'desc')
            )
        );

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Publication[];
    } catch (error) {
        console.error('Error fetching publications by category:', error);
        return mockPublications.filter((p) => p.category === category);
    }
}

// Get recent publications
export async function getRecentPublications(count: number = 6): Promise<Publication[]> {
    if (!isFirebaseConfigured()) {
        return [...mockPublications]
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .slice(0, count);
    }

    try {
        const querySnapshot = await getDocs(
            query(
                collection(db, PUBLICATIONS_COLLECTION),
                orderBy('publishedAt', 'desc'),
                limit(count)
            )
        );

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Publication[];
    } catch (error) {
        console.error('Error fetching recent publications:', error);
        return [...mockPublications]
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .slice(0, count);
    }
}

// Create publication (returns the new publication ID)
export async function createPublication(data: Omit<Publication, 'id'>): Promise<string> {
    if (!isFirebaseConfigured()) {
        // Fallback to mock behavior
        const id = Date.now().toString();
        const newPub = { ...data, id };
        mockPublications.unshift(newPub);
        return id;
    }

    try {
        const docRef = await addDoc(collection(db, PUBLICATIONS_COLLECTION), {
            ...data,
            createdAt: Timestamp.now(),
        });

        return docRef.id;
    } catch (error) {
        console.error('Error creating publication:', error);
        throw error;
    }
}

// Update publication
export async function updatePublication(id: string, data: Partial<Publication>): Promise<void> {
    if (!isFirebaseConfigured()) {
        const index = mockPublications.findIndex((p) => p.id === id);
        if (index !== -1) {
            mockPublications[index] = { ...mockPublications[index], ...data };
        }
        return;
    }

    try {
        const docRef = doc(db, PUBLICATIONS_COLLECTION, id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: Timestamp.now(),
        });
    } catch (error) {
        console.error('Error updating publication:', error);
        throw error;
    }
}

// Delete publication
export async function deletePublicationById(id: string): Promise<void> {
    if (!isFirebaseConfigured()) {
        const index = mockPublications.findIndex((p) => p.id === id);
        if (index !== -1) {
            mockPublications.splice(index, 1);
        }
        return;
    }

    try {
        await deleteDoc(doc(db, PUBLICATIONS_COLLECTION, id));
    } catch (error) {
        console.error('Error deleting publication:', error);
        throw error;
    }
}

// Generate slug from title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

export function getAdminPassword(): string {
    return process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';
}
