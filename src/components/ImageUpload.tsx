'use client';

import { useState, useRef } from 'react';
import { uploadImage, validateImageFile } from '@/lib/services/storageService';

interface ImageUploadProps {
    onUploadComplete: (url: string) => void;
    currentImageUrl?: string;
    label?: string;
    maxSizeMB?: number;
}

export function ImageUpload({
    onUploadComplete,
    currentImageUrl,
    label = '画像をアップロード',
    maxSizeMB = 5
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string>('');
    const [preview, setPreview] = useState<string>(currentImageUrl || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError('');
        console.log('📸 ファイル選択:', file.name, file.type, file.size);

        // バリデーション
        const validation = validateImageFile(file, maxSizeMB);
        if (!validation.valid) {
            setError(validation.error || '');
            console.error('❌ バリデーションエラー:', validation.error);
            return;
        }

        // プレビュー表示
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
            console.log('✅ プレビュー表示完了');
        };
        reader.readAsDataURL(file);

        // アップロード
        setIsUploading(true);
        try {
            const timestamp = Date.now();
            const extension = file.name.split('.').pop();
            const path = `uploads/${timestamp}.${extension}`;

            console.log('⬆️ アップロード開始:', path);
            const url = await uploadImage(file, path);
            console.log('✅ アップロード成功:', url);

            onUploadComplete(url);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'アップロードに失敗しました';
            console.error('❌ アップロードエラー:', err);
            setError(errorMessage);
            setPreview(currentImageUrl || '');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="flex items-center gap-4">
                {/* プレビュー */}
                {preview && (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* アップロードボタン */}
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploading ? 'アップロード中...' : '画像を選択'}
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                        JPEG, PNG, WebP形式（最大{maxSizeMB}MB）
                    </p>
                </div>
            </div>

            {/* エラーメッセージ */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-600">{error}</p>
                    <p className="text-xs text-red-500 mt-1">
                        ブラウザのコンソール（F12）で詳細を確認してください
                    </p>
                </div>
            )}
        </div>
    );
}
