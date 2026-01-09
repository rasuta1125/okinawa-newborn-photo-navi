'use client';

import { useState } from 'react';
import { Review } from '@/lib/types';

interface ReviewFormProps {
    photographerId: string;
    onSubmitSuccess?: () => void;
}

export function ReviewForm({ photographerId, onSubmitSuccess }: ReviewFormProps) {
    const [customerName, setCustomerName] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    photographerId,
                    customerName,
                    rating,
                    comment,
                }),
            });

            if (response.ok) {
                setSubmitMessage('レビューを投稿しました。承認後に公開されます。');
                setCustomerName('');
                setRating(5);
                setComment('');
                if (onSubmitSuccess) {
                    onSubmitSuccess();
                }
            } else {
                setSubmitMessage('エラーが発生しました。もう一度お試しください。');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            setSubmitMessage('エラーが発生しました。もう一度お試しください。');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-[var(--primary)] mb-4">
                レビューを投稿する
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* お名前 */}
                <div>
                    <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                        お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
                        placeholder="山田 太郎"
                    />
                </div>

                {/* 星評価 */}
                <div>
                    <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                        評価 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="text-3xl transition-transform hover:scale-110 focus:outline-none"
                            >
                                <span
                                    className={
                                        star <= (hoveredRating || rating)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                    }
                                >
                                    ★
                                </span>
                            </button>
                        ))}
                        <span className="ml-2 text-[var(--primary)] self-center">
                            {rating}つ星
                        </span>
                    </div>
                </div>

                {/* コメント */}
                <div>
                    <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                        コメント <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        rows={5}
                        className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
                        placeholder="サービスの感想をお聞かせください..."
                    />
                </div>

                {/* 送信ボタン */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] text-white font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? '送信中...' : 'レビューを投稿'}
                </button>

                {/* メッセージ */}
                {submitMessage && (
                    <div
                        className={`p-4 rounded-lg ${submitMessage.includes('エラー')
                                ? 'bg-red-50 text-red-700'
                                : 'bg-green-50 text-green-700'
                            }`}
                    >
                        {submitMessage}
                    </div>
                )}
            </form>
        </div>
    );
}
