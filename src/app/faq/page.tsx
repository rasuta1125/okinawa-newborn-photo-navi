import { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
    title: 'よくある質問（FAQ）',
    description: 'ニューボーンフォトの撮影に関するよくある質問にお答えします。料金、撮影時期、準備するもの、スタジオと出張撮影の違いなど、気になる疑問を解決します。',
    keywords: ['FAQ', 'よくある質問', 'ニューボーンフォト', '沖縄', '料金', '撮影時期'],
    canonical: '/faq',
});

interface FAQItem {
    question: string;
    answer: string;
    category: 'general' | 'pricing' | 'preparation' | 'booking';
}

const faqs: FAQItem[] = [
    {
        category: 'general',
        question: 'ニューボーンフォトとは何ですか？',
        answer: 'ニューボーンフォトとは、生後2週間以内の新生児を撮影する記念写真のことです。この時期の赤ちゃんは、まだ胎内にいた時の丸まった姿勢を保っており、深い眠りにつきやすいため、愛らしい表情や自然なポーズで撮影できます。',
    },
    {
        category: 'general',
        question: '撮影に最適な時期はいつですか？',
        answer: '生後5日〜14日が最適です。この時期の赤ちゃんは深い眠りにつきやすく、丸まった姿勢を自然に保てます。ただし、赤ちゃんの体調や家族の都合に合わせて、前後数日ずれても問題ありません。',
    },
    {
        category: 'general',
        question: 'スタジオ撮影と出張撮影、どちらがおすすめですか？',
        answer: 'それぞれにメリットがあります。スタジオ撮影は、プロの照明・背景設備が整っており、豊富な小物や衣装を使った本格的な撮影が可能です。一方、出張撮影は自宅でリラックスして撮影でき、赤ちゃんの移動負担がありません。ご家族の状況や希望に合わせてお選びください。',
    },
    {
        category: 'general',
        question: '撮影にかかる時間はどのくらいですか？',
        answer: '通常2〜3時間程度です。新生児は授乳やおむつ替えの時間が必要なため、余裕を持ったスケジュールで撮影します。赤ちゃんのペースに合わせて進めるため、時間に余裕を持ってご予約ください。',
    },
    {
        category: 'pricing',
        question: '料金相場はいくらですか？',
        answer: '沖縄でのニューボーンフォトの料金相場は、スタジオ撮影で¥25,000〜¥100,000、出張撮影で¥30,000〜¥120,000程度です。プランによって撮影時間、データ枚数、衣装の数などが異なります。詳しくは各スタジオ・カメラマンのページをご確認ください。',
    },
    {
        category: 'pricing',
        question: '料金に含まれるものは何ですか？',
        answer: '基本的には、撮影料、データ納品（枚数はプランによる）、衣装レンタル、撮影小物が含まれます。ただし、スタジオやカメラマンによって異なるため、予約時に必ず確認しましょう。追加データ購入、アルバム作成、出張費（遠方の場合）などは別料金になることが多いです。',
    },
    {
        category: 'pricing',
        question: '追加料金はかかりますか？',
        answer: 'プランに含まれない以下のサービスには追加料金がかかる場合があります：追加データ購入（1カット¥500〜¥1,500）、アルバム作成（¥5,000〜¥50,000）、出張費（遠方の場合¥3,000〜）、撮影時間の延長（30分¥5,000〜¥10,000）、衣装追加（1着¥3,000〜¥8,000）。',
    },
    {
        category: 'preparation',
        question: '準備するものは何ですか？',
        answer: '赤ちゃん用：授乳・ミルクの準備、おむつ・おしりふき（多めに）、着替え2〜3セット、おくるみ・ブランケット。ママ・パパ用：リラックスできる服装（家族写真を撮る場合はシンプルな服装がおすすめ）、スマホ・カメラ（撮影風景の記録用）。',
    },
    {
        category: 'preparation',
        question: '赤ちゃんの服装はどうすればいいですか？',
        answer: 'ほとんどのスタジオやカメラマンが衣装を用意しているため、特別な準備は不要です。撮影前の移動時は、赤ちゃんが快適に過ごせる服装でお越しください。家族写真も撮影する場合は、シンプルで落ち着いた色の服装がおすすめです。',
    },
    {
        category: 'preparation',
        question: '沖縄の気候で注意することはありますか？',
        answer: '沖縄は年間を通して温暖ですが、夏（6月〜9月）は高温多湿になります。エアコン完備のスタジオを選ぶか、出張撮影の場合は室温を26〜28度に保つようにしましょう。また、台風シーズン（7月〜10月）は予約の変更に柔軟に対応してくれるスタジオを選ぶと安心です。',
    },
    {
        category: 'booking',
        question: 'いつ予約すればいいですか？',
        answer: '出産予定日の1〜2ヶ月前に仮予約をすることをおすすめします。人気のスタジオやカメラマンは予約が埋まりやすいため、早めの予約が安心です。出産日がずれた場合の対応についても、予約時に確認しておきましょう。',
    },
    {
        category: 'booking',
        question: '予約のキャンセルはできますか？',
        answer: 'スタジオやカメラマンによってキャンセルポリシーが異なります。出産日がずれた場合や赤ちゃんの体調不良の場合の対応について、予約時に必ず確認しましょう。多くのスタジオでは、新生児の撮影という特性を考慮して、柔軟に対応してくれます。',
    },
    {
        category: 'booking',
        question: '双子の撮影はできますか？',
        answer: 'はい、多くのスタジオやカメラマンが双子の撮影に対応しています。ただし、撮影時間が長くなる場合や、料金が異なる場合があるため、予約時に双子であることを伝えて、詳細を確認しましょう。',
    },
    {
        category: 'general',
        question: '家族写真も一緒に撮れますか？',
        answer: 'はい、ほとんどのスタジオやカメラマンが家族写真の撮影にも対応しています。兄弟姉妹、ママ・パパ、祖父母など、ご家族全員での撮影も可能です。プランによっては追加料金がかかる場合もあるため、予約時に確認しましょう。',
    },
    {
        category: 'general',
        question: '赤ちゃんが泣いたらどうなりますか？',
        answer: '新生児の撮影では、赤ちゃんが泣くことはよくあります。経験豊富なカメラマンは、赤ちゃんのペースに合わせて撮影を進めます。授乳やおむつ替えの時間を取りながら、リラックスした雰囲気で撮影しますので、ご安心ください。',
    },
];

