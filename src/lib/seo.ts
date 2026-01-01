import { Metadata } from 'next';

interface SEOConfig {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    canonical?: string;
}

const SITE_NAME = '沖縄ニューボーンフォト・ナビ';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

export function generateMetadata(config: SEOConfig): Metadata {
    const {
        title,
        description,
        keywords = [],
        ogImage = DEFAULT_OG_IMAGE,
        canonical,
    } = config;

    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
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
        alternates: {
            canonical: url,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

// ページ別のSEO設定
export const SEO_CONFIGS = {
    home: {
        title: '沖縄県の新生児写真撮影マッチングポータル',
        description: '沖縄県内の信頼できるニューボーンフォト・新生児写真の専門家を見つけられるマッチングサイト。スタジオ・フリーランスカメラマンの比較、料金プラン、口コミ評価から最適な写真家を選べます。',
        keywords: [
            '沖縄',
            'ニューボーンフォト',
            '新生児写真',
            '赤ちゃん写真',
            '写真スタジオ',
            'フリーランスカメラマン',
            '出張撮影',
            '100日祝い',
            'バースデーフォト',
            '753',
        ],
        canonical: '/',
    },
    freelance: {
        title: 'ニューボーンフォトグラファー一覧',
        description: '沖縄県内のニューボーンフォト専門フリーランスカメラマン一覧。出張撮影対応、料金プラン、撮影実績から最適なカメラマンを見つけられます。',
        keywords: [
            '沖縄',
            'ニューボーンフォト',
            'フリーランス',
            'カメラマン',
            '出張撮影',
            '新生児写真',
        ],
        canonical: '/photographers/freelance',
    },
    studios: {
        title: 'ニューボーンスタジオ一覧',
        description: '沖縄県内のニューボーンフォト専門スタジオ一覧。設備充実、衣装レンタル、料金プラン、口コミ評価から最適なスタジオを見つけられます。',
        keywords: [
            '沖縄',
            'ニューボーンフォト',
            'スタジオ',
            '写真スタジオ',
            '新生児写真',
            '赤ちゃん写真',
        ],
        canonical: '/photographers/studios',
    },
    hundredDays: {
        title: '100日以降のおすすめスタジオ',
        description: '沖縄県内の100日祝い・バースデーフォト・753撮影におすすめのスタジオランキング。実績豊富なスタジオから最適な撮影場所を見つけられます。',
        keywords: [
            '沖縄',
            '100日祝い',
            'バースデーフォト',
            '753',
            '写真スタジオ',
            '記念写真',
        ],
        canonical: '/100days',
    },
    register: {
        title: '写真家登録のお問い合わせ',
        description: '沖縄ニューボーンフォト・ナビへの掲載をご希望の写真家・スタジオ様向けのお問い合わせページ。掲載プランや料金についてお気軽にご相談ください。',
        keywords: [
            '沖縄',
            'ニューボーンフォト',
            '写真家登録',
            'スタジオ掲載',
            '広告掲載',
        ],
        canonical: '/register',
    },
};
