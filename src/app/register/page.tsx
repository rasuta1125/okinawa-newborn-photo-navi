'use client';

import { useState } from 'react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Studio' as 'Studio' | 'Freelance',
        email: '',
        areas: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // モックモード: 実際のメール送信はFirebase Functions等で実装
        try {
            // ここで実際にはメール送信APIを呼び出す
            console.log('送信データ:', formData);
            console.log('送信先: kaito_masu@aimable00.com, yuto_sakaguchi@aimable00.com');

            // モック成功
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setFormData({
                name: '',
                type: 'Studio',
                email: '',
                areas: '',
                message: '',
            });
        } catch (error) {
            console.error('送信エラー:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                        掲載のお問い合わせ
                    </h1>
                    <p className="text-gray-600 text-center text-lg max-w-2xl mx-auto">
                        沖縄ニューボーンフォト・ナビへの掲載をご希望の写真家・スタジオ様は、<br />
                        以下のフォームよりお問い合わせください。
                    </p>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Info Card */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                        <h2 className="text-lg font-bold text-blue-900 mb-3">📋 お申し込みの流れ</h2>
                        <ol className="space-y-2 text-blue-800">
                            <li className="flex gap-3">
                                <span className="font-bold">1.</span>
                                <span>下記フォームに必要事項をご記入の上、送信してください</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold">2.</span>
                                <span>弊社担当者より、プラン詳細・料金のご案内をメールにてお送りいたします</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold">3.</span>
                                <span>ご契約後、弊社にて管理ページへの登録を行います</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold">4.</span>
                                <span>掲載開始！</span>
                            </li>
                        </ol>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    お名前（フルネーム） / スタジオ名 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--photorait-orange)] focus:border-transparent"
                                    placeholder="例: 山田 太郎 / ○○フォトスタジオ"
                                />
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    タイプ <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'Studio' })}
                                        className={`p-4 border-2 rounded-lg text-left transition-all ${formData.type === 'Studio'
                                            ? 'border-[var(--photorait-orange)] bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-2xl mb-2">🏢</div>
                                        <div className="font-bold text-gray-900">スタジオ</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: 'Freelance' })}
                                        className={`p-4 border-2 rounded-lg text-left transition-all ${formData.type === 'Freelance'
                                            ? 'border-[var(--photorait-orange)] bg-orange-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-2xl mb-2">👤</div>
                                        <div className="font-bold text-gray-900">フリーランス</div>
                                    </button>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    メールアドレス <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--photorait-orange)] focus:border-transparent"
                                    placeholder="example@email.com"
                                />
                            </div>

                            {/* Areas */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    対応エリア
                                </label>
                                <input
                                    type="text"
                                    value={formData.areas}
                                    onChange={(e) => setFormData({ ...formData, areas: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--photorait-orange)] focus:border-transparent"
                                    placeholder="例: 那覇市、浦添市、宜野湾市"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ご質問・ご要望
                                </label>
                                <textarea
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--photorait-orange)] focus:border-transparent"
                                    placeholder="ご質問やご要望がございましたらご記入ください"
                                />
                            </div>

                            {/* Submit Status */}
                            {submitStatus === 'success' && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-green-800 font-medium">
                                        ✅ お問い合わせを受け付けました。担当者より折り返しご連絡いたします。
                                    </p>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-red-800 font-medium">
                                        ❌ 送信に失敗しました。お手数ですが、もう一度お試しください。
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-6 py-4 bg-gradient-to-r from-[#FF9500] to-[#E68600] text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ color: 'white' }}
                            >
                                {isSubmitting ? '送信中...' : '送信する'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
