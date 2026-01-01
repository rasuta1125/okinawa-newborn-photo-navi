// Mock data for 沖縄ニューボーンフォト・ナビ

import { Photographer, Plan, Blog } from './types';

export const photographers: Photographer[] = [
    // ダイヤモンド会員（指定席1位） - 5万円
    {
        id: 'macaroni',
        name: 'マカロニスタジオ',
        photographerType: 'Studio',
        membershipRank: 'Diamond',
        diamondPosition: 1,
        fixedRanking100Days: 1, // 100日記念で固定1位
        areas: ['那覇市', '浦添市', '豊見城市'],
        options: ['衣装レンタル', 'データ当日渡し', '手形アート', '家族写真', '100日祝い'],
        handprintOption: true,
        description: '沖縄で最も人気のニューボーンフォトスタジオ。100日祝い・お食い初め撮影にも対応しています。',
        profileImage: '/images/photographers/macaroni-profile.jpg',
        coverImage: '/images/photographers/macaroni-cover.jpg',
        gallery: [
            '/images/gallery/macaroni-1.jpg',
            '/images/gallery/macaroni-2.jpg',
            '/images/gallery/macaroni-3.jpg',
        ],
        maxGalleryImages: 5, // ダイヤモンド: 5枚
        email: 'info@macaroni-studio.jp',
        phone: '098-111-1111',
        website: 'https://macaroni-studio.jp',
        snsLinks: {
            line: 'https://line.me/R/ti/p/@macaroni',
            instagram: 'https://instagram.com/macaroni_studio',
        },
        approvalStatus: 'Approved',
        isPublished: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-12-30'),
    },

    // ダイヤモンド会員（指定席2位） - 4万円
    {
        id: 'milmil',
        name: 'キッズスタジオミルミル',
        photographerType: 'Studio',
        membershipRank: 'Diamond',
        diamondPosition: 2,
        fixedRanking100Days: 2, // 100日記念で固定2位
        areas: ['那覇市', '宜野湾市', '浦添市'],
        options: ['衣装レンタル', 'データ当日渡し', '手形アート', '100日祝い', 'お宮参り'],
        handprintOption: true,
        description: 'お子様の成長記録を残す専門スタジオ。100日祝いからお宮参りまで幅広く対応。',
        profileImage: '/images/photographers/milmil-profile.jpg',
        coverImage: '/images/photographers/milmil-cover.jpg',
        gallery: [
            '/images/gallery/milmil-1.jpg',
            '/images/gallery/milmil-2.jpg',
            '/images/gallery/milmil-3.jpg',
            '/images/gallery/milmil-4.jpg',
        ],
        maxGalleryImages: 5, // ダイヤモンド: 5枚
        email: 'info@milmil.jp',
        phone: '098-222-2222',
        website: 'https://milmil.jp',
        snsLinks: {
            line: 'https://line.me/R/ti/p/@milmil',
            instagram: 'https://instagram.com/milmil_studio',
            facebook: 'https://facebook.com/milmil.studio',
        },
        approvalStatus: 'Approved',
        isPublished: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-12-30'),
    },

    // ダイヤモンド会員（指定席3位） - 3万円
    {
        id: '1',
        name: 'Baby Smile Studio',
        photographerType: 'Studio',
        membershipRank: 'Diamond',
        diamondPosition: 3,
        areas: ['那覇市', '浦添市', '宜野湾市'],
        options: ['衣装レンタル', 'データ当日渡し', '手形アート', '家族写真'],
        handprintOption: true,
        description: '新生児専門のフォトスタジオ。温かみのある自然光スタジオで、赤ちゃんの自然な表情を引き出します。',
        profileImage: '/images/photographers/baby-smile-profile.jpg',
        coverImage: '/images/photographers/baby-smile-cover.jpg',
        gallery: [
            '/images/gallery/baby-smile-1.jpg',
            '/images/gallery/baby-smile-2.jpg',
            '/images/gallery/baby-smile-3.jpg',
        ],
        maxGalleryImages: 5, // ダイヤモンド: 5枚
        email: 'info@babysmile.jp',
        phone: '098-123-4567',
        website: 'https://babysmile.jp',
        snsLinks: {
            line: 'https://line.me/R/ti/p/@babysmile',
            instagram: 'https://instagram.com/babysmile_studio',
        },
        approvalStatus: 'Approved',
        isPublished: true,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-12-30'),
    },

    // プラチナ会員
    {
        id: '2',
        name: 'Little Angels Photography',
        photographerType: 'Freelance',
        membershipRank: 'Platinum',
        areas: ['沖縄市', '北谷町', '読谷村'],
        options: ['出張撮影', 'データ当日渡し', '手形アート'],
        handprintOption: true,
        description: 'ご自宅での出張撮影を得意としています。赤ちゃんがリラックスできる環境で撮影します。',
        profileImage: '/images/photographers/little-angels-profile.jpg',
        coverImage: '/images/photographers/little-angels-cover.jpg',
        gallery: [
            '/images/gallery/little-angels-1.jpg',
            '/images/gallery/little-angels-2.jpg',
            '/images/gallery/little-angels-3.jpg',
        ],
        maxGalleryImages: 5, // プラチナ: 5枚
        email: 'contact@littleangels.jp',
        phone: '098-234-5678',
        snsLinks: {
            instagram: 'https://instagram.com/little_angels_photo',
        },
        approvalStatus: 'Approved',
        isPublished: true,
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-12-30'),
    },

    // スタンダード会員
    {
        id: '3',
        name: 'Sweet Dreams Photo',
        photographerType: 'Studio',
        membershipRank: 'Standard',
        areas: ['那覇市', '豊見城市'],
        options: ['衣装レンタル', '家族写真', 'ペット同伴可'],
        handprintOption: false,
        description: 'アットホームな雰囲気のスタジオ。家族全員での撮影も大歓迎です。',
        profileImage: '/images/photographers/sweet-dreams-profile.jpg',
        coverImage: '/images/photographers/sweet-dreams-cover.jpg',
        gallery: [
            '/images/gallery/sweet-dreams-1.jpg',
            '/images/gallery/sweet-dreams-2.jpg',
        ],
        maxGalleryImages: 5, // スタンダード: 5枚
        email: 'info@sweetdreams.jp',
        phone: '098-345-6789',
        snsLinks: {
            line: 'https://line.me/R/ti/p/@sweetdreams',
        },
        approvalStatus: 'Approved',
        isPublished: true,
        createdAt: new Date('2024-04-01'),
        updatedAt: new Date('2024-12-30'),
    },

    {
        id: '4',
        name: 'Precious Moments',
        photographerType: 'Freelance',
        membershipRank: 'Standard',
        areas: ['名護市', '本部町'],
        options: ['出張撮影', 'データ当日渡し', '手形アート', '衣装レンタル'],
        handprintOption: true,
        description: '北部エリア専門のフォトグラファー。自然豊かなロケーションでの撮影も可能です。',
        profileImage: '/images/photographers/precious-moments-profile.jpg',
        coverImage: '/images/photographers/precious-moments-cover.jpg',
        gallery: [
            '/images/gallery/precious-moments-1.jpg',
            '/images/gallery/precious-moments-2.jpg',
        ],
        maxGalleryImages: 10,
        email: 'info@preciousmoments.jp',
        phone: '098-456-7890',
        snsLinks: {
            instagram: 'https://instagram.com/precious_moments_okinawa',
        },
        approvalStatus: 'Approved',
        isPublished: true,
        createdAt: new Date('2024-05-01'),
        updatedAt: new Date('2024-12-30'),
    },

    {
        id: '5',
        name: 'Tiny Toes Studio',
        photographerType: 'Studio',
        membershipRank: 'Standard',
        areas: ['浦添市', '宜野湾市'],
        options: ['衣装レンタル', '家族写真'],
        handprintOption: false,
        description: 'かわいい小物や衣装が豊富なスタジオ。記念に残る一枚を撮影します。',
        profileImage: '/images/photographers/tiny-toes-profile.jpg',
        coverImage: '/images/photographers/tiny-toes-cover.jpg',
        gallery: [
            '/images/gallery/tiny-toes-1.jpg',
            '/images/gallery/tiny-toes-2.jpg',
        ],
        maxGalleryImages: 10,
        email: 'info@tinytoes.jp',
        phone: '098-567-8901',
        snsLinks: {
            line: 'https://line.me/R/ti/p/@tinytoes',
        },
        approvalStatus: 'Approved',
        isPublished: true,
        createdAt: new Date('2024-06-01'),
        updatedAt: new Date('2024-12-30'),
    },

    // フリー会員（SNSリンクなし）
    {
        id: '6',
        name: 'Newborn Memories',
        photographerType: 'Freelance',
        membershipRank: 'Free',
        areas: ['那覇市'],
        options: ['出張撮影'],
        handprintOption: false,
        description: '新米ママ・パパに優しい価格設定。出張撮影専門です。',
        profileImage: '/images/photographers/newborn-memories-profile.jpg',
        coverImage: '/images/photographers/newborn-memories-cover.jpg',
        gallery: [
            '/images/gallery/newborn-memories-1.jpg',
        ],
        maxGalleryImages: 2, // フリー: 2枚
        email: 'info@newbornmemories.jp',
        phone: '098-678-9012',
        // SNSリンクなし（フリー会員）
        approvalStatus: 'Approved',
        isPublished: true,
        createdAt: new Date('2024-07-01'),
        updatedAt: new Date('2024-12-30'),
    },

    {
        id: '7',
        name: 'Cherish Photo Studio',
        photographerType: 'Studio',
        membershipRank: 'Free',
        areas: ['豊見城市', '糸満市'],
        options: ['衣装レンタル', '家族写真'],
        handprintOption: false,
        description: '南部エリアのアットホームなスタジオ。リーズナブルな価格が魅力です。',
        profileImage: '/images/photographers/cherish-profile.jpg',
        coverImage: '/images/photographers/cherish-cover.jpg',
        gallery: [
            '/images/gallery/cherish-1.jpg',
        ],
        maxGalleryImages: 2, // フリー: 2枚
        email: 'info@cherish.jp',
        phone: '098-901-2345',
        approvalStatus: 'Approved',
        isPublished: true,
        createdAt: new Date('2024-08-01'),
        updatedAt: new Date('2024-12-30'),
    },

    // 承認待ち（非公開）
    {
        id: '8',
        name: 'Angel Wings Photography',
        photographerType: 'Studio',
        membershipRank: 'Platinum',
        areas: ['那覇市', '南風原町', '西原町'],
        options: ['衣装レンタル', 'データ当日渡し', '手形アート', '家族写真', 'マタニティフォト'],
        handprintOption: true,
        description: 'マタニティから新生児、お宮参りまで一貫してサポート。成長記録を残せます。',
        profileImage: '/images/photographers/angel-wings-profile.jpg',
        coverImage: '/images/photographers/angel-wings-cover.jpg',
        gallery: [
            '/images/gallery/angel-wings-1.jpg',
            '/images/gallery/angel-wings-2.jpg',
        ],
        maxGalleryImages: -1,
        email: 'info@angelwings.jp',
        phone: '098-789-0123',
        website: 'https://angelwings.jp',
        snsLinks: {
            line: 'https://line.me/R/ti/p/@angelwings',
            instagram: 'https://instagram.com/angelwings_photo',
        },
        approvalStatus: 'Pending', // 承認待ち
        isPublished: false,
        createdAt: new Date('2024-12-29'),
        updatedAt: new Date('2024-12-29'),
    },
];

