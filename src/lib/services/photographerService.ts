// Service functions for photographer data

import { Photographer, SearchFilters, PhotographerType } from '../types';
import {
    getAllPhotographers,
    searchPhotographers as searchInFirestore
} from '../repositories/photographerRepository';
import { MEMBERSHIP_TIERS } from '../constants/membershipTiers';

// Re-export repository functions
export { getAllPhotographers } from '../repositories/photographerRepository';

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

        // ランク別優先度
        const priorityA = MEMBERSHIP_TIERS[a.membershipRank].displayPriority;
        const priorityB = MEMBERSHIP_TIERS[b.membershipRank].displayPriority;
        return priorityB - priorityA;
    });
}

/**
 * ニューボーンフォトグラファー取得
 */
export async function getNewbornPhotographers(): Promise<Photographer[]> {
    const approved = await getAllPhotographers();
    const filtered = approved.filter((p: Photographer) => p.options.includes('ニューボーン'));
    return sortPhotographersForNewborn(filtered);
}

/**
 * ニューボーンスタジオ取得
 */
export async function getNewbornStudios(): Promise<Photographer[]> {
    const approved = await getAllPhotographers();
    return approved.filter((p: Photographer) =>
        p.photographerType === 'Studio' && p.options.includes('ニューボーン')
    );
}

/**
 * 100日祝い写真家取得
 */
export async function get100DaysPhotographers(): Promise<Photographer[]> {
    const approved = await getAllPhotographers();
    const filtered = approved.filter((p: Photographer) => p.options.includes('100日祝い'));
    return sortPhotographersFor100Days(filtered);
}

/**
 * バースデーフォト写真家取得
 */
export async function getBirthdayPhotographers(): Promise<Photographer[]> {
    const approved = await getAllPhotographers();
    return approved.filter((p: Photographer) => p.options.includes('バースデーフォト'));
}

/**
 * 753写真家取得
 */
export async function get753Photographers(): Promise<Photographer[]> {
    const approved = await getAllPhotographers();
    return approved.filter((p: Photographer) => p.options.includes('753'));
}

/**
 * 写真家検索
 */
export async function searchPhotographers(filters: SearchFilters): Promise<Photographer[]> {
    return await searchInFirestore(filters);
}

/**
 * エリア別写真家取得
 */
export async function getPhotographersByArea(area: string): Promise<Photographer[]> {
    const approved = await getAllPhotographers();
    return approved.filter((p: Photographer) => p.areas.includes(area));
}

/**
 * 管理者用：全写真家取得（承認状態・公開状態問わず）
 */
export function getAllPhotographersForAdmin(): Photographer[] {
    // This function is kept for backward compatibility but should not be used
    // Use the repository function directly instead
    return [];
}

/**
 * 管理者用：承認待ち写真家取得
 */
export function getPendingPhotographers(): Photographer[] {
    // This function is kept for backward compatibility but should not be used
    // Use the repository function directly instead
    return [];
}

/**
 * ID指定で写真家取得
 */
export async function getPhotographerById(id: string): Promise<Photographer | null> {
    const approved = await getAllPhotographers();
    return approved.find((p: Photographer) => p.id === id) || null;
}

/**
 * 全エリア取得
 */
export async function getAllAreas(): Promise<string[]> {
    const approved = await getAllPhotographers();
    const areasSet = new Set<string>();
    approved.forEach((p: Photographer) => {
        p.areas.forEach((area: string) => areasSet.add(area));
    });
    return Array.from(areasSet).sort();
}

/**
 * 全オプション取得
 */
export async function getAllOptions(): Promise<string[]> {
    const approved = await getAllPhotographers();
    const optionsSet = new Set<string>();
    approved.forEach((p: Photographer) => {
        p.options.forEach((option: string) => optionsSet.add(option));
    });
    return Array.from(optionsSet).sort();
}

/**
 * 注目の写真家取得（ランクの高い写真家を優先）
 */
export async function getFeaturedPhotographers(limit: number = 6): Promise<Photographer[]> {
    const approved = await getAllPhotographers();
    const sorted = sortPhotographersForNewborn(approved);
    return sorted.slice(0, limit);
}

/**
 * フリーランス写真家取得
 */
export async function getFreelancers(): Promise<Photographer[]> {
    const approved = await getAllPhotographers();
    return approved.filter((p: Photographer) => p.photographerType === 'Freelance');
}

/**
 * スタジオ写真家取得
 */
export async function getStudios(): Promise<Photographer[]> {
    const approved = await getAllPhotographers();
    return approved.filter((p: Photographer) => p.photographerType === 'Studio');
}
