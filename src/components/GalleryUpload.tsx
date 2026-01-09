'use client';

import { useState } from 'react';
import { uploadGalleryImage, validateImageFile } from '@/lib/services/storageService';

interface GalleryUploadProps {
    photographerId: string;
    currentGallery: string[];
    maxImages: number;
    onGalleryUpdate: (gallery: string[]) => void;
}

export function GalleryUpload({
    photographerId,
    currentGallery,
    maxImages,
    onGalleryUpdate
}: GalleryUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setError('');

        // 最大枚数チェック
        if (currentGallery.length + files.length > maxImages) {
            setError(`ギャラリー画像は最大${maxImages}枚までです`);
            return;
        }

        setIsUploading(true);
        const newUrls: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // バリデーション
                const validation = validateImageFile(file);
                if (!validation.valid) {
                    setError(validation.error || '');
                    continue;
                }

                // アップロード
                const url = await uploadGalleryImage(file, photographerId, currentGallery.length + i);
                newUrls.push(url);
            }

            // ギャラリーを更新
            onGalleryUpdate([...currentGallery, ...newUrls]);
        } catch (err) {
            setError('アップロードに失敗しました');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = (index: number) => {
        const newGallery = currentGallery.filter((_, i) => i !== index);
        onGalleryUpdate(newGallery);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                    ギャラリー写真 ({currentGallery.length}/{maxImages}枚)
                </label>
                {currentGallery.length < maxImages && (
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            multiple
                            onChange={handleFileSelect}
                            disabled={isUploading}
                            className="hidden"
                        />
                        <span className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 inline-block">
                            {isUploading ? 'アップロード中...' : '画像を追加'}
                        </span>
                    </label>
                )}
            </div>

            {/* ギャラリープレビュー */}
            <div className="grid grid-cols-3 gap-4">
                {currentGallery.map((url, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={url}
                            alt={`ギャラリー ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* エラーメッセージ */}
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            <p className="text-xs text-gray-500">
                JPEG, PNG, WebP形式（最大5MB）
            </p>
        </div>
    );
}
