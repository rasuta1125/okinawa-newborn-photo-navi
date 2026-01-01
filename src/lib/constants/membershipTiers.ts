// 会員ランク定義

import { MembershipTier, MembershipRank } from '../types';

export const MEMBERSHIP_TIERS: Record<MembershipRank, MembershipTier> = {
    Diamond: {
        rank: 'Diamond',
        monthlyFee: 50000,
        displayPriority: 4,
        maxGalleryImages: 5, // 課金枠: 5枚
        allowSnsLinks: true,
        description: 'ダイヤモンド会員 - 指定席1-5位、写真5枚、SNS・Web掲載可',
    },
    Platinum: {
        rank: 'Platinum',
        monthlyFee: 30000,
        displayPriority: 3,
        maxGalleryImages: 5, // 課金枠: 5枚
        allowSnsLinks: true,
        description: 'プラチナ会員 - 2ページ目最上部、写真5枚、SNS・Web掲載可',
    },
    Standard: {
        rank: 'Standard',
        monthlyFee: 10000,
        displayPriority: 2,
        maxGalleryImages: 5, // 課金枠: 5枚
        allowSnsLinks: true,
        description: 'スタンダード会員 - 写真5枚、SNS・Web掲載可',
    },
    Free: {
        rank: 'Free',
        monthlyFee: 0,
        displayPriority: 1,
        maxGalleryImages: 2, // 無料枠: 2枚
        allowSnsLinks: false,
        description: 'フリー会員 - 写真2枚、SNS・Web掲載不可',
    },
};

// ダイヤモンド指定席の料金
export const DIAMOND_POSITION_FEES: Record<number, number> = {
    1: 50000,
    2: 40000,
    3: 30000,
    4: 30000,
    5: 20000,
};

// ランクの表示名
export const RANK_DISPLAY_NAMES: Record<string, string> = {
    Diamond: 'ダイヤモンド',
    Platinum: 'プラチナ',
    Standard: 'スタンダード',
    Free: 'フリー',
};

// ランクのアイコン
export const RANK_ICONS: Record<string, string> = {
    Diamond: '💎',
    Platinum: '⭐',
    Standard: '✨',
    Free: '📝',
};
