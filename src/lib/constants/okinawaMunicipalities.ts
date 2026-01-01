// 沖縄県31市町村マスタデータ

import { OkinawaMunicipality } from '../types';

export const OKINAWA_MUNICIPALITIES: OkinawaMunicipality[] = [
    // 北部地域
    { id: 'nago', name: '名護市', region: 'North', displayOrder: 1 },
    { id: 'kunigami', name: '国頭村', region: 'North', displayOrder: 2 },
    { id: 'ogimi', name: '大宜味村', region: 'North', displayOrder: 3 },
    { id: 'higashi', name: '東村', region: 'North', displayOrder: 4 },
    { id: 'nakijin', name: '今帰仁村', region: 'North', displayOrder: 5 },
    { id: 'motobu', name: '本部町', region: 'North', displayOrder: 6 },
    { id: 'onna', name: '恩納村', region: 'North', displayOrder: 7 },
    { id: 'ginoza', name: '宜野座村', region: 'North', displayOrder: 8 },
    { id: 'kin', name: '金武町', region: 'North', displayOrder: 9 },
    { id: 'ie', name: '伊江村', region: 'North', displayOrder: 10 },

    // 中部地域
    { id: 'okinawa-city', name: '沖縄市', region: 'Central', displayOrder: 11 },
    { id: 'uruma', name: 'うるま市', region: 'Central', displayOrder: 12 },
    { id: 'ginowan', name: '宜野湾市', region: 'Central', displayOrder: 13 },
    { id: 'chatan', name: '北谷町', region: 'Central', displayOrder: 14 },
    { id: 'kadena', name: '嘉手納町', region: 'Central', displayOrder: 15 },
    { id: 'yomitan', name: '読谷村', region: 'Central', displayOrder: 16 },
    { id: 'kitanakagusuku', name: '北中城村', region: 'Central', displayOrder: 17 },
    { id: 'nakagusuku', name: '中城村', region: 'Central', displayOrder: 18 },

    // 南部地域
    { id: 'naha', name: '那覇市', region: 'South', displayOrder: 19 },
    { id: 'urasoe', name: '浦添市', region: 'South', displayOrder: 20 },
    { id: 'itoman', name: '糸満市', region: 'South', displayOrder: 21 },
    { id: 'tomigusuku', name: '豊見城市', region: 'South', displayOrder: 22 },
    { id: 'nanjo', name: '南城市', region: 'South', displayOrder: 23 },
    { id: 'nishihara', name: '西原町', region: 'South', displayOrder: 24 },
    { id: 'yonabaru', name: '与那原町', region: 'South', displayOrder: 25 },
    { id: 'haebaru', name: '南風原町', region: 'South', displayOrder: 26 },
    { id: 'yaese', name: '八重瀬町', region: 'South', displayOrder: 27 },
    { id: 'tokashiki', name: '渡嘉敷村', region: 'South', displayOrder: 28 },
    { id: 'zamami', name: '座間味村', region: 'South', displayOrder: 29 },
    { id: 'aguni', name: '粟国村', region: 'South', displayOrder: 30 },
    { id: 'tonaki', name: '渡名喜村', region: 'South', displayOrder: 31 },
    { id: 'minamidaito', name: '南大東村', region: 'South', displayOrder: 32 },
    { id: 'kitadaito', name: '北大東村', region: 'South', displayOrder: 33 },
    { id: 'kumejima', name: '久米島町', region: 'South', displayOrder: 34 },
];

// 地域別に市町村を取得
export function getMunicipalitiesByRegion(region: 'North' | 'Central' | 'South'): OkinawaMunicipality[] {
    return OKINAWA_MUNICIPALITIES.filter(m => m.region === region);
}

// すべての市町村名を取得
export function getAllMunicipalityNames(): string[] {
    return OKINAWA_MUNICIPALITIES.map(m => m.name);
}

// IDから市町村を取得
export function getMunicipalityById(id: string): OkinawaMunicipality | undefined {
    return OKINAWA_MUNICIPALITIES.find(m => m.id === id);
}

// 名前から市町村を取得
export function getMunicipalityByName(name: string): OkinawaMunicipality | undefined {
    return OKINAWA_MUNICIPALITIES.find(m => m.name === name);
}
