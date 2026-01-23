'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
            <nav className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-xl md:text-2xl font-bold text-[var(--primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                            沖縄ニューボーンフォト・ナビ
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/photographers/freelance" className="text-[var(--primary)] hover:text-[var(--photorait-orange)] transition-colors text-sm font-medium">
                            ニューボーンフォトグラファー
                        </Link>
                        <Link href="/photographers/studios" className="text-[var(--primary)] hover:text-[var(--photorait-orange)] transition-colors text-sm font-medium">
                            ニューボーンスタジオ
                        </Link>
                        <Link href="/100days" className="text-[var(--primary)] hover:text-[var(--photorait-orange)] transition-colors text-sm font-medium">
                            100日以降のおすすめスタジオ
                        </Link>
                        <Link href="/blog" className="text-[var(--primary)] hover:text-[var(--photorait-orange)] transition-colors text-sm font-medium">
                            ブログ
                        </Link>
                        <Link href="/faq" className="text-[var(--primary)] hover:text-[var(--photorait-orange)] transition-colors text-sm font-medium">
                            FAQ
                        </Link>
                        <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-[#FF9500] to-[#E68600] text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold">
                            掲載したい方はこちら
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[var(--primary)]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="メニュー"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-stone-200 animate-fade-in">
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="/photographers/freelance"
                                className="text-[var(--primary)] hover:text-[var(--photorait-orange)] transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                ニューボーンフォトグラファー
                            </Link>
                            <Link
                                href="/photographers/studios"
                                className="text-[var(--primary)] hover:text-[var(--photorait-orange)] transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                ニューボーンスタジオ
                            </Link>
                            <Link
                                href="/100days"
                                className="text-[var(--primary)] hover:text-[var(--photorait-orange)] transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                100日以降のおすすめスタジオ
                            </Link>
                            <Link
                                href="/blog"
                                className="text-[var(--primary)] hover:text-[var(--photorait-orange)] transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                ブログ
                            </Link>
                            <Link
                                href="/faq"
                                className="text-[var(--primary)] hover:text-[var(--photorait-orange)] transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                FAQ
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 bg-gradient-to-r from-[#FF9500] to-[#E68600] text-white rounded-lg text-center font-semibold"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                掲載したい方はこちら
                            </Link>
                        </nav>
                    </div>
                )}
            </nav>
        </header>
    );
}
