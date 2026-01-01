import Link from 'next/link';
import { Photographer } from '@/lib/types';
import { RANK_DISPLAY_NAMES, RANK_ICONS } from '@/lib/constants/membershipTiers';

interface PhotographerCardProps {
    photographer: Photographer;
}

export function PhotographerCard({ photographer }: PhotographerCardProps) {
    const rankBadgeClass = {
        Diamond: 'bg-gradient-to-r from-purple-600 to-purple-800 text-white',
        Platinum: 'bg-gradient-to-r from-blue-500 to-blue-700 text-white',
        Standard: 'bg-gradient-to-r from-gray-500 to-gray-700 text-white',
        Free: 'bg-gray-200 text-gray-700',
    };

    const badgeClass = rankBadgeClass[photographer.membershipRank];
    const badgeLabel = RANK_DISPLAY_NAMES[photographer.membershipRank];
    const badgeIcon = RANK_ICONS[photographer.membershipRank];

    return (
        <Link href={`/photographers/${photographer.id}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col">
                {/* Image */}
                <div className="relative h-56 bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300">
                        📸
                    </div>
                    {/* Rank Badge */}
                    <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${badgeClass}`}>
                            {badgeIcon} {badgeLabel}
                        </span>
                    </div>
                    {/* Orange Accent Badge (Photorait style) */}
                    {photographer.membershipRank !== 'Free' && (
                        <div className="absolute bottom-3 left-3">
                            <span className="px-3 py-1 bg-[#FF9500] text-white text-xs font-semibold rounded-md shadow-md">
                                オンライン相談OK
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                    {/* Name and Type */}
                    <div className="mb-3">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#FF9500] transition-colors line-clamp-1">
                            {photographer.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{photographer.photographerType === 'Studio' ? '🏢 スタジオ' : '👤 フリーランス'}</span>
                        </div>
                    </div>

                    {/* Rating Stars (Photorait style) */}
                    <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-4 h-4 text-[#FFB84D] fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        ))}
                        <span className="text-sm text-gray-600 ml-1">5.0</span>
                    </div>

                    {/* Areas */}
                    <div className="mb-3">
                        <div className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-[#FF9500] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm text-gray-600">
                                {photographer.areas.slice(0, 2).join('、')}
                                {photographer.areas.length > 2 && ` 他${photographer.areas.length - 2}件`}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                        {photographer.description}
                    </p>

                    {/* Options Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {photographer.options.slice(0, 3).map(option => (
                            <span
                                key={option}
                                className="px-2.5 py-1 bg-orange-50 text-[#FF9500] text-xs font-medium rounded-md border border-orange-200"
                            >
                                {option}
                            </span>
                        ))}
                        {photographer.options.length > 3 && (
                            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                                +{photographer.options.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Price Range (placeholder) */}
                    <div className="pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">料金目安</span>
                            <span className="text-lg font-bold text-[#FF9500]">¥25,000〜</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
