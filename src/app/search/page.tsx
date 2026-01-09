'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchPhotographers } from '@/lib/services/photographerService';
import { PhotographerCard } from '@/components/PhotographerCard';
import { SearchFilters, PhotographerType, Photographer } from '@/lib/types';
import { Suspense } from 'react';

function SearchResults() {
    const searchParams = useSearchParams();
    const [results, setResults] = useState<Photographer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const filters: SearchFilters = {
        area: searchParams.get('area') || undefined,
        options: searchParams.get('options')?.split(',').filter(Boolean) || undefined,
        photographerType: (searchParams.get('type') as PhotographerType) || undefined,
    };

    useEffect(() => {
        async function loadResults() {
            setIsLoading(true);
            try {
                const photographers = await searchPhotographers(filters);
                setResults(photographers);
            } catch (error) {
                console.error('Error loading photographers:', error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }
        loadResults();
    }, [searchParams]);

    const hasFilters = filters.area || (filters.options && filters.options.length > 0) || filters.photographerType;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[var(--cream)] to-[var(--beige)] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
                    <p className="text-[var(--primary-light)]">検索中...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--cream)] to-[var(--beige)]">
            <div className="container-custom section">
                {/* Header */}
                <div className="mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        写真家検索結果
                    </h1>

                    {/* Active Filters */}
                    {hasFilters && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {filters.area && (
                                <span className="badge bg-[var(--accent)] text-[var(--primary)]">
                                    📍 {filters.area}
                                </span>
                            )}
                            {filters.photographerType && (
                                <span className="badge bg-[var(--accent)] text-[var(--primary)]">
                                    {filters.photographerType === 'Studio' ? '🏢 スタジオ' : '👤 フリーランス'}
                                </span>
                            )}
                            {filters.options?.map(option => (
                                <span key={option} className="badge bg-[var(--accent)] text-[var(--primary)]">
                                    ✓ {option}
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-[var(--primary-light)]">
                        {results.length}件の写真家が見つかりました
                    </p>
                </div>

                {/* Results */}
                {results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {results.map((photographer, index) => (
                            <div
                                key={photographer.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <PhotographerCard photographer={photographer} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-bold text-[var(--primary)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                            該当する写真家が見つかりませんでした
                        </h2>
                        <p className="text-[var(--primary-light)] mb-8">
                            検索条件を変更して、もう一度お試しください
                        </p>
                        <a href="/" className="btn btn-primary">
                            トップページに戻る
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-[var(--cream)] to-[var(--beige)] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
                    <p className="text-[var(--primary-light)]">読み込み中...</p>
                </div>
            </div>
        }>
            <SearchResults />
        </Suspense>
    );
}
