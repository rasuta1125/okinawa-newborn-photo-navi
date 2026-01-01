import Link from 'next/link';
import { Button } from './ui/Button';

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--cream)] via-[var(--beige)] to-[var(--sand)]">
            {/* Background Image */}
            <div
                className="absolute inset-0 opacity-70"
                style={{
                    backgroundImage: 'url(/images/baby-hand.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--cream)]/80 via-[var(--beige)]/70 to-[var(--sand)]/80" />

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

            <div className="container-custom relative">
                <div className="py-16 md:py-24 lg:py-32">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-6">
                            <span className="text-2xl">✨</span>
                            <span className="text-sm font-medium text-[var(--primary)]">
                                沖縄県内の新生児写真撮影専門
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--primary)] mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                            大切な瞬間を、
                            <br />
                            <span className="bg-gradient-to-r from-[var(--accent-dark)] to-[var(--accent)] bg-clip-text text-transparent">
                                美しく残す
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-[var(--primary-light)] mb-10 max-w-2xl mx-auto leading-relaxed">
                            生まれたばかりの赤ちゃんの愛らしい姿を、プロの技術で記録に残しませんか。
                            沖縄県内の信頼できる新生児写真の専門家が見つかります。
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/search">
                                <Button variant="primary" className="text-lg px-8 py-4">
                                    🔍 写真家を探す
                                </Button>
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-[var(--primary-light)]">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-[var(--accent-dark)]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>厳選された写真家</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-[var(--accent-dark)]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>安心の実績</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-[var(--accent-dark)]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                <span>丁寧なサポート</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
