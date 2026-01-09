'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPhotographerById } from '@/lib/services/photographerService';
import { Photographer } from '@/lib/types';

interface ContactPageProps {
    params: Promise<{
        photographerId: string;
    }>;
}

export default function ContactPage({ params }: ContactPageProps) {
    const router = useRouter();
    const [photographerId, setPhotographerId] = useState<string>('');
    const [photographer, setPhotographer] = useState<Photographer | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        shootingDate: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        params.then(p => {
            setPhotographerId(p.photographerId);
            loadPhotographer(p.photographerId);
        });
    }, [params]);

    const loadPhotographer = async (id: string) => {
        const data = await getPhotographerById(id);
        setPhotographer(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    photographerEmail: photographer?.email,
                    photographerName: photographer?.name,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    shootingDate: formData.shootingDate,
                    message: formData.message,
                }),
            });

            if (!response.ok) {
                throw new Error('メール送信に失敗しました');
            }

            setSubmitted(true);
        } catch (error) {
            console.error('Error sending email:', error);
            alert('メール送信に失敗しました。もう一度お試しください。');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!photographer) {
        return (
            <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-dark)] mx-auto mb-4"></div>
                    <p className="text-[var(--primary-light)]">読み込み中...</p>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">送信完了</h2>
                    <p className="text-[var(--primary-light)] mb-6">
                        {photographer.name} にお問い合わせメールを送信しました。<br />
                        写真家から返信をお待ちください。
                    </p>
                    <button
                        onClick={() => router.push(`/photographers/${photographerId}`)}
                        className="btn btn-primary"
                    >
                        写真家ページに戻る
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--cream)]">
            <div className="container-custom py-8 md:py-12">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
                        <h1 className="text-3xl font-bold text-[var(--primary)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                            お問い合わせ
                        </h1>
                        <p className="text-[var(--primary-light)]">
                            {photographer.name} へのお問い合わせ
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                                    お名前 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
                                    placeholder="山田 太郎"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                                    メールアドレス <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
                                    placeholder="example@email.com"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                                    電話番号
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
                                    placeholder="090-1234-5678"
                                />
                            </div>

                            {/* Shooting Date */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                                    ご希望の撮影日
                                </label>
                                <input
                                    type="date"
                                    name="shootingDate"
                                    value={formData.shootingDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--primary)] mb-2">
                                    お問い合わせ内容 <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent-dark)]"
                                    placeholder="お問い合わせ内容をご記入ください"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="btn btn-outline flex-1"
                                >
                                    キャンセル
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary flex-1"
                                >
                                    {isSubmitting ? '送信中...' : '送信する'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
