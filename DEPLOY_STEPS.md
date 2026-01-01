# デプロイ手順ガイド

このガイドに従って、沖縄ニューボーンフォト・ナビをVercelにデプロイします。

## ステップ1: GitHubリポジトリの作成

### 1.1 GitHubで新しいリポジトリを作成

1. https://github.com/new にアクセス
2. リポジトリ名: `okinawa-newborn-photo-navi`
3. プライベートまたはパブリック（お好みで）
4. 「Create repository」をクリック

### 1.2 ローカルリポジトリの初期化とプッシュ

```bash
cd /Users/sakaguchiyuto/.gemini/antigravity/scratch/newborn-photo-portal

# Gitリポジトリ初期化（まだの場合）
git init

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: Okinawa Newborn Photo Navi with SEO optimization"

# メインブランチに変更
git branch -M main

# リモートリポジトリを追加（YOUR_USERNAMEを実際のGitHubユーザー名に置き換え）
git remote add origin https://github.com/YOUR_USERNAME/okinawa-newborn-photo-navi.git

# プッシュ
git push -u origin main
```

---

## ステップ2: Vercelアカウントのセットアップ

### 2.1 Vercelにサインアップ

1. https://vercel.com/signup にアクセス
2. 「Continue with GitHub」をクリック
3. GitHubアカウントで認証

---

## ステップ3: Vercelプロジェクトの作成

### 3.1 新しいプロジェクトをインポート

1. Vercelダッシュボードで「Add New...」→「Project」をクリック
2. 「Import Git Repository」セクションで `okinawa-newborn-photo-navi` を選択
3. 「Import」をクリック

### 3.2 プロジェクト設定

- **Framework Preset**: Next.js（自動検出）
- **Root Directory**: `./`
- **Build Command**: `npm run build`（デフォルト）
- **Output Directory**: `.next`（デフォルト）
- **Install Command**: `npm install`（デフォルト）

### 3.3 環境変数の設定

「Environment Variables」セクションで以下を追加：

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://okinawa-newborn-navi.com` | Production |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Production |

**注意**: GA IDは後で設定します。まず空欄でデプロイしても問題ありません。

### 3.4 デプロイ

「Deploy」ボタンをクリック

デプロイには2-3分かかります。完了すると、Vercelが自動的にURLを生成します（例: `https://okinawa-newborn-photo-navi.vercel.app`）

---

## ステップ4: Google Analytics 4の設定

### 4.1 GA4プロパティの作成

1. https://analytics.google.com/ にアクセス
2. `newbornnavi@gmail.com` でログイン
3. 「管理」→「プロパティを作成」をクリック
4. プロパティ名: `沖縄ニューボーンフォト・ナビ`
5. タイムゾーン: `日本`
6. 通貨: `日本円 (¥)`
7. 「次へ」をクリック

### 4.2 データストリームの作成

1. 「データストリーム」→「ストリームを追加」→「ウェブ」
2. ウェブサイトのURL: `https://okinawa-newborn-navi.com`
3. ストリーム名: `本番サイト`
4. 「ストリームを作成」をクリック
5. **測定ID**（G-XXXXXXXXXX）をコピー

### 4.3 Vercelに測定IDを設定

1. Vercelダッシュボードで「Settings」→「Environment Variables」
2. `NEXT_PUBLIC_GA_ID` の値を更新
3. Value: コピーした測定ID（例: `G-ABC123DEF4`）
4. 「Save」をクリック
5. 「Deployments」タブで最新のデプロイを選択
6. 「...」→「Redeploy」をクリック

---

## ステップ5: カスタムドメインの設定

### 5.1 Vercelでドメインを追加

1. Vercelダッシュボードで「Settings」→「Domains」
2. 「Add」をクリック
3. ドメイン名を入力: `okinawa-newborn-navi.com`
4. 「Add」をクリック

### 5.2 DNS設定

