import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: '沖縄ニューボーンフォト・ナビ',
        short_name: 'フォトナビ',
        description: '沖縄県内のニューボーンフォト専門家マッチングポータル',
        start_url: '/',
        display: 'standalone',
        background_color: '#FFF8F0',
        theme_color: '#FF9500',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
