import { Metadata } from 'next';

interface PageMetadataProps {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    canonical?: string;
}

const SITE_NAME = '沖縄ニューボーンフォト・ナビ';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function generatePageMetadata({
    title,
    description,
    keywords = [],
    ogImage = '/images/og-default.jpg',
    canonical,
}: PageMetadataProps): Metadata {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: SITE_NAME,
            images: [
                {
                    url: `${SITE_URL}${ogImage}`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'ja_JP',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [`${SITE_URL}${ogImage}`],
        },
    };
}

// ページ別のメタデータ設定
export const PAGE_METADATA = {
    home: {
        title: '沖縄県の新生児写真撮影マッチングポータル',
        description: '沖縄県内の信頼できるニューボーンフォト・新生児写真の専門家を見つけられるマッチングサイト。スタジオ・フリーランスカメラマンの比較、料金プラン、口コミ評価から最適な写真家を選べます。那覇市、浦添市、宜野湾市など沖縄全域対応。',
        keywords: [
            '沖縄 ニューボーンフォト',
            '沖縄 新生児写真',
            '沖縄 赤ちゃん写真',
            '那覇市 ニューボーンフォト',
            '浦添市 新生児写真',
            '写真スタジオ 沖縄',
            'フリーランスカメラマン 沖縄',
            '出張撮影 沖縄',
            '100日祝い 沖縄',
            'バースデーフォト 沖縄',
            '753 沖縄',
        ],
        canonical: '/',
    },
    freelance: {
        title: 'ニューボーンフォトグラファー一覧 - 沖縄県のフリーランスカメラマン',
        description: '沖縄県内のニューボーンフォト専門フリーランスカメラマン一覧。出張撮影対応、料金プラン、撮影実績から最適なカメラマンを見つけられます。那覇市、浦添市、宜野湾市、沖縄市、うるま市など全域対応可能。',
        keywords: [
            '沖縄 ニューボーンフォト フリーランス',
            '沖縄 出張撮影',
            '沖縄 カメラマン',
            '那覇市 出張撮影',
            '新生児写真 自宅',
            'ニューボーンフォトグラファー 沖縄',
        ],
        canonical: '/photographers/freelance',
    },
    studios: {
        title: 'ニューボーンスタジオ一覧 - 沖縄県の写真スタジオ',
        description: '沖縄県内のニューボーンフォト専門スタジオ一覧。設備充実、衣装レンタル、料金プラン、口コミ評価から最適なスタジオを見つけられます。那覇市、浦添市、宜野湾市、沖縄市の人気スタジオを掲載。',
        keywords: [
            '沖縄 ニューボーンフォト スタジオ',
            '沖縄 写真スタジオ',
            '那覇市 写真スタジオ',
            '浦添市 フォトスタジオ',
            '新生児写真 スタジオ 沖縄',
            '赤ちゃん写真 沖縄',
        ],
        canonical: '/photographers/studios',
    },
    hundredDays: {
        title: '100日祝い・バースデーフォト・753撮影 - 沖縄県のおすすめスタジオ',
        description: '沖縄県内の100日祝い・バースデーフォト・753撮影におすすめのスタジオランキング。実績豊富なスタジオから最適な撮影場所を見つけられます。お宮参り、ハーフバースデー、1歳記念撮影にも対応。',
        keywords: [
            '沖縄 100日祝い',
            '沖縄 バースデーフォト',
            '沖縄 753',
            '沖縄 お宮参り',
            '那覇市 100日祝い',
            '記念写真 沖縄',
            '1歳記念 沖縄',
        ],
        canonical: '/100days',
    },
    register: {
        title: '写真家登録のお問い合わせ - 掲載プラン・料金',
        description: '沖縄ニューボーンフォト・ナビへの掲載をご希望の写真家・スタジオ様向けのお問い合わせページ。掲載プランや料金についてお気軽にご相談ください。ダイヤモンド、プラチナ、スタンダード、フリープランをご用意。',
        keywords: [
            '沖縄 写真家登録',
            'スタジオ掲載',
            '広告掲載 沖縄',
            'ニューボーンフォト 集客',
        ],
        canonical: '/register',
    },
};
