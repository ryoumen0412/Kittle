'use client';

import { Publication, Category } from './types';
import { publications as mockPublications } from './data';

const PUBLICATIONS_STORAGE_KEY = 'kittle_publications';
const ADMIN_AUTH_KEY = 'kittle_admin_auth';
const ADMIN_PASSWORD = 'kittle2024'; // Simple password for now

// Initialize localStorage with mock data if empty
export function initializePublications(): void {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(PUBLICATIONS_STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(PUBLICATIONS_STORAGE_KEY, JSON.stringify(mockPublications));
    }
}

// Get all publications from localStorage
export function getStoredPublications(): Publication[] {
    if (typeof window === 'undefined') return mockPublications;

    initializePublications();
    const stored = localStorage.getItem(PUBLICATIONS_STORAGE_KEY);

    try {
        return stored ? JSON.parse(stored) : mockPublications;
    } catch {
        return mockPublications;
    }
}

// Get publication by slug
export function getStoredPublicationBySlug(slug: string): Publication | undefined {
    const publications = getStoredPublications();
    return publications.find((p) => p.slug === slug);
}

// Get publications by category
export function getStoredPublicationsByCategory(category: Category): Publication[] {
    const publications = getStoredPublications();
    return publications.filter((p) => p.category === category);
}

// Get recent publications
export function getStoredRecentPublications(limit: number = 6): Publication[] {
    const publications = getStoredPublications();
    return [...publications]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
}

// Save all publications
export function savePublications(publications: Publication[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(PUBLICATIONS_STORAGE_KEY, JSON.stringify(publications));
}

// Create new publication
export function createPublication(publication: Omit<Publication, 'id'>): Publication {
    const publications = getStoredPublications();

    const newPublication: Publication = {
        ...publication,
        id: Date.now().toString(),
    };

    publications.unshift(newPublication);
    savePublications(publications);

    return newPublication;
}

// Update existing publication
export function updatePublication(id: string, updates: Partial<Publication>): Publication | null {
    const publications = getStoredPublications();
    const index = publications.findIndex((p) => p.id === id);

    if (index === -1) return null;

    publications[index] = { ...publications[index], ...updates };
    savePublications(publications);

    return publications[index];
}

// Delete publication
export function deletePublication(id: string): boolean {
    const publications = getStoredPublications();
    const filtered = publications.filter((p) => p.id !== id);

    if (filtered.length === publications.length) return false;

    savePublications(filtered);
    return true;
}

// Generate slug from title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
}

// Admin authentication
export function isAdminAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

export function authenticateAdmin(password: string): boolean {
    if (password === ADMIN_PASSWORD) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(ADMIN_AUTH_KEY, 'true');
        }
        return true;
    }
    return false;
}

export function logoutAdmin(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ADMIN_AUTH_KEY);
}
