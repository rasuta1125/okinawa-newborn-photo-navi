'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
    getAllPhotographersForAdmin as getPhotographersFromFirestore,
    getPendingPhotographers as getPendingFromFirestore,
    createPhotographer,
    updatePhotographer,
    deletePhotographer,
    approvePhotographer,
    togglePublishStatus
} from '@/lib/repositories/photographerRepository';
import { Photographer, MembershipRank, PhotographerType } from '@/lib/types';
import { RANK_DISPLAY_NAMES, RANK_ICONS, MEMBERSHIP_TIERS } from '@/lib/constants/membershipTiers';
import { getAllMunicipalityNames } from '@/lib/constants/okinawaMunicipalities';
import { ImageUpload } from '@/components/ImageUpload';
import { GalleryUpload } from '@/components/GalleryUpload';

export default function AdminPage() {
    const router = useRouter();
    const { user, loading, signOut, isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState<'list' | 'add' | 'pending'>('list');
    const [photographers, setPhotographers] = useState<Photographer[]>([]);
    const [pendingPhotographers, setPendingPhotographers] = useState<Photographer[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 新規登録フォーム
    const [formData, setFormData] = useState<Partial<Photographer>>({
        name: '',
        photographerType: 'Studio',
        membershipRank: 'Free',
        areas: [],
        options: [],
        handprintOption: false,
        description: '',
        profileImage: '',
        coverImage: '',
        gallery: [],
        email: '',
        phone: '',
        website: '',
        snsLinks: {},
        approvalStatus: 'Approved',
        isPublished: true,
        maxGalleryImages: 5,
    });

    const allAreas = getAllMunicipalityNames();
    const allOptions = ['ニューボーン', '出張撮影', '100日祝い', 'バースデーフォト', '753'];

    // Load photographers from Firestore
    useEffect(() => {
        if (user && isAdmin) {
            loadPhotographers();
        }
    }, [user, isAdmin]);

    const loadPhotographers = async () => {
        try {
            const [allPhotographers, pending] = await Promise.all([
                getPhotographersFromFirestore(),
                getPendingFromFirestore()
            ]);
            setPhotographers(allPhotographers);
            setPendingPhotographers(pending);
        } catch (error) {
            console.error('Error loading photographers:', error);
            alert('写真家データの読み込みに失敗しました');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingId) {
                // 楽観的UI更新: すぐにリストを更新
                setPhotographers(prev =>
                    prev.map(p => p.id === editingId ? { ...p, ...formData } as Photographer : p)
                );

                // Update existing photographer
                await updatePhotographer(editingId, formData);
                alert('写真家情報を更新しました');
                setEditingId(null);
            } else {
                // Create new photographer
                const photographerData = {
                    ...formData,
                    profileImage: formData.profileImage || '/images/photographers/default-profile.jpg',
                    coverImage: formData.coverImage || '/images/photographers/default-cover.jpg',
                    gallery: formData.gallery || [],
                    maxGalleryImages: MEMBERSHIP_TIERS[formData.membershipRank!].maxGalleryImages,
                } as Omit<Photographer, 'id' | 'createdAt' | 'updatedAt'>;

                // 楽観的UI更新: 仮IDで即座にリストに追加
                const tempId = `temp-${Date.now()}`;
                const tempPhotographer = {
                    ...photographerData,
                    id: tempId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                } as Photographer;

                setPhotographers(prev => [...prev, tempPhotographer]);
                alert('新しい写真家を登録しています...');

                // バックグラウンドで実際に保存
                const newId = await createPhotographer(photographerData);

                // 仮IDを実際のIDに置き換え
                setPhotographers(prev =>
                    prev.map(p => p.id === tempId ? { ...p, id: newId } : p)
                );
            }

            // Reset form
            setFormData({
                name: '',
                photographerType: 'Studio',
                membershipRank: 'Free',
                areas: [],
                options: [],
                handprintOption: false,
                description: '',
                profileImage: '',
                coverImage: '',
                gallery: [],
                email: '',
                phone: '',
                website: '',
                snsLinks: {},
                approvalStatus: 'Approved',
                isPublished: true,
                maxGalleryImages: 5,
            });

            setActiveTab('list');
            // バックグラウンドでリロード
            loadPhotographers();
        } catch (error) {
            console.error('Error saving photographer:', error);
            alert('保存に失敗しました: ' + (error as Error).message);
            // エラー時は再読み込み
            await loadPhotographers();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (photographer: Photographer) => {
        setEditingId(photographer.id);
        setFormData(photographer);
        setActiveTab('add');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('本当に削除しますか？')) return;

        try {
            await deletePhotographer(id);
            alert('写真家を削除しました');
            await loadPhotographers();
        } catch (error) {
            console.error('Error deleting photographer:', error);
            alert('削除に失敗しました');
        }
    };

    const togglePublish = async (id: string, currentStatus: boolean) => {
        try {
            await togglePublishStatus(id, !currentStatus);
            alert(`公開状態を${!currentStatus ? '公開' : '非公開'}に変更しました`);
            await loadPhotographers();
        } catch (error) {
            console.error('Error toggling publish status:', error);
            alert('公開状態の変更に失敗しました');
        }
    };

    const handleApprove = async (id: string) => {
        try {
            await approvePhotographer(id);
            alert('写真家を承認しました');
            await loadPhotographers();
        } catch (error) {
            console.error('Error approving photographer:', error);
            alert('承認に失敗しました');
        }
    };

    // 認証チェック
    useEffect(() => {
        if (!loading) {
            if (!user || !isAdmin) {
                router.push('/admin/login');
            }
        }
    }, [user, loading, isAdmin, router]);

    // ログアウト
    const handleLogout = async () => {
        await signOut();
        router.push('/admin/login');
    };

    // 認証チェック中
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9500] mx-auto mb-4"></div>
                    <p className="text-gray-600">読み込み中...</p>
                </div>
            </div>
        );
    }

    // 未認証の場合は何も表示しない（リダイレクト中）
    if (!user || !isAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="container-custom py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">管理画面</h1>
                            <p className="text-gray-600 mt-1">写真家アカウントの管理</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            ログアウト
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('list')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'list'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                写真家一覧
                            </button>
                            <button
                                onClick={() => setActiveTab('add')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'add'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                新規登録
                            </button>
                            <button
                                onClick={() => setActiveTab('pending')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'pending'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                承認待ち
                                {pendingPhotographers.length > 0 && (
                                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        {pendingPhotographers.length}
                                    </span>
                                )}
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content */}
                {activeTab === 'list' && (
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">登録済み写真家</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">名前</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">タイプ</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ランク</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状態</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {photographers.map(p => (
                                            <tr key={p.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{p.name}</div>
                                                    <div className="text-sm text-gray-500">{p.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {p.photographerType === 'Studio' ? 'スタジオ' : 'フォトグラファー'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {RANK_ICONS[p.membershipRank]} {RANK_DISPLAY_NAMES[p.membershipRank]}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {p.isPublished ? '公開中' : '非公開'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(p)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        編集
                                                    </button>
                                                    <button
                                                        onClick={() => togglePublish(p.id, p.isPublished)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        {p.isPublished ? '非公開にする' : '公開する'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(p.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        削除
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'add' && (
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                {editingId ? '写真家情報の編集' : '新規写真家登録'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* 基本情報 */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">基本情報</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                スタジオ/写真家名 <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                タイプ <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.photographerType}
                                                onChange={(e) => setFormData({ ...formData, photographerType: e.target.value as PhotographerType })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="Studio">スタジオ</option>
                                                <option value="Freelance">フォトグラファー</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* プラン選択 */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">プラン選択</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        {(['Diamond', 'Platinum', 'Standard', 'Free'] as MembershipRank[]).map(rank => (
                                            <button
                                                key={rank}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, membershipRank: rank })}
                                                className={`p-4 border-2 rounded-lg text-left transition-all ${formData.membershipRank === rank
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="text-2xl mb-2">{RANK_ICONS[rank]}</div>
                                                <div className="font-bold text-gray-900">{RANK_DISPLAY_NAMES[rank]}</div>
                                                <div className="text-sm text-gray-600 mt-1">
                                                    {MEMBERSHIP_TIERS[rank].monthlyFee > 0
                                                        ? `¥${MEMBERSHIP_TIERS[rank].monthlyFee.toLocaleString()}/月`
                                                        : '無料'}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-2">
                                                    写真: {MEMBERSHIP_TIERS[rank].maxGalleryImages === -1 ? '無制限' : `${MEMBERSHIP_TIERS[rank].maxGalleryImages}枚`}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 連絡先情報 */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">連絡先情報</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                メールアドレス <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                電話番号 <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                ウェブサイト
                                            </label>
                                            <input
                                                type="url"
                                                value={formData.website}
                                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 料金情報 */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">料金情報</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                金額目安
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="例: ¥30,000〜¥50,000"
                                                value={formData.priceRange || ''}
                                                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                料金に関する補足
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="例: 衣装レンタル込み、出張費別途"
                                                value={formData.priceNote || ''}
                                                onChange={(e) => setFormData({ ...formData, priceNote: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 画像アップロード */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">画像</h3>
                                    <div className="space-y-6">
                                        {/* プロフィール画像 */}
                                        <ImageUpload
                                            label="プロフィール画像"
                                            currentImageUrl={formData.profileImage}
                                            onUploadComplete={(url) => setFormData({ ...formData, profileImage: url })}
                                        />

                                        {/* カバー画像 */}
                                        <ImageUpload
                                            label="カバー画像"
                                            currentImageUrl={formData.coverImage}
                                            onUploadComplete={(url) => setFormData({ ...formData, coverImage: url })}
                                        />

                                        {/* ギャラリー写真 */}
                                        {editingId && (
                                            <GalleryUpload
                                                photographerId={editingId}
                                                currentGallery={formData.gallery || []}
                                                maxImages={formData.maxGalleryImages || 5}
                                                onGalleryUpdate={(gallery) => setFormData({ ...formData, gallery })}
                                            />
                                        )}
                                        {!editingId && (
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <p className="text-sm text-blue-800">
                                                    💡 ギャラリー写真は、写真家を登録した後に追加できます。
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* SNSリンク（課金プランのみ） */}
                                {formData.membershipRank !== 'Free' && (
                                    <div className="border-b border-gray-200 pb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            SNSリンク
                                            <span className="ml-2 text-sm font-normal text-blue-600">
                                                （{RANK_DISPLAY_NAMES[formData.membershipRank!]}プラン特典）
                                            </span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    LINE公式アカウント
                                                </label>
                                                <input
                                                    type="url"
                                                    placeholder="https://line.me/R/ti/p/@..."
                                                    value={formData.snsLinks?.line || ''}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        snsLinks: { ...formData.snsLinks, line: e.target.value }
                                                    })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Instagram
                                                </label>
                                                <input
                                                    type="url"
                                                    placeholder="https://instagram.com/..."
                                                    value={formData.snsLinks?.instagram || ''}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        snsLinks: { ...formData.snsLinks, instagram: e.target.value }
                                                    })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Facebook
                                                </label>
                                                <input
                                                    type="url"
                                                    placeholder="https://facebook.com/..."
                                                    value={formData.snsLinks?.facebook || ''}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        snsLinks: { ...formData.snsLinks, facebook: e.target.value }
                                                    })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 説明文 */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">説明文</h3>
                                    <textarea
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="スタジオ・写真家の特徴や強みを記入してください"
                                    />
                                </div>

                                {/* ギャラリー写真 */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        ギャラリー写真
                                        <span className="ml-2 text-sm font-normal text-gray-600">
                                            （最大{MEMBERSHIP_TIERS[formData.membershipRank!].maxGalleryImages}枚）
                                        </span>
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <p className="text-sm text-blue-800">
                                                💡 <strong>現在はモックデータモード</strong>です。実際の画像アップロード機能は、Firebase/Supabase連携後に実装されます。
                                            </p>
                                        </div>

                                        {/* Photo Upload Placeholders */}
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {Array.from({ length: MEMBERSHIP_TIERS[formData.membershipRank!].maxGalleryImages }).map((_, index) => (
                                                <div key={index} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                                    <div className="text-center">
                                                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                        <p className="text-xs text-gray-500">写真 {index + 1}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="text-sm text-gray-600">
                                            <p className="mb-2"><strong>推奨仕様:</strong></p>
                                            <ul className="list-disc list-inside space-y-1 text-gray-500">
                                                <li>ファイル形式: JPEG, PNG</li>
                                                <li>推奨サイズ: 1200×800px以上</li>
                                                <li>最大ファイルサイズ: 5MB</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* エリア・オプション */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">対応エリア・オプション</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                対応エリア（複数選択可）
                                            </label>
                                            <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2">
                                                {allAreas.map(area => (
                                                    <label key={area} className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.areas?.includes(area)}
                                                            onChange={(e) => {
                                                                const newAreas = e.target.checked
                                                                    ? [...(formData.areas || []), area]
                                                                    : (formData.areas || []).filter(a => a !== area);
                                                                setFormData({ ...formData, areas: newAreas });
                                                            }}
                                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm text-gray-700">{area}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                提供オプション（複数選択可）
                                            </label>
                                            <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2">
                                                {allOptions.map(option => (
                                                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.options?.includes(option)}
                                                            onChange={(e) => {
                                                                const newOptions = e.target.checked
                                                                    ? [...(formData.options || []), option]
                                                                    : (formData.options || []).filter(o => o !== option);
                                                                setFormData({ ...formData, options: newOptions });
                                                            }}
                                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm text-gray-700">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveTab('list');
                                            setEditingId(null);
                                            setFormData({
                                                name: '',
                                                photographerType: 'Studio',
                                                membershipRank: 'Free',
                                                areas: [],
                                                options: [],
                                                handprintOption: false,
                                                description: '',
                                                email: '',
                                                phone: '',
                                                website: '',
                                                snsLinks: {},
                                                approvalStatus: 'Approved',
                                                isPublished: true,
                                            });
                                        }}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        キャンセル
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? '保存中...' : (editingId ? '更新する' : '登録する')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === 'pending' && (
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">承認待ちリスト</h2>
                            {pendingPhotographers.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">承認待ちの写真家はいません</p>
                            ) : (
                                <div className="space-y-4">
                                    {pendingPhotographers.map((p: Photographer) => (
                                        <div key={p.id} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{p.name}</h3>
                                                    <p className="text-sm text-gray-600">{p.email}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleApprove(p.id)}
                                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                    >
                                                        承認
                                                    </button>
                                                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                                        却下
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