export const plans: Plan[] = [
    {
        id: 'p1',
        photographerId: 'macaroni',
        title: 'ニューボーンベーシックプラン',
        price: 25000,
        content: '新生児撮影の基本プラン。撮影時間約1時間、データ50枚お渡し。',
        features: ['撮影時間: 1時間', 'データ: 50枚', '衣装レンタル: 3着まで', 'レタッチ込み'],
    },
    {
        id: 'p2',
        photographerId: 'macaroni',
        title: '100日祝いプラン',
        price: 30000,
        content: '100日祝い・お食い初め撮影プラン。家族写真も含みます。',
        features: ['撮影時間: 1.5時間', 'データ: 70枚', '衣装レンタル: 無制限', '家族写真込み', 'レタッチ込み'],
    },
    {
        id: 'p3',
        photographerId: 'milmil',
        title: '100日記念フルパッケージ',
        price: 35000,
        content: '100日祝いの完全パッケージ。手形アートとアルバム付き。',
        features: ['撮影時間: 2時間', 'データ: 100枚', '手形アート制作', 'アルバム付き', 'レタッチ込み'],
    },
    {
        id: 'p4',
        photographerId: '1',
        title: 'ニューボーンプレミアムプラン',
        price: 45000,
        content: '手形アート付きの充実プラン。撮影時間約2時間、データ100枚お渡し。',
        features: ['撮影時間: 2時間', 'データ: 100枚', '衣装レンタル: 無制限', '手形アート制作', 'レタッチ込み', 'アルバム付き'],
    },
];

