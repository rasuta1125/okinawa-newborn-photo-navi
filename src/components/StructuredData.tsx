import { Photographer } from '@/lib/types';

interface StructuredDataProps {
    type: 'website' | 'organization' | 'photographer' | 'localBusiness';
    data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
    let structuredData = {};

    switch (type) {
        case 'website':
            structuredData = {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: '沖縄ニューボーンフォト・ナビ',
                url: 'https://okinawa-newborn-navi.com',
                description: '沖縄県内の信頼できるニューボーンフォト・新生児写真の専門家を見つけられるマッチングサイト',
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: 'https://okinawa-newborn-navi.com/search?q={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                },
            };
            break;

        case 'organization':
            structuredData = {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: '沖縄ニューボーンフォト・ナビ',
                url: 'https://okinawa-newborn-navi.com',
                logo: 'https://okinawa-newborn-navi.com/images/logo.png',
                description: '沖縄県内のニューボーンフォト専門家のマッチングポータル',
                address: {
                    '@type': 'PostalAddress',
                    addressRegion: '沖縄県',
                    addressCountry: 'JP',
                },
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    email: 'newbornnavi@gmail.com',
                },
            };
            break;

        case 'photographer':
            if (data && data.photographer) {
                const photographer: Photographer = data.photographer;
                structuredData = {
                    '@context': 'https://schema.org',
                    '@type': photographer.photographerType === 'Studio' ? 'LocalBusiness' : 'ProfessionalService',
                    name: photographer.name,
                    image: photographer.profileImage,
                    description: photographer.description,
                    address: {
                        '@type': 'PostalAddress',
                        addressLocality: photographer.areas.join(', '),
                        addressRegion: '沖縄県',
                        addressCountry: 'JP',
                    },
                    telephone: photographer.phone,
                    url: photographer.website,
                };
            }
            break;

        case 'localBusiness':
            structuredData = {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                '@id': 'https://okinawa-newborn-navi.com',
                name: '沖縄ニューボーンフォト・ナビ',
                image: 'https://okinawa-newborn-navi.com/images/og-default.jpg',
                description: '沖縄県内のニューボーンフォト専門家のマッチングポータル',
                address: {
                    '@type': 'PostalAddress',
                    addressRegion: '沖縄県',
                    addressCountry: 'JP',
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 26.2124,
                    longitude: 127.6809,
                },
                url: 'https://okinawa-newborn-navi.com',
                telephone: '',
                openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ],
                    opens: '00:00',
                    closes: '23:59',
                },
            };
            break;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
