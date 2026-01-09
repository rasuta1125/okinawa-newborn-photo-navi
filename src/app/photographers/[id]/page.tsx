import { notFound } from 'next/navigation';
import { getPhotographerById } from '@/lib/services/photographerService';
import { RANK_DISPLAY_NAMES, RANK_ICONS } from '@/lib/constants/membershipTiers';
import { ReviewSection } from '@/components/ReviewSection';

interface PhotographerDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PhotographerDetailPage({ params }: PhotographerDetailPageProps) {
    const { id } = await params;
    const photographer = await getPhotographerById(id);

    if (!photographer) {
        notFound();
    }

    const rankBadgeClass = {
        Diamond: 'badge-premium',
        Platinum: 'badge-standard',
        Standard: 'badge-standard',
        Free: 'badge-free',
    };

    const badgeClass = rankBadgeClass[photographer.membershipRank];
    const badgeLabel = RANK_DISPLAY_NAMES[photographer.membershipRank];
    const badgeIcon = RANK_ICONS[photographer.membershipRank];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--cream)] to-[var(--beige)]">
            {/* Cover Image */}
            <div className="relative h-64 md:h-96 bg-gradient-to-br from-[var(--sand)] to-[var(--beige)] overflow-hidden">
                {photographer.coverImage ? (
                    <img
                        src={photographer.coverImage}
                        alt={`${photographer.name} カバー画像`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-8xl md:text-9xl">
                        📸
                    </div>
                )}
                <div className="absolute top-4 right-4">
                    <span className={`badge ${badgeClass} text-base`}>
                        <span>{badgeIcon}</span>
                        {badgeLabel}
                    </span>
                </div>
            </div>

            <div className="container-custom py-8 md:py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 animate-slide-up">
                        {/* プロフィール画像 */}
                        {photographer.profileImage && (
                            <div className="flex justify-center mb-6 -mt-20">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img
                                        src={photographer.profileImage}
                                        alt={photographer.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}
                        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-2 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                            {photographer.name}
                        </h1>
                        <div className="flex items-center gap-4 text-[var(--primary-light)] mb-4">
                            <span className="flex items-center gap-1">
                                {photographer.photographerType === 'Studio' ? '🏢 スタジオ' : '👤 フリーランス'}
                            </span>
                            <span className="flex items-center gap-1">
                                📍 {photographer.areas?.join('、') || '未設定'}
                            </span>
                        </div>
                        <p className="text-[var(--primary-light)] leading-relaxed">
                            {photographer.description || '説明はまだ登録されていません。'}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <h2 className="text-2xl font-bold text-[var(--primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            提供サービス
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {photographer.options?.length > 0 ? (
                                photographer.options.map(option => (
                                    <span
                                        key={option}
                                        className="px-4 py-2 bg-[var(--beige)] text-[var(--primary)] rounded-full font-medium"
                                    >
                                        ✓ {option}
                                    </span>
                                ))
                            ) : (
                                <p className="text-[var(--primary-light)]">サービスはまだ登録されていません。</p>
                            )}
                        </div>
                        {photographer.handprintOption && (
                            <div className="mt-4 p-4 bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent-dark)]/20 rounded-xl">
                                <div className="flex items-center gap-2 text-[var(--accent-dark)] font-medium">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    手形アート対応
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Gallery */}
                    {photographer.gallery && photographer.gallery.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 animate-slide-up" style={{ animationDelay: '150ms' }}>
                            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                ギャラリー
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {photographer.gallery.map((imageUrl, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow"
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={`${photographer.name} ギャラリー ${index + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SNS Links (ランク制限あり) */}
                    {photographer.membershipRank !== 'Free' && photographer.snsLinks && (
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 animate-slide-up" style={{ animationDelay: '150ms' }}>
                            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                SNS
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {photographer.snsLinks.line && (
                                    <a href={photographer.snsLinks.line} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                        📱 LINE
                                    </a>
                                )}
                                {photographer.snsLinks.instagram && (
                                    <a href={photographer.snsLinks.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                        📷 Instagram
                                    </a>
                                )}
                                {photographer.snsLinks.facebook && (
                                    <a href={photographer.snsLinks.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                        👥 Facebook
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Reviews Section */}
                    <ReviewSection photographerId={photographer.id} />

                    {/* Contact */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <h2 className="text-2xl font-bold text-[var(--primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            お問い合わせ
                        </h2>
                        <div className="space-y-3">
                            {photographer.email ? (
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-[var(--accent-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a href={`mailto:${photographer.email}`} className="text-[var(--primary)] hover:text-[var(--accent-dark)] transition-colors">
                                        {photographer.email}
                                    </a>
                                </div>
                            ) : null}
                            {photographer.phone ? (
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-[var(--accent-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <a href={`tel:${photographer.phone}`} className="text-[var(--primary)] hover:text-[var(--accent-dark)] transition-colors">
                                        {photographer.phone}
                                    </a>
                                </div>
                            ) : null}
                            {photographer.website && (
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-[var(--accent-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    <a href={photographer.website} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:text-[var(--accent-dark)] transition-colors">
                                        {photographer.website}
                                    </a>
                                </div>
                            )}
                            {!photographer.email && !photographer.phone && !photographer.website && (
                                <p className="text-[var(--primary-light)]">連絡先情報はまだ登録されていません。</p>
                            )}
                        </div>
                    </div>

                    {/* CTA */}
                    {(photographer.email || photographer.phone) && (
                        <div className="sticky bottom-4 bg-white rounded-2xl shadow-xl p-4 md:p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {photographer.email && (
                                    <a
                                        href={`/contact/${photographer.id}`}
                                        className="btn btn-primary flex-1 text-center"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        メールで問い合わせ
                                    </a>
                                )}
                                {photographer.phone && (
                                    <a href={`tel:${photographer.phone}`} className="btn btn-secondary flex-1 text-center">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        電話で問い合わせ
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
