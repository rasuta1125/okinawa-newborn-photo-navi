import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { photographerEmail, photographerName, name, email, phone, shootingDate, message } = body;

        // バリデーション
        if (!photographerEmail || !name || !email || !message) {
            return NextResponse.json(
                { error: '必須項目が入力されていません' },
                { status: 400 }
            );
        }

        // メール送信
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'ニューボーンフォトナビ <noreply@yourdomain.com>',
            to: [photographerEmail],
            replyTo: email,
            subject: '【ニューボーンフォトナビ】お問い合わせ',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1c1917; border-bottom: 2px solid #fdba74; padding-bottom: 10px;">
                        ニューボーンフォトナビからお問い合わせ
                    </h2>
                    
                    <p>${photographerName} 様</p>
                    
                    <p>ニューボーンフォトナビ経由でお問い合わせがありました。</p>
                    
                    <div style="background-color: #fefcf7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1c1917; margin-top: 0;">お客様情報</h3>
                        <p><strong>お名前:</strong> ${name}</p>
                        <p><strong>メールアドレス:</strong> ${email}</p>
                        ${phone ? `<p><strong>電話番号:</strong> ${phone}</p>` : ''}
                        ${shootingDate ? `<p><strong>ご希望の撮影日:</strong> ${shootingDate}</p>` : ''}
                    </div>
                    
                    <div style="background-color: #f5ede3; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1c1917; margin-top: 0;">お問い合わせ内容</h3>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <p style="color: #78716c; font-size: 14px; margin-top: 30px;">
                        このメールに直接返信することで、お客様にご連絡いただけます。
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #e7dccb; margin: 30px 0;">
                    
                    <p style="color: #78716c; font-size: 12px; text-align: center;">
                        沖縄ニューボーンフォト・ナビ<br>
                        https://okinawa-newborn-photo-navi.vercel.app
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'メール送信に失敗しました' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'サーバーエラーが発生しました' },
            { status: 500 }
        );
    }
}
