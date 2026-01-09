'use client';

import { useState, useEffect } from 'react';
import { ReviewForm } from '@/components/ReviewForm';
import { ReviewList } from '@/components/ReviewList';
import { Review } from '@/lib/types';

interface ReviewSectionProps {
    photographerId: string;
}

export function ReviewSection({ photographerId }: ReviewSectionProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const loadReviews = async () => {
        try {
            const response = await fetch(`/api/reviews?photographerId=${photographerId}`);
            if (response.ok) {
                const data = await response.json();
                setReviews(data.reviews || []);
            }
        } catch (error) {
            console.error('Error loading reviews:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadReviews();
    }, [photographerId]);

    const handleReviewSubmitted = () => {
        setShowForm(false);
        // レビューは承認待ちなので、すぐには表示されない
    };

    // 平均評価を計算
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : '0.0';

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 animate-slide-up" style={{ animationDelay: '250ms' }}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--primary)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        お客様の声
                    </h2>
                    {reviews.length > 0 && (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`text-xl ${star <= Math.round(Number(averageRating))
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="text-lg font-bold text-[var(--primary)]">
                                {averageRating}
                            </span>
                            <span className="text-sm text-[var(--primary-light)]">
                                ({reviews.length}件のレビュー)
                            </span>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn btn-primary"
                >
                    {showForm ? 'キャンセル' : 'レビューを書く'}
                </button>
            </div>

            {/* レビュー投稿フォーム */}
            {showForm && (
                <div className="mb-6">
                    <ReviewForm
                        photographerId={photographerId}
                        onSubmitSuccess={handleReviewSubmitted}
                    />
                </div>
            )}

            {/* レビュー一覧 */}
            {isLoading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-dark)]"></div>
                </div>
            ) : (
                <ReviewList reviews={reviews} />
            )}
        </div>
    );
}
