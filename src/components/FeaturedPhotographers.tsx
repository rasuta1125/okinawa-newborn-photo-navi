import Link from 'next/link';
import { getFeaturedPhotographers } from '@/lib/services/photographerService';
import { PhotographerCard } from './PhotographerCard';
import { Photographer } from '@/lib/types';

export async function FeaturedPhotographers() {
    let featured: Photographer[];
    try {
        featured = await getFeaturedPhotographers(6);
    } catch (error) {
        console.error('Failed to fetch featured photographers:', error);
        featured = [];
    }

    return (
        <section className="section bg-gradient-to-br from-[var(--cream)] to-[var(--beige)]">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-4">
                        <span className="text-xl">⭐</span>
                        <span className="text-sm font-medium text-[var(--primary)]">
                            おすすめ
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        注目の写真家
                    </h2>
                    <p className="text-[var(--primary-light)] max-w-2xl mx-auto">
                        実績豊富で信頼できる写真家をご紹介します
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
                    {featured.map((photographer, index) => (
                        <div
                            key={photographer.id}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <PhotographerCard photographer={photographer} />
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/search" className="btn btn-outline">
                        すべての写真家を見る
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