export const blogs: Blog[] = [
    {
        id: 'b1',
        photographerId: 'macaroni',
        title: '新生児撮影のベストタイミングは？生後何日目がおすすめ？',
        excerpt: '新生児撮影に最適な時期について、プロのフォトグラファーが解説します。',
        body: '新生児撮影は生後5〜14日目がベストタイミングです。この時期の赤ちゃんは...',
        coverImage: '/images/blogs/timing-cover.jpg',
        publishedAt: new Date('2024-12-15'),
        tags: ['撮影のコツ', 'タイミング', '新生児'],
    },
    {
        id: 'b2',
        photographerId: 'milmil',
        title: '100日祝いの撮影、何を準備すればいい？',
        excerpt: '100日祝い・お食い初めの撮影準備について詳しく解説します。',
        body: '100日祝いの撮影では、お食い初めの食器や衣装の準備が大切です...',
        coverImage: '/images/blogs/100days-cover.jpg',
        publishedAt: new Date('2024-12-20'),
        tags: ['100日祝い', 'お食い初め', '準備'],
    },
    {
        id: 'b3',
        photographerId: '2',
        title: '自宅での新生児撮影、準備しておくべきこと',
        excerpt: '出張撮影をスムーズに進めるための準備リストをご紹介します。',
        body: '出張撮影の前に準備しておくと良いことをまとめました。まず、室温は...',
        coverImage: '/images/blogs/preparation-cover.jpg',
        publishedAt: new Date('2024-12-10'),
        tags: ['出張撮影', '準備', '自宅撮影'],
    },
];
