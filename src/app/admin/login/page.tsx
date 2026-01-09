'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLoginPage() {
    const router = useRouter();
    const { signIn } = useAuth();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Firebase Authenticationでログイン
            await signIn(credentials.email, credentials.password);
            // ログイン成功 - 管理画面にリダイレクト
            router.push('/admin');
        } catch (err: any) {
            // エラーハンドリング
            console.error('Login error:', err);

            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('メールアドレスまたはパスワードが正しくありません');
            } else if (err.code === 'auth/too-many-requests') {
                setError('ログイン試行回数が多すぎます。しばらく待ってから再度お試しください');
            } else if (err.code === 'auth/invalid-credential') {
                setError('認証情報が無効です。メールアドレスとパスワードを確認してください');
            } else {
                setError('ログインに失敗しました。もう一度お試しください');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">管理画面ログイン</h1>
                    <p className="text-gray-600 mt-2">沖縄ニューボーンフォト・ナビ</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                メールアドレス
                            </label>
                            <input
                                type="email"
                                required
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9500] focus:border-transparent"
                                placeholder="メールアドレスを入力"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                パスワード
                            </label>
                            <input
                                type="password"
                                required
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9500] focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-red-800 text-sm">❌ {error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-6 py-3 bg-gradient-to-r from-[#FF9500] to-[#E68600] text-white rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50"
                            style={{ color: 'white' }}
                        >
                            {isLoading ? 'ログイン中...' : 'ログイン'}
                        </button>
                    </form>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
                        ← トップページに戻る
                    </a>
                </div>
            </div>
        </div>
    );
}
