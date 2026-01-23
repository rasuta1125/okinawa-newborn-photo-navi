import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
    title: '那覇市のニューボーンフォト・新生児写真撮影',
    description: '那覇市でニューボーンフォト・新生児写真を撮影できるスタジオとフリーランスカメラマンを紹介。国際通り、新都心、小禄エリアなど、アクセス良好なスタジオ多数。料金相場、撮影プラン、口コミ評価から最適な写真家を見つけましょう。',
    keywords: ['那覇市', 'ニューボーンフォト', '新生児写真', 'スタジオ', 'カメラマン', '沖縄', '国際通り', '新都心'],
    canonical: '/area/naha',
});

export default function NahaAreaPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-400 to-pink-400 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        那覇市のニューボーンフォト
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90">
                        沖縄県庁所在地・那覇市で信頼できる新生児写真の専門家を見つけよう
                    </p>
                </div>
            </section>

            {/* Area Overview */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">那覇市のニューボーンフォト事情</h2>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                沖縄県の県庁所在地である那覇市は、ニューボーンフォトのスタジオやカメラマンが最も充実しているエリアです。
                                国際通り周辺、新都心エリア、小禄・赤嶺エリアなど、各地域に特色あるスタジオが点在しています。
                            </p>

                            <h3 className="text-2xl font-bold mt-8 mb-4">那覇市の特徴</h3>

                            <div className="grid md:grid-cols-3 gap-6 my-8">
                                <div className="bg-white rounded-xl p-6 shadow-md">
                                    <div className="text-4xl mb-3">🚝</div>
                                    <h4 className="font-bold text-lg mb-2">アクセス抜群</h4>
                                    <p className="text-gray-600">
                                        ゆいレール（モノレール）が利用可能。駐車場完備のスタジオも多数。
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-md">
                                    <div className="text-4xl mb-3">🏢</div>
                                    <h4 className="font-bold text-lg mb-2">選択肢が豊富</h4>
                                    <p className="text-gray-600">
                                        専門スタジオから総合フォトスタジオまで、様々なタイプから選べます。
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-md">
                                    <div className="text-4xl mb-3">💰</div>
                                    <h4 className="font-bold text-lg mb-2">競争価格</h4>
                                    <p className="text-gray-600">
                                        スタジオが多く競争が激しいため、比較的リーズナブルな料金設定。
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
                            {/* 国際通り周辺 */}
                            <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-4 text-orange-600">🏙️ 国際通り周辺</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>メリット：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>アクセス抜群（ゆいレール利用可）</li>
                                        <li>駐車場完備のスタジオ多数</li>
                                        <li>撮影後に買い物も楽しめる</li>
                                    </ul>
                                    <p className="mt-4"><strong>おすすめの方：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>市外から来る方</li>
                                        <li>撮影後に買い物も楽しみたい方</li>
                                        <li>公共交通機関を利用したい方</li>
                                    </ul>
                                </div>
                            </div>

                            {/* 新都心エリア */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-4 text-blue-600">🏬 新都心エリア（おもろまち）</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>メリット：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>広い駐車場完備</li>
                                        <li>新しいスタジオが多い</li>
                                        <li>周辺施設が充実（サンエー那覇メインプレイスなど）</li>
                                    </ul>
                                    <p className="mt-4"><strong>おすすめの方：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>車で来る方</li>
                                        <li>ゆったりとした空間が好きな方</li>
                                        <li>最新設備のスタジオを希望する方</li>
                                    </ul>
                                </div>
                            </div>

                            {/* 小禄・赤嶺エリア */}
                            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-4 text-green-600">✈️ 小禄・赤嶺エリア</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>メリット：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>空港に近い（那覇空港から車で5分）</li>
                                        <li>比較的料金がリーズナブル</li>
                                        <li>南部在住の方にアクセス良好</li>
                                    </ul>
                                    <p className="mt-4"><strong>おすすめの方：</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>南部在住の方</li>
                                        <li>コスパ重視の方</li>
                                        <li>空港近くが便利な方</li>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">那覇市の料金相場</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
                                <h3 className="text-xl font-bold mb-4 text-orange-600">スタジオ撮影</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="font-semibold">ベーシックプラン</p>
                                        <p className="text-2xl font-bold text-orange-500">¥25,000〜¥35,000</p>
                                        <p className="text-sm text-gray-600">撮影30分、衣装1着、データ10〜20カット</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">スタンダードプラン</p>
                                        <p className="text-2xl font-bold text-orange-500">¥35,000〜¥50,000</p>
                                        <p className="text-sm text-gray-600">撮影60分、衣装2着、データ30〜50カット</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">プレミアムプラン</p>
                                        <p className="text-2xl font-bold text-orange-500">¥50,000〜¥80,000</p>
                                        <p className="text-sm text-gray-600">撮影90分、衣装無制限、全データ、アルバム付き</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                                <h3 className="text-xl font-bold mb-4 text-blue-600">出張撮影</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="font-semibold">ベーシックプラン</p>
                                        <p className="text-2xl font-bold text-blue-500">¥30,000〜¥45,000</p>
                                        <p className="text-sm text-gray-600">撮影60分、那覇市内出張費無料</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">スタンダードプラン</p>
                                        <p className="text-2xl font-bold text-blue-500">¥45,000〜¥65,000</p>
                                        <p className="text-sm text-gray-600">撮影90分、小物持参、データ40〜70カット</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">プレミアムプラン</p>
                                        <p className="text-2xl font-bold text-blue-500">¥65,000〜¥100,000</p>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">那覇市で撮影する際のポイント</h2>

                        <div className="space-y-6">
                            <div className="bg-orange-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🚗</span>
                                    アクセス・駐車場
                                </h3>
                                <p className="text-gray-700">
                                    那覇市は交通量が多いため、撮影時間の30分前には到着するよう余裕を持って出発しましょう。
                                    駐車場の有無は事前に確認を。ゆいレール利用も便利です。
                                </p>
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🌡️</span>
                                    気候・室温
                                </h3>
                                <p className="text-gray-700">
                                    那覇市は年間を通して温暖ですが、夏場（6〜9月）は特に暑くなります。
                                    エアコン完備のスタジオを選び、赤ちゃんの体温調節に注意しましょう。
                                </p>
                            </div>

                            <div className="bg-green-50 rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <span className="text-2xl">📅</span>
                                    予約のタイミング
                                </h3>
                                <p className="text-gray-700">
                                    那覇市の人気スタジオは予約が埋まりやすいため、出産予定日の1〜2ヶ月前に仮予約をすることをおすすめします。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-orange-400 to-pink-400 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        那覇市の写真家を探す
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        那覇市で活動する信頼できるニューボーンフォトの専門家を見つけましょう
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/photographers/freelance?area=那覇市"
                            className="px-8 py-4 bg-white text-orange-500 rounded-full font-bold hover:bg-orange-50 transition-colors"
                        >
                            那覇市のフリーランスカメラマン
                        </Link>
                        <Link
                            href="/photographers/studios?area=那覇市"
                            className="px-8 py-4 bg-white text-orange-500 rounded-full font-bold hover:bg-orange-50 transition-colors"
                        >
                            那覇市のスタジオ
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
                                href="/blog/naha-newborn-photographers"
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h3 className="font-bold mb-2">📝 那覇市ガイド</h3>
                                <p className="text-sm text-gray-600">詳しい撮影ガイドを読む</p>
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