const categoryLabels = {
    general: '一般的な質問',
    pricing: '料金について',
    preparation: '準備・当日について',
    booking: '予約について',
};

export default function FAQPage() {
    const categories = ['general', 'pricing', 'preparation', 'booking'] as const;

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-400 to-pink-400 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        よくある質問（FAQ）
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90">
                        ニューボーンフォトに関する疑問にお答えします
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {categories.map((category) => {
                            const categoryFaqs = faqs.filter(faq => faq.category === category);

                            return (
                                <div key={category} className="mb-12">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b-4 border-orange-400 pb-2 inline-block">
                                        {categoryLabels[category]}
                                    </h2>

                                    <div className="space-y-6 mt-6">
                                        {categoryFaqs.map((faq, index) => (
                                            <div
                                                key={index}
                                                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                                            >
                                                <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-800 flex items-start gap-3">
                                                    <span className="flex-shrink-0 w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                        Q
                                                    </span>
                                                    <span className="flex-1">{faq.question}</span>
                                                </h3>
                                                <div className="ml-11">
                                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Still Have Questions Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        まだ疑問がありますか？
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        各スタジオ・カメラマンに直接お問い合わせいただけます
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/photographers/freelance"
                            className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full font-bold hover:shadow-lg transition-all"
                        >
                            フリーランスカメラマンを探す
                        </Link>
                        <Link
                            href="/photographers/studios"
                            className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full font-bold hover:shadow-lg transition-all"
                        >
                            スタジオを探す
                        </Link>
                    </div>
                </div>
            </section>

            {/* Blog CTA */}
            <section className="py-16 bg-gradient-to-r from-orange-400 to-pink-400 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        もっと詳しく知りたい方へ
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        ブログでニューボーンフォトの撮影ガイドや育児情報を発信中
                    </p>
                    <Link
                        href="/blog"
                        className="inline-block px-8 py-4 bg-white text-orange-500 rounded-full font-bold hover:bg-orange-50 transition-colors"
                    >
                        ブログを読む
                    </Link>
                </div>
            </section>
        </div>
    );
}