Vercelが表示するDNS設定に従って、ドメインレジストラ（お名前.com、Cloudflareなど）で設定します。

**Aレコード:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAMEレコード:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

DNS伝播には最大48時間かかる場合がありますが、通常は数分〜数時間で完了します。

---

## ステップ6: Google Search Consoleの設定

### 6.1 プロパティの追加

1. https://search.google.com/search-console にアクセス
2. `newbornnavi@gmail.com` でログイン
3. 「プロパティを追加」をクリック
4. URLプレフィックス: `https://okinawa-newborn-navi.com`
5. 「続行」をクリック

### 6.2 所有権の確認

**推奨方法: HTMLタグ**

1. 確認用のメタタグをコピー（例: `<meta name="google-site-verification" content="XXXXX" />`）
2. `src/app/layout.tsx` の `metadata` に追加：

```typescript
export const metadata: Metadata = {
  // ... 既存の設定 ...
  verification: {
    google: 'XXXXX', // ここにコードを貼り付け
  },
};
```

3. 変更をコミット＆プッシュ：

```bash
git add src/app/layout.tsx
git commit -m "Add Google Search Console verification"
git push
```

4. Vercelで自動デプロイが完了するのを待つ
5. Search Consoleで「確認」をクリック

### 6.3 サイトマップの送信

1. Search Consoleで「サイトマップ」を選択
2. 新しいサイトマップを追加: `https://okinawa-newborn-navi.com/sitemap.xml`
3. 「送信」をクリック

---

## ステップ7: デプロイ後の確認

### 7.1 必須チェックリスト

- [ ] サイトが正常に表示される
- [ ] すべてのページが動作する（/, /photographers/freelance, /photographers/studios, /100days, /register）
- [ ] 管理画面にログインできる（/admin/login）
- [ ] Google Analyticsでリアルタイムデータが表示される
- [ ] Search Consoleで所有権が確認される
- [ ] サイトマップが正常に読み込まれる
- [ ] SSL証明書が有効（https://）
- [ ] モバイル表示が正常

### 7.2 パフォーマンステスト

1. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - URLを入力して分析
   - 目標: モバイル・デスクトップともに90+

2. **Lighthouse**
   - Chrome DevToolsで実行
   - Performance, Accessibility, Best Practices, SEO すべて90+を目指す

3. **構造化データテスト**
   - https://search.google.com/test/rich-results
   - URLを入力してテスト
   - エラーがないことを確認

---

## トラブルシューティング

### ビルドエラーが発生する

```bash
# ローカルでビルドテスト
npm run build
```

エラーメッセージを確認し、修正してからプッシュ

### 環境変数が反映されない

1. Vercelダッシュボードで環境変数を確認
2. 「Deployments」→最新のデプロイ→「...」→「Redeploy」

### ドメインが接続できない

1. DNS設定が正しいか確認
2. DNS伝播を待つ（最大48時間）
3. `dig okinawa-newborn-navi.com` でDNS確認

### Google Analyticsでデータが表示されない

1. 測定IDが正しく設定されているか確認
2. ブラウザの広告ブロッカーを無効化
3. リアルタイムレポートで確認（反映に24-48時間かかる場合あり）

---

## 次のステップ

デプロイが完了したら：

1. **定期的な確認**（週次）
   - Google Analyticsでアクセス数確認
   - Search Consoleでインデックス状況確認
   - エラーログの確認

2. **月次レポート**
   - アクセス数の推移
   - 人気のページ
   - 検索キーワード
   - コンバージョン率

3. **継続的な改善**
   - ユーザーフィードバックの収集
   - コンテンツの更新
   - 新機能の追加

---

## サポート

問題が発生した場合：

- Vercelドキュメント: https://vercel.com/docs
- Next.jsドキュメント: https://nextjs.org/docs
- Email: newbornnavi@gmail.com

おめでとうございます！🎉
沖縄ニューボーンフォト・ナビが公開されました！
