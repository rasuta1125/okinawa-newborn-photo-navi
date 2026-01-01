// Service functions for photographer data

import { Photographer, SearchFilters, PhotographerType } from '../types';
import { photographers } from '../mockData';
import { MEMBERSHIP_TIERS } from '../constants/membershipTiers';

/**
 * 承認済み・公開中の写真家のみ取得
 */
function getApprovedPhotographers(): Photographer[] {
    return photographers.filter(
        p => p.approvalStatus === 'Approved' && p.isPublished
    );
}

/**
 * ニューボーンフォト用のソート（ランク別表示順位）
 */
export function sortPhotographersForNewborn(photographers: Photographer[]): Photographer[] {
    return [...photographers].sort((a, b) => {
        // 1. ダイヤモンド会員の指定席優先
        if (a.membershipRank === 'Diamond' && a.diamondPosition) {
            if (b.membershipRank === 'Diamond' && b.diamondPosition) {
                return a.diamondPosition - b.diamondPosition;
            }
            return -1; // aが優先
        }
        if (b.membershipRank === 'Diamond' && b.diamondPosition) {
            return 1; // bが優先
        }

        // 2. ランク別優先度
        const priorityA = MEMBERSHIP_TIERS[a.membershipRank].displayPriority;
        const priorityB = MEMBERSHIP_TIERS[b.membershipRank].displayPriority;

        const priorityDiff = priorityB - priorityA;
        if (priorityDiff !== 0) return priorityDiff;

        // 3. 同ランク内は名前順
        return a.name.localeCompare(b.name, 'ja');
    });
}

/**
 * 100日記念用のソート（固定ランキング優先）
 */
export function sortPhotographersFor100Days(photographers: Photographer[]): Photographer[] {
    return [...photographers].sort((a, b) => {
        // 固定ランキング優先
        if (a.fixedRanking100Days && b.fixedRanking100Days) {
            return a.fixedRanking100Days - b.fixedRanking100Days;
        }
        if (a.fixedRanking100Days) return -1;
        if (b.fixedRanking100Days) return 1;

        // その他は通常のランク順
        const sortedNormal = sortPhotographersForNewborn([a, b]);
        return sortedNormal[0] === a ? -1 : 1;
    });
}

/**
 * すべての写真家を取得（ランク順）
 */
export function getAllPhotographers(section?: 'newborn' | '100days'): Photographer[] {
    const approved = getApprovedPhotographers();

    if (section === '100days') {
        return sortPhotographersFor100Days(approved);
    }

    return sortPhotographersForNewborn(approved);
}

/**
 * 写真家をIDで取得
 */
export function getPhotographerById(id: string): Photographer | undefined {
    return photographers.find(p => p.id === id);
}

/**
 * 写真家を検索（フィルター適用）
 */
export function searchPhotographers(filters: SearchFilters): Photographer[] {
    let results = getApprovedPhotographers();

    // エリアフィルター
    if (filters.area) {
        results = results.filter(p => p.areas.includes(filters.area!));
    }

    // オプションフィルター
    if (filters.options && filters.options.length > 0) {
        results = results.filter(p =>
            filters.options!.some(option => p.options.includes(option))
        );
    }

    // 写真家タイプフィルター
    if (filters.photographerType) {
        results = results.filter(p => p.photographerType === filters.photographerType);
    }

    // セクション別ソート
    if (filters.section === '100days') {
        return sortPhotographersFor100Days(results);
    }

    return sortPhotographersForNewborn(results);
}

/**
 * 注目の写真家を取得（トップN件）
 */
export function getFeaturedPhotographers(limit: number = 6, section?: 'newborn' | '100days'): Photographer[] {
    const sorted = getAllPhotographers(section);
    return sorted.slice(0, limit);
}

/**
 * スタジオのみ取得
 */
export function getStudios(section?: 'newborn' | '100days'): Photographer[] {
    const approved = getApprovedPhotographers();
    const studios = approved.filter(p => p.photographerType === 'Studio');

    if (section === '100days') {
        return sortPhotographersFor100Days(studios);
    }

    return sortPhotographersForNewborn(studios);
}

/**
 * フリーランスのみ取得
 */
export function getFreelancers(section?: 'newborn' | '100days'): Photographer[] {
    const approved = getApprovedPhotographers();
    const freelancers = approved.filter(p => p.photographerType === 'Freelance');

    if (section === '100days') {
        return sortPhotographersFor100Days(freelancers);
    }

    return sortPhotographersForNewborn(freelancers);
}

/**
 * すべてのエリアを取得
 */
export function getAllAreas(): string[] {
    const areasSet = new Set<string>();
    photographers.forEach(p => {
        p.areas.forEach(area => areasSet.add(area));
    });
    return Array.from(areasSet).sort();
}

/**
 * すべてのオプションを取得
 */
export function getAllOptions(): string[] {
    return ['ニューボーン', '出張撮影', '100日祝い', 'バースデーフォト', '753'];
}

/**
 * 承認待ちの写真家を取得（管理画面用）
 */
export function getPendingPhotographers(): Photographer[] {
    return photographers.filter(p => p.approvalStatus === 'Pending');
}

/**
 * すべての写真家を取得（管理画面用）
 */
export function getAllPhotographersForAdmin(): Photographer[] {
    return photographers;
}
