'use client';

import { Review } from '@/lib/types';

interface ReviewListProps {
    reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
    if (reviews.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <p className="text-[var(--primary-light)]">
                    まだレビューがありません。最初のレビューを投稿してみませんか？
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                    {/* ヘッダー */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            {/* アバター */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center text-white font-bold">
                                {review.customerName.charAt(0)}
                            </div>

                            {/* 名前 */}
                            <div>
                                <p className="font-medium text-[var(--primary)]">
                                    {review.customerName}
                                </p>
                                <p className="text-xs text-[var(--primary-light)]">
                                    {new Date(review.createdAt).toLocaleDateString('ja-JP', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* 星評価 */}
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`text-lg ${star <= review.rating
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                >
                                    ★
                                </span>
                            ))}
                            <span className="ml-2 text-sm font-medium text-[var(--primary)]">
                                {review.rating}.0
                            </span>
                        </div>
                    </div>

                    {/* コメント */}
                    <p className="text-[var(--primary)] leading-relaxed">
                        {review.comment}
                    </p>
                </div>
            ))}
        </div>
    );
}
