# Google Analytics & Search Console セットアップガイド

このガイドでは、`newbornnavi@gmail.com` アカウントでGoogle Analytics 4とGoogle Search Consoleを設定する手順を説明します。

## 1. Google Analytics 4 (GA4) の設定

### ステップ1: GA4プロパティの作成
1. https://analytics.google.com/ にアクセス
2. `newbornnavi@gmail.com` でログイン
3. 「管理」→「プロパティを作成」をクリック
4. プロパティ名: `沖縄ニューボーンフォト・ナビ`
5. タイムゾーン: `日本`
6. 通貨: `日本円 (¥)`

### ステップ2: データストリームの作成
1. 「データストリーム」→「ストリームを追加」→「ウェブ」
2. ウェブサイトのURL: `https://okinawa-newborn-navi.com`
3. ストリーム名: `本番サイト`
4. 測定IDをコピー（例: `G-XXXXXXXXXX`）

### ステップ3: 測定IDを環境変数に設定
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

`.env.local` ファイルに上記を追加してください。

### ステップ4: コードの更新
`src/app/layout.tsx` に以下を追加：

```typescript
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

// ... 既存のコード ...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  
  return (
    <html lang="ja">
      <body>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {/* ... 既存のコード ... */}
      </body>
    </html>
  );
}
```

---

## 2. Google Search Console の設定

### ステップ1: プロパティの追加
1. https://search.google.com/search-console にアクセス
2. `newbornnavi@gmail.com` でログイン
3. 「プロパティを追加」をクリック
4. URLプレフィックス: `https://okinawa-newborn-navi.com`

### ステップ2: 所有権の確認
**推奨方法: HTMLタグ**
1. 確認用のメタタグをコピー
2. `src/app/layout.tsx` の `metadata` に追加：

```typescript
export const metadata: Metadata = {
  // ... 既存の設定 ...
  verification: {
    google: 'ここに確認コードを貼り付け',
  },
};
```

### ステップ3: サイトマップの送信
1. Search Consoleで「サイトマップ」を選択
2. サイトマップURL: `https://okinawa-newborn-navi.com/sitemap.xml`
3. 「送信」をクリック

---

## 3. 重要な設定

### GA4のイベント設定
以下のイベントが自動的にトラッキングされます：
- `click_photographer` - 写真家カードのクリック
- `search` - 検索実行
- `submit_inquiry` - 問い合わせフォーム送信
- `click_phone` - 電話番号クリック
- `click_website` - ウェブサイトクリック

### コンバージョン目標の設定
GA4で以下をコンバージョンとして設定することを推奨：
1. `submit_inquiry` - 問い合わせフォーム送信
2. `click_phone` - 電話番号クリック

---

## 4. 確認事項

### デプロイ後の確認
- [ ] GA4でリアルタイムデータが表示されるか確認
- [ ] Search Consoleで所有権が確認されたか確認
- [ ] サイトマップが正常に読み込まれたか確認
- [ ] 構造化データエラーがないか確認

### 定期的な確認
- 週次: GA4でアクセス数、ユーザー行動を確認
- 月次: Search Consoleで検索パフォーマンス、インデックス状況を確認

---

## トラブルシューティング

### GA4でデータが表示されない
1. 測定IDが正しく設定されているか確認
2. ブラウザの広告ブロッカーを無効化
3. リアルタイムレポートで確認（反映に24-48時間かかる場合あり）

### Search Consoleで所有権確認ができない
1. メタタグが正しく設置されているか確認
2. ページのソースコードで確認タグが表示されているか確認
3. キャッシュをクリアして再度確認
