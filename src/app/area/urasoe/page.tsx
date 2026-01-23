import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
    title: '浦添市のニューボーンフォト・新生児写真撮影',
    description: '浦添市でニューボーンフォト・新生児写真を撮影できるスタジオとフリーランスカメラマンを紹介。パルコシティ周辺、経塚、内間エリアなど。料金相場、撮影プラン、口コミ評価から最適な写真家を見つけましょう。',
    keywords: ['浦添市', 'ニューボーンフォト', '新生児写真', 'スタジオ', 'カメラマン', '沖縄', 'パルコシティ'],
    canonical: '/area/urasoe',
});

export default function UrasoeAreaPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-400 to-purple-400 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        浦添市のニューボーンフォト
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90">
                        那覇市に隣接する浦添市で信頼できる新生児写真の専門家を見つけよう
                    </p>
                </div>
            </section>

            {/* Area Overview */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">浦添市のニューボーンフォト事情</h2>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                那覇市に隣接する浦添市は、アクセスの良さと落ち着いた環境が魅力のエリアです。
                                サンエー浦添西海岸PARCO CITY周辺には新しいスタジオが増えており、
                                撮影後のショッピングも楽しめます。
                            </p>

                            <h3 className="text-2xl font-bold mt-8 mb-4">浦添市の特徴</h3>

                            <div className="grid md:grid-cols-3 gap-6 my-8">
                                <div className="bg-white rounded-xl p-6 shadow-md">
                                    <div className="text-4xl mb-3">🏖️</div>
                                    <h4 className="font-bold text-lg mb-2">西海岸エリア</h4>
                                    <p className="text-gray-600">
                                        パルコシティ周辺に新しいスタジオが集中。海が近く開放的な雰囲気。
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-md">
                                    <div className="text-4xl mb-3">🚗</div>
                                    <h4 className="font-bold text-lg mb-2">アクセス良好</h4>
                                    <p className="text-gray-600">
                                        那覇市から車で15分。国道58号線沿いでアクセス便利。
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-md">
                                    <div className="text-4xl mb-3">🌳</div>
                                    <h4 className="font-bold text-lg mb-2">落ち着いた環境</h4>
                                    <p className="text-gray-600">
                                        那覇市より静かで、ゆったりとした撮影が可能。
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
                            {/* 西海岸エリア */}
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-4 text-blue-600">🌊 西海岸エリア（パルコシティ周辺）</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>メリット：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>新しいスタジオが多い</li>
                                        <li>パルコシティで買い物も楽しめる</li>
                                        <li>広い駐車場完備</li>
                                        <li>海が近く開放的な雰囲気</li>
                                    </ul>
                                    <p className="mt-4"><strong>おすすめの方：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>最新設備のスタジオを希望する方</li>
                                        <li>撮影後にショッピングも楽しみたい方</li>
                                        <li>中部在住の方</li>
                                    </ul>
                                </div>
                            </div>

                            {/* 経塚・内間エリア */}
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-4 text-purple-600">🏘️ 経塚・内間エリア</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>メリット：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>住宅街で静か</li>
                                        <li>アットホームなスタジオが多い</li>
                                        <li>比較的料金がリーズナブル</li>
                                    </ul>
                                    <p className="mt-4"><strong>おすすめの方：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>落ち着いた環境で撮影したい方</li>
                                        <li>浦添市在住の方</li>
                                        <li>コスパ重視の方</li>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">浦添市の料金相場</h2>

                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-6">
                            <p className="text-lg text-gray-700">
                                浦添市の料金相場は那覇市とほぼ同等ですが、西海岸エリアの新しいスタジオは
                                やや高めの設定、内陸部のスタジオは比較的リーズナブルな傾向があります。
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                                <h3 className="text-xl font-bold mb-4 text-blue-600">スタジオ撮影</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="font-semibold">ベーシックプラン</p>
                                        <p className="text-2xl font-bold text-blue-500">¥20,000〜¥35,000</p>
                                        <p className="text-sm text-gray-600">撮影30分、衣装1着、データ10〜20カット</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">スタンダードプラン</p>
                                        <p className="text-2xl font-bold text-blue-500">¥35,000〜¥55,000</p>
                                        <p className="text-sm text-gray-600">撮影60分、衣装2着、データ30〜50カット</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">プレミアムプラン</p>
                                        <p className="text-2xl font-bold text-blue-500">¥55,000〜¥85,000</p>
                                        <p className="text-sm text-gray-600">撮影90分、衣装無制限、全データ、アルバム付き</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                                <h3 className="text-xl font-bold mb-4 text-purple-600">出張撮影</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="font-semibold">ベーシックプラン</p>
                                        <p className="text-2xl font-bold text-purple-500">¥28,000〜¥45,000</p>
                                        <p className="text-sm text-gray-600">撮影60分、浦添市内出張費無料</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">スタンダードプラン</p>
                                        <p className="text-2xl font-bold text-purple-500">¥45,000〜¥70,000</p>
                                        <p className="text-sm text-gray-600">撮影90分、小物持参、データ40〜70カット</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">プレミアムプラン</p>
                                        <p className="text-2xl font-bold text-purple-500">¥70,000〜¥110,000</p>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">浦添市で撮影する際のポイント</h2>

                        <div className="space-y-6">
                            <div className="bg-blue-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🚗</span>
                                    アクセス
                                </h3>
                                <p className="text-gray-700">
                                    国道58号線沿いのスタジオが多く、那覇市からも車で15分程度とアクセス良好。
                                    西海岸エリアは週末混雑するため、平日がおすすめです。
                                </p>
                            </div>

                            <div className="bg-purple-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🛍️</span>
                                    撮影後の楽しみ
                                </h3>
                                <p className="text-gray-700">
                                    パルコシティ周辺のスタジオなら、撮影後にショッピングやカフェも楽しめます。
                                    赤ちゃん用品の買い物にも便利です。
                                </p>
                            </div>

                            <div className="bg-cyan-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🌊</span>
                                    海辺での撮影
                                </h3>
                                <p className="text-gray-700">
                                    出張撮影なら、西海岸の海辺での撮影も可能。沖縄らしい開放的な雰囲気の写真が撮れます。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        浦添市の写真家を探す
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        浦添市で活動する信頼できるニューボーンフォトの専門家を見つけましょう
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/photographers/freelance?area=浦添市"
                            className="px-8 py-4 bg-white text-blue-500 rounded-full font-bold hover:bg-blue-50 transition-colors"
                        >
                            浦添市のフリーランスカメラマン
                        </Link>
                        <Link
                            href="/photographers/studios?area=浦添市"
                            className="px-8 py-4 bg-white text-blue-500 rounded-full font-bold hover:bg-blue-50 transition-colors"
                        >
                            浦添市のスタジオ
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
                                <p className="text-sm text-gray-600">隣接エリアの情報</p>
                            </Link>
                            <Link
                                href="/area/ginowan"
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h3 className="font-bold mb-2">📍 宜野湾市</h3>
                                <p className="text-sm text-gray-600">隣接エリアの情報</p>
                            </Link>
                            <Link
                                href="/blog"
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h3 className="font-bold mb-2">📝 ブログ</h3>
                                <p className="text-sm text-gray-600">撮影ガイドを読む</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
