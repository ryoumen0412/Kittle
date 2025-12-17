// Types for the Stories application

export type Category = 'historia' | 'cuento' | 'novela' | 'blog';

export interface Publication {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  publishedAt: string;
  author: string;
  readingTime: number; // in minutes
}

export interface Rating {
  publicationId: string;
  ratings: number[]; // Array of individual ratings (1-5)
}

export interface RatingData {
  [publicationId: string]: number[];
}

export const categoryLabels: Record<Category, string> = {
  historia: 'Historia',
  cuento: 'Cuento',
  novela: 'Novela',
  blog: 'Blog',
};

export const categoryRoutes: Record<Category, string> = {
  historia: '/historias',
  cuento: '/cuentos',
  novela: '/novelas',
  blog: '/blog',
};
