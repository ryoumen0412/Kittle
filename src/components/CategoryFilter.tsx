'use client';

import { Category, categoryLabels } from '@/lib/types';

interface CategoryFilterProps {
    activeCategory: Category | 'all';
    onCategoryChange: (category: Category | 'all') => void;
    showAll?: boolean;
}

const categories: (Category | 'all')[] = ['all', 'historia', 'cuento', 'novela', 'blog'];

export default function CategoryFilter({
    activeCategory,
    onCategoryChange,
    showAll = true
}: CategoryFilterProps) {
    const filteredCategories = showAll ? categories : categories.filter(c => c !== 'all');

    return (
        <div className="flex flex-wrap gap-2 md:gap-3">
            {filteredCategories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === category
                            ? 'bg-gradient-to-r from-[var(--pink-neon)] to-[var(--pink-neon-light)] text-white shadow-lg shadow-[var(--pink-neon)]/20'
                            : 'bg-[var(--navy-800)] text-[var(--text-secondary)] hover:bg-[var(--navy-700)] hover:text-[var(--text-primary)] border border-[var(--navy-700)]'
                        }`}
                >
                    {category === 'all' ? 'Todos' : categoryLabels[category]}
                </button>
            ))}
        </div>
    );
}
