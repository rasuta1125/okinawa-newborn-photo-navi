import { NextRequest, NextResponse } from 'next/server';

// 仮のデータストア（本番環境ではFirestoreなどを使用）
const reviews: any[] = [];

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { photographerId, customerName, rating, comment } = body;

        // バリデーション
        if (!photographerId || !customerName || !rating || !comment) {
            return NextResponse.json(
                { error: '必須項目が入力されていません' },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: '評価は1〜5の範囲で入力してください' },
                { status: 400 }
            );
        }

        // レビューを作成
        const newReview = {
            id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            photographerId,
            customerName,
            rating: Number(rating),
            comment,
            createdAt: new Date().toISOString(),
            isApproved: false, // デフォルトは未承認
        };

        // 保存（本番環境ではFirestoreに保存）
        reviews.push(newReview);

        console.log('New review created:', newReview);

        return NextResponse.json(
            {
                message: 'レビューを投稿しました',
                review: newReview
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating review:', error);
        return NextResponse.json(
            { error: 'レビューの投稿に失敗しました' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const photographerId = searchParams.get('photographerId');

        if (!photographerId) {
            return NextResponse.json(
                { error: 'photographerIdが指定されていません' },
                { status: 400 }
            );
        }

        // フィルタリング（承認済みのみ）
        const approvedReviews = reviews.filter(
            (review) => review.photographerId === photographerId && review.isApproved
        );

        return NextResponse.json({ reviews: approvedReviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            { error: 'レビューの取得に失敗しました' },
            { status: 500 }
        );
    }
}
