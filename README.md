# 沖縄ニューボーンフォト・ナビ

沖縄県内のニューボーンフォト・新生児写真の専門家を見つけられるマッチングポータルサイト

## 🌟 特徴

- **写真家検索**: スタジオ・フリーランスカメラマンを簡単に検索
- **地域別フィルター**: 沖縄31市町村に対応
- **サービス別検索**: ニューボーン、100日祝い、バースデーフォト、753
- **ランキング表示**: 会員ランク別の表示順位
- **管理画面**: 写真家の登録・編集・承認機能

## 🚀 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Analytics**: Google Analytics 4
- **SEO**: 構造化データ、サイトマップ、PWA対応

## 📦 セットアップ

### 前提条件

- Node.js 18.17以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/okinawa-newborn-photo-navi.git
cd okinawa-newborn-photo-navi

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

http://localhost:3000 でアクセスできます。

### 環境変数

`.env.local` ファイルを作成：

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🌐 デプロイ

詳細は [DEPLOYMENT.md](./DEPLOYMENT.md) を参照してください。

### Vercelへのデプロイ

1. GitHubリポジトリを作成
2. Vercelアカウントでログイン
3. リポジトリを接続
4. 環境変数を設定
5. デプロイ

## 📊 SEO最適化

このサイトは包括的なSEO最適化が施されています：

- ✅ ページ別メタデータ（地域キーワード強化）
- ✅ 構造化データ（JSON-LD）
- ✅ サイトマップ自動生成
- ✅ PWA対応
- ✅ アクセシビリティ準拠
- ✅ パフォーマンス最適化

詳細は [SEO_REPORT.md](./SEO_REPORT.md) を参照してください。

## 📝 主要ページ

- `/` - トップページ
- `/photographers/freelance` - フリーランス一覧
- `/photographers/studios` - スタジオ一覧
- `/100days` - 100日祝い・バースデーフォト
- `/register` - 写真家登録問い合わせ
- `/admin` - 管理画面（要ログイン）

## 🔐 管理画面

デモ用の管理画面ログイン情報：

- URL: `/admin/login`
- Email: `yuto_sakaguchi@aimable00.com`
- Password: `aimable123!`

**注意**: 本番環境では必ずバックエンド認証を実装してください。

## 📚 ドキュメント

- [DEPLOYMENT.md](./DEPLOYMENT.md) - デプロイガイド
- [GOOGLE_SETUP.md](./GOOGLE_SETUP.md) - Google Analytics/Search Console設定
- [SEO_CHECKLIST.md](./SEO_CHECKLIST.md) - SEOチェックリスト
- [SEO_REPORT.md](./SEO_REPORT.md) - SEO最適化レポート

## 🛠️ 開発

### ビルド

```bash
npm run build
```

### 本番環境プレビュー

```bash
npm run start
```

### リント

```bash
npm run lint
```

## 📄 ライセンス

All rights reserved.

## 👥 コンタクト

- Email: newbornnavi@gmail.com
- Website: https://okinawa-newborn-navi.com

---

Made with ❤️ in Okinawa
