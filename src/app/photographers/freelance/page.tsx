'use client';

import { useState } from 'react';
import { getFreelancers, getAllAreas, getAllOptions } from '@/lib/services/photographerService';
import { PhotographerCard } from '@/components/PhotographerCard';

export default function FreelancePhotographersPage() {
    const [selectedArea, setSelectedArea] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const allPhotographers = getFreelancers('newborn');
    const areas = getAllAreas();
    const options = getAllOptions();

    // フィルタリング
    const filteredPhotographers = allPhotographers.filter(p => {
        if (selectedArea && !p.areas.includes(selectedArea)) return false;
        if (selectedOptions.length > 0 && !selectedOptions.some(opt => p.options.includes(opt))) return false;
        return true;
    });

    const toggleOption = (option: string) => {
        setSelectedOptions(prev =>
            prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
        );
    };

    return (
        <div className="min-h-screen bg-[var(--cream)]">
            {/* Header */}
            <div className="bg-white border-b border-stone-200">
                <div className="container-custom py-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        ニューボーンフォトグラファー
                    </h1>
                    <p className="text-[var(--primary-light)]">
                        フリーランスの写真家一覧 - {filteredPhotographers.length}件
                    </p>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                            <h2 className="text-lg font-bold text-[var(--primary)] mb-4">絞り込み</h2>

                            {/* Area Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                                    エリア
                                </label>
                                <select
                                    value={selectedArea}
                                    onChange={(e) => setSelectedArea(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)] text-sm"
                                >
                                    <option value="">すべて</option>
                                    {areas.map(area => (
                                        <option key={area} value={area}>{area}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Options Filter */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                                    オプション
                                </label>
                                <div className="space-y-2">
                                    {options.slice(0, 6).map(option => (
                                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedOptions.includes(option)}
                                                onChange={() => toggleOption(option)}
                                                className="rounded border-stone-300 text-[var(--accent-dark)] focus:ring-[var(--accent-dark)]"
                                            />
                                            <span className="text-sm text-[var(--primary)]">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Reset Button */}
                            {(selectedArea || selectedOptions.length > 0) && (
                                <button
                                    onClick={() => {
                                        setSelectedArea('');
                                        setSelectedOptions([]);
                                    }}
                                    className="mt-4 w-full text-sm text-[var(--accent-dark)] hover:underline"
                                >
                                    フィルターをリセット
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {filteredPhotographers.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                                <p className="text-[var(--primary-light)] text-lg">
                                    条件に一致する写真家が見つかりませんでした。
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredPhotographers.map((photographer, index) => (
                                    <div
                                        key={photographer.id}
                                        className="animate-slide-up"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <PhotographerCard photographer={photographer} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
