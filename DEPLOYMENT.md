# Vercel デプロイガイド

このガイドでは、沖縄ニューボーンフォト・ナビをVercelにデプロイする手順を説明します。

## 前提条件

- GitHubアカウント
- Vercelアカウント（GitHubでサインアップ可能）
- カスタムドメイン（例: okinawa-newborn-navi.com）

---

## ステップ1: GitHubリポジトリの作成

1. GitHubで新しいリポジトリを作成
   - リポジトリ名: `okinawa-newborn-photo-navi`
   - プライベートまたはパブリック（お好みで）

2. ローカルプロジェクトをGitHubにプッシュ

```bash
cd /Users/sakaguchiyuto/.gemini/antigravity/scratch/newborn-photo-portal

# Gitリポジトリ初期化（まだの場合）
git init

# リモートリポジトリを追加
git remote add origin https://github.com/YOUR_USERNAME/okinawa-newborn-photo-navi.git

# コミット＆プッシュ
git add .
git commit -m "Initial commit: Okinawa Newborn Photo Navi"
git branch -M main
git push -u origin main
```

---

## ステップ2: Vercelプロジェクトのセットアップ

1. https://vercel.com にアクセス
2. GitHubでログイン
3. 「New Project」をクリック
4. GitHubリポジトリ `okinawa-newborn-photo-navi` を選択
5. プロジェクト設定:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

---

## ステップ3: 環境変数の設定

Vercelダッシュボードで「Settings」→「Environment Variables」に移動し、以下を追加：

### 本番環境（Production）

| 変数名 | 値 | 説明 |
|--------|-----|------|
| `NEXT_PUBLIC_SITE_URL` | `https://okinawa-newborn-navi.com` | サイトのURL |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Google Analytics測定ID |

### プレビュー環境（Preview）

同じ値を設定するか、テスト用の別のGA IDを使用

---

## ステップ4: カスタムドメインの設定

1. Vercelダッシュボードで「Settings」→「Domains」
2. 「Add Domain」をクリック
3. ドメイン名を入力: `okinawa-newborn-navi.com`
4. DNS設定の指示に従う

### DNS設定例（お名前.comの場合）

**Aレコード:**
```
@ → 76.76.21.21
```

**CNAMEレコード:**
```
www → cname.vercel-dns.com
```

### DNS設定例（Cloudflareの場合）

**Aレコード:**
```
@ → 76.76.21.21
```

**CNAMEレコード:**
```
www → cname.vercel-dns.com
```

---

## ステップ5: デプロイ

1. GitHubにプッシュすると自動的にデプロイが開始されます
2. Vercelダッシュボードで進捗を確認
3. デプロイ完了後、URLにアクセスして確認

---

## ステップ6: Google Analytics設定

1. https://analytics.google.com/ にアクセス
2. `newbornnavi@gmail.com` でログイン
3. 新しいプロパティを作成
   - プロパティ名: `沖縄ニューボーンフォト・ナビ`
   - タイムゾーン: 日本
   - 通貨: 日本円
4. データストリームを作成
   - ウェブサイトURL: `https://okinawa-newborn-navi.com`
5. 測定ID（G-XXXXXXXXXX）をコピー
6. Vercelの環境変数 `NEXT_PUBLIC_GA_ID` に設定
7. Vercelで再デプロイ

---

## ステップ7: Google Search Console設定

1. https://search.google.com/search-console にアクセス
2. `newbornnavi@gmail.com` でログイン
3. プロパティを追加: `https://okinawa-newborn-navi.com`
4. 所有権の確認（DNSまたはHTMLタグ）
5. サイトマップを送信: `https://okinawa-newborn-navi.com/sitemap.xml`

---

## デプロイ後の確認事項

### 必須チェック

- [ ] サイトが正常に表示される
- [ ] すべてのページが動作する
- [ ] Google Analyticsでリアルタイムデータが表示される
- [ ] Search Consoleで所有権が確認される
- [ ] サイトマップが正常に読み込まれる
- [ ] 構造化データにエラーがない
- [ ] SSL証明書が有効
- [ ] モバイル表示が正常

### パフォーマンスチェック

- [ ] PageSpeed Insights でスコア確認
- [ ] Lighthouse でSEO監査
- [ ] Core Web Vitals の測定

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
2. 再デプロイを実行

### ドメインが接続できない

1. DNS設定が正しいか確認
2. DNS伝播を待つ（最大48時間）
3. `dig okinawa-newborn-navi.com` でDNS確認

---

## 継続的なメンテナンス

### 定期的な確認（週次）

- Google Analyticsでアクセス数確認
- Search Consoleでインデックス状況確認
- エラーログの確認

### 月次レポート

- アクセス数の推移
- 人気のページ
- 検索キーワード
- コンバージョン率

---

## サポート

問題が発生した場合：
1. Vercelドキュメント: https://vercel.com/docs
2. Next.jsドキュメント: https://nextjs.org/docs
3. GitHubでIssueを作成
