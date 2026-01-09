'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllAreas, getAllOptions } from '@/lib/services/photographerService';
import { PhotographerType } from '@/lib/types';

export function SearchWidget() {
    const router = useRouter();
    const [area, setArea] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [type, setType] = useState<PhotographerType | ''>('');
    const [areas, setAreas] = useState<string[]>([]);
    const [allOptions, setAllOptions] = useState<string[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const [areasData, optionsData] = await Promise.all([
                    getAllAreas(),
                    getAllOptions()
                ]);
                setAreas(areasData);
                setAllOptions(optionsData);
            } catch (error) {
                console.error('Error loading search data:', error);
            }
        }
        loadData();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (area) params.set('area', area);
        if (options.length > 0) params.set('options', options.join(','));
        if (type) params.set('type', type);

        router.push(`/search?${params.toString()}`);
    };

    const toggleOption = (option: string) => {
        setOptions(prev =>
            prev.includes(option)
                ? prev.filter(o => o !== option)
                : [...prev, option]
        );
    };

    return (
        <section className="section bg-white">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            写真家を探す
                        </h2>
                        <p className="text-[var(--primary-light)]">
                            エリアや条件から、あなたにぴったりの写真家を見つけましょう
                        </p>
                    </div>

                    <form onSubmit={handleSearch} className="card p-6 md:p-8 animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Area Select */}
                            <div>
                                <label htmlFor="area" className="block text-sm font-medium text-[var(--primary)] mb-2">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[var(--accent-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        エリア
                                    </span>
                                </label>
                                <select
                                    id="area"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)] focus:border-transparent transition-all cursor-pointer"
                                >
                                    <option value="">すべてのエリア</option>
                                    {areas.map(a => (
                                        <option key={a} value={a}>{a}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Type Select */}
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-[var(--primary)] mb-2">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[var(--accent-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        タイプ
                                    </span>
                                </label>
                                <select
                                    id="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value as PhotographerType | '')}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)] focus:border-transparent transition-all cursor-pointer"
                                >
                                    <option value="">すべてのタイプ</option>
                                    <option value="Studio">スタジオ</option>
                                    <option value="Freelance">フリーランス</option>
                                </select>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-[var(--primary)] mb-3">
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[var(--accent-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    オプション（複数選択可）
                                </span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {allOptions.map(option => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => toggleOption(option)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${options.includes(option)
                                            ? 'bg-[var(--accent-dark)] text-white shadow-md'
                                            : 'bg-[var(--beige)] text-[var(--primary)] hover:bg-[var(--sand)]'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full text-lg py-4"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            検索する
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
