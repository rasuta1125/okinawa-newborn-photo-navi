import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-[var(--primary)] text-white mt-auto">
            <div className="container-custom py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                    {/* About */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                                ニューボーンフォト
                            </span>
                        </div>
                        <p className="text-stone-300 text-sm leading-relaxed">
                            沖縄県内の新生児写真撮影の専門家とご家族をつなぐマッチングポータルサイト。
                            大切な赤ちゃんの成長の記録を、プロの技術で美しく残しませんか。
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            クイックリンク
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-stone-300 hover:text-white transition-colors">
                                    ホーム
                                </Link>
                            </li>
                            <li>
                                <Link href="/search" className="text-stone-300 hover:text-white transition-colors">
                                    写真家を探す
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Photographers */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            写真家の方へ
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/admin/login" className="text-stone-300 hover:text-white transition-colors">
                                    フォトナビ管理者ページ
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-stone-700 text-center text-sm text-stone-400">
                    <p>&copy; {new Date().getFullYear()} ニューボーンフォト. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
