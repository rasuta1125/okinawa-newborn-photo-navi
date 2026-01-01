import { getAllPhotographers } from '@/lib/services/photographerService';
import { PhotographerCard } from '@/components/PhotographerCard';

export default function HundredDaysPage() {
    const photographers = getAllPhotographers('100days');

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--cream)] to-[var(--beige)]">
            {/* Header */}
            <div className="bg-white border-b border-stone-200">
                <div className="container-custom py-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-4 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                        100日以降のおすすめスタジオ
                    </h1>
                    <p className="text-[var(--primary-light)] text-center text-lg">
                        100日祝い・お食い初め撮影に特化したスタジオをご紹介
                    </p>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Top 2 - Featured Studios */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--primary)] mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                            🏆 おすすめTOP2
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {photographers.slice(0, 2).map((photographer, index) => (
                                <div key={photographer.id} className="relative">
                                    {/* Ranking Badge */}
                                    <div className="absolute -top-4 -left-4 z-10 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white text-2xl font-bold">{index + 1}</span>
                                    </div>
                                    <div className="transform hover:scale-105 transition-transform">
                                        <PhotographerCard photographer={photographer} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Other Studios */}
                    {photographers.length > 2 && (
                        <>
                            <div className="border-t border-stone-300 my-12"></div>
                            <div>
                                <h2 className="text-2xl font-bold text-[var(--primary)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                                    その他のおすすめスタジオ
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {photographers.slice(2).map((photographer, index) => (
                                        <div
                                            key={photographer.id}
                                            className="animate-slide-up"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <PhotographerCard photographer={photographer} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Info Section */}
                    <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-xl font-bold text-[var(--primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            100日祝い撮影について
                        </h3>
                        <div className="space-y-3 text-[var(--primary-light)]">
                            <p>
                                100日祝い（お食い初め）は、赤ちゃんが生まれて100日目に行う日本の伝統行事です。
                            </p>
                            <p>
                                「一生食べ物に困らないように」という願いを込めて、ご家族で記念撮影をされる方が増えています。
                            </p>
                            <p className="font-medium text-[var(--accent-dark)]">
                                上記のスタジオは、100日祝い撮影の実績が豊富で、お食い初めの食器や衣装も充実しています。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
