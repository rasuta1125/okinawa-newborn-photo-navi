import Script from 'next/script';

interface GoogleAnalyticsProps {
    gaId: string;
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    );
}

// イベントトラッキング用のヘルパー関数
export const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// よく使うイベント
export const analytics = {
    // 写真家カードクリック
    clickPhotographer: (photographerId: string, photographerName: string) => {
        trackEvent('click_photographer', 'engagement', `${photographerId}:${photographerName}`);
    },

    // 検索実行
    search: (filters: { area?: string; type?: string; options?: string[] }) => {
        trackEvent('search', 'engagement', JSON.stringify(filters));
    },

    // 問い合わせフォーム送信
    submitInquiry: (formType: string) => {
        trackEvent('submit_inquiry', 'conversion', formType);
    },

    // 電話番号クリック
    clickPhone: (photographerId: string) => {
        trackEvent('click_phone', 'conversion', photographerId);
    },

    // ウェブサイトクリック
    clickWebsite: (photographerId: string) => {
        trackEvent('click_website', 'engagement', photographerId);
    },
};
