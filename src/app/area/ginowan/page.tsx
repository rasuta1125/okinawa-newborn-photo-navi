import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
    title: '宜野湾市のニューボーンフォト・新生児写真撮影',
    description: '宜野湾市でニューボーンフォト・新生児写真を撮影できるスタジオとフリーランスカメラマンを紹介。普天間、大山、真志喜エリアなど。料金相場、撮影プラン、口コミ評価から最適な写真家を見つけましょう。',
    keywords: ['宜野湾市', 'ニューボーンフォト', '新生児写真', 'スタジオ', 'カメラマン', '沖縄', '普天間', '大山'],
    canonical: '/area/ginowan',
});

export default function GinowanAreaPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-400 to-teal-400 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        宜野湾市のニューボーンフォト
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90">
                        中部の中心都市・宜野湾市で信頼できる新生児写真の専門家を見つけよう
                    </p>
                </div>
            </section>

            {/* Area Overview */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">宜野湾市のニューボーンフォト事情</h2>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                沖縄本島中部の中心都市である宜野湾市は、那覇市と沖縄市の中間に位置し、
                                中部エリア全体からアクセスしやすい立地が魅力です。
                                コンベンションシティとしても知られ、近代的なスタジオが増えています。
                            </p>

                            <h3 className="text-2xl font-bold mt-8 mb-4">宜野湾市の特徴</h3>

                            <div className="grid md:grid-cols-3 gap-6 my-8">
                                <div className="bg-white rounded-xl p-6 shadow-md">
                                    <div className="text-4xl mb-3">🎯</div>
                                    <h4 className="font-bold text-lg mb-2">中部の中心</h4>
                                    <p className="text-gray-600">
                                        那覇市と沖縄市の中間。中部エリア全体からアクセス良好。
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-md">
                                    <div className="text-4xl mb-3">🏢</div>
                                    <h4 className="font-bold text-lg mb-2">近代的な環境</h4>
                                    <p className="text-gray-600">
                                        コンベンションシティとして発展。新しいスタジオが多い。
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-md">
                                    <div className="text-4xl mb-3">🌴</div>
                                    <h4 className="font-bold text-lg mb-2">バランスの良さ</h4>
                                    <p className="text-gray-600">
                                        都市機能と自然のバランスが良く、落ち着いた環境。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Area Breakdown */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">エリア別おすすめ</h2>

                        <div className="space-y-8">
                            {/* 普天間エリア */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-4 text-green-600">🏙️ 普天間エリア</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>メリット：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>宜野湾市の中心部</li>
                                        <li>スタジオの選択肢が豊富</li>
                                        <li>周辺施設が充実</li>
                                    </ul>
                                    <p className="mt-4"><strong>おすすめの方：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>宜野湾市在住の方</li>
                                        <li>中部エリア在住の方</li>
                                        <li>複数のスタジオを比較したい方</li>
                                    </ul>
                                </div>
                            </div>

                            {/* 大山エリア */}
                            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-4 text-teal-600">🛍️ 大山エリア</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>メリット：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>商業施設が充実</li>
                                        <li>駐車場完備のスタジオが多い</li>
                                        <li>撮影後の買い物に便利</li>
                                    </ul>
                                    <p className="mt-4"><strong>おすすめの方：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>撮影後にショッピングも楽しみたい方</li>
                                        <li>車でアクセスする方</li>
                                    </ul>
                                </div>
                            </div>

                            {/* 真志喜エリア */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-4 text-blue-600">🏖️ 真志喜エリア</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>メリット：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>海が近く開放的</li>
                                        <li>比較的静かな環境</li>
                                        <li>出張撮影で海辺の撮影も可能</li>
                                    </ul>
                                    <p className="mt-4"><strong>おすすめの方：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>海辺での撮影を希望する方</li>
                                        <li>落ち着いた環境を好む方</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">宜野湾市の料金相場</h2>

                        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 mb-6">
                            <p className="text-lg text-gray-700">
                                宜野湾市の料金相場は那覇市よりやや低めの傾向があります。
                                中部エリアの中心として、コストパフォーマンスの良いスタジオが多いのが特徴です。
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                                <h3 className="text-xl font-bold mb-4 text-green-600">スタジオ撮影</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="font-semibold">ベーシックプラン</p>
                                        <p className="text-2xl font-bold text-green-500">¥20,000〜¥30,000</p>
                                        <p className="text-sm text-gray-600">撮影30分、衣装1着、データ10〜20カット</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">スタンダードプラン</p>
                                        <p className="text-2xl font-bold text-green-500">¥30,000〜¥50,000</p>
                                        <p className="text-sm text-gray-600">撮影60分、衣装2着、データ30〜50カット</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">プレミアムプラン</p>
                                        <p className="text-2xl font-bold text-green-500">¥50,000〜¥75,000</p>
                                        <p className="text-sm text-gray-600">撮影90分、衣装無制限、全データ、アルバム付き</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-teal-200">
                                <h3 className="text-xl font-bold mb-4 text-teal-600">出張撮影</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="font-semibold">ベーシックプラン</p>
                                        <p className="text-2xl font-bold text-teal-500">¥25,000〜¥40,000</p>
                                        <p className="text-sm text-gray-600">撮影60分、宜野湾市内出張費無料</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">スタンダードプラン</p>
                                        <p className="text-2xl font-bold text-teal-500">¥40,000〜¥65,000</p>
                                        <p className="text-sm text-gray-600">撮影90分、小物持参、データ40〜70カット</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">プレミアムプラン</p>
                                        <p className="text-2xl font-bold text-teal-500">¥65,000〜¥100,000</p>
                                        <p className="text-sm text-gray-600">撮影120分、衣装・小物持参、全データ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tips */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">宜野湾市で撮影する際のポイント</h2>

                        <div className="space-y-6">
                            <div className="bg-green-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🚗</span>
                                    アクセス
                                </h3>
                                <p className="text-gray-700">
                                    国道58号線、国道330号線が通り、那覇市からも沖縄市からもアクセス良好。
                                    中部エリア全体から30分以内でアクセス可能です。
                                </p>
                            </div>

                            <div className="bg-teal-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <span className="text-2xl">💰</span>
                                    コストパフォーマンス
                                </h3>
                                <p className="text-gray-700">
                                    那覇市より料金がやや低めで、質の高い撮影が受けられるスタジオが多いのが魅力。
                                    中部エリアの方には特におすすめです。
                                </p>
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🌊</span>
                                    海辺での撮影
                                </h3>
                                <p className="text-gray-700">
                                    真志喜エリアなら海が近く、出張撮影で海辺でのニューボーンフォトも可能。
                                    沖縄らしい開放的な雰囲気の写真が撮れます。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-green-400 to-teal-400 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        宜野湾市の写真家を探す
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        宜野湾市で活動する信頼できるニューボーンフォトの専門家を見つけましょう
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/photographers/freelance?area=宜野湾市"
                            className="px-8 py-4 bg-white text-green-500 rounded-full font-bold hover:bg-green-50 transition-colors"
                        >
                            宜野湾市のフリーランスカメラマン
                        </Link>
                        <Link
                            href="/photographers/studios?area=宜野湾市"
                            className="px-8 py-4 bg-white text-green-500 rounded-full font-bold hover:bg-green-50 transition-colors"
                        >
                            宜野湾市のスタジオ
                        </Link>
                    </div>
                </div>
            </section>

            {/* Related Links */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6">関連情報</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Link
                                href="/area/naha"
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h3 className="font-bold mb-2">📍 那覇市</h3>
                                <p className="text-sm text-gray-600">南部エリアの情報</p>
                            </Link>
                            <Link
                                href="/area/urasoe"
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h3 className="font-bold mb-2">📍 浦添市</h3>
                                <p className="text-sm text-gray-600">隣接エリアの情報</p>
                            </Link>
                            <Link
                                href="/faq"
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h3 className="font-bold mb-2">❓ FAQ</h3>
                                <p className="text-sm text-gray-600">よくある質問を見る</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
