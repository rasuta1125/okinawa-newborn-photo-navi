// Firebase Storage service for image uploads
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getFirebaseStorage } from '@/lib/firebase';

/**
 * 画像をFirebase Storageにアップロード
 * @param file アップロードするファイル
 * @param path 保存先のパス（例: 'photographers/profile/photographer-id.jpg'）
 * @returns アップロードされた画像のURL
 */
export async function uploadImage(file: File, path: string): Promise<string> {
    try {
        const storage = getFirebaseStorage();
        console.log('🔧 Firebase Storage設定確認');
        console.log('  - Storage instance:', storage);
        console.log('  - File:', file.name, file.type, file.size);
        console.log('  - Path:', path);

        const storageRef = ref(storage, path);
        console.log('  - Storage ref created:', storageRef.fullPath);

        console.log('⬆️ アップロード開始...');
        const snapshot = await uploadBytes(storageRef, file);
        console.log('✅ アップロード完了:', snapshot.metadata.fullPath);

        console.log('🔗 URL取得中...');
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('✅ URL取得完了:', downloadURL);

        return downloadURL;
    } catch (error) {
        console.error('❌ アップロードエラー詳細:', error);
        if (error instanceof Error) {
            console.error('  - Message:', error.message);
            console.error('  - Stack:', error.stack);
        }
        throw new Error('画像のアップロードに失敗しました: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}

/**
 * 写真家のプロフィール画像をアップロード
 * @param file アップロードするファイル
 * @param photographerId 写真家のID
 * @returns アップロードされた画像のURL
 */
export async function uploadProfileImage(file: File, photographerId: string): Promise<string> {
    const extension = file.name.split('.').pop();
    const path = `photographers/${photographerId}/profile.${extension}`;
    return await uploadImage(file, path);
}

/**
 * 写真家のカバー画像をアップロード
 * @param file アップロードするファイル
 * @param photographerId 写真家のID
 * @returns アップロードされた画像のURL
 */
export async function uploadCoverImage(file: File, photographerId: string): Promise<string> {
    const extension = file.name.split('.').pop();
    const path = `photographers/${photographerId}/cover.${extension}`;
    return await uploadImage(file, path);
}

/**
 * 写真家のギャラリー画像をアップロード
 * @param file アップロードするファイル
 * @param photographerId 写真家のID
 * @param index ギャラリー内のインデックス
 * @returns アップロードされた画像のURL
 */
export async function uploadGalleryImage(file: File, photographerId: string, index: number): Promise<string> {
    const extension = file.name.split('.').pop();
    const timestamp = Date.now();
    const path = `photographers/${photographerId}/gallery/${timestamp}-${index}.${extension}`;
    return await uploadImage(file, path);
}

/**
 * Firebase Storageから画像を削除
 * @param url 削除する画像のURL
 */
export async function deleteImage(url: string): Promise<void> {
    try {
        const storage = getFirebaseStorage();
        // URLからパスを抽出
        const urlObj = new URL(url);
        const pathMatch = urlObj.pathname.match(/\/o\/(.+)\?/);
        if (!pathMatch) {
            throw new Error('Invalid image URL');
        }
        const path = decodeURIComponent(pathMatch[1]);

        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
    } catch (error) {
        console.error('Error deleting image:', error);
        throw new Error('画像の削除に失敗しました');
    }
}

/**
 * 画像ファイルのバリデーション
 * @param file バリデーションするファイル
 * @param maxSizeMB 最大ファイルサイズ（MB）
 * @returns バリデーション結果
 */
export function validateImageFile(file: File, maxSizeMB: number = 5): { valid: boolean; error?: string } {
    // ファイルタイプチェック
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: '画像ファイルはJPEG、PNG、WebP形式のみ対応しています'
        };
    }

    // ファイルサイズチェック
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        return {
            valid: false,
            error: `ファイルサイズは${maxSizeMB}MB以下にしてください`
        };
    }

    return { valid: true };
}
