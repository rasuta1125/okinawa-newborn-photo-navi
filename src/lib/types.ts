// Type definitions for 沖縄ニューボーンフォト・ナビ

// 新しいランクシステム（4段階）
export type MembershipRank = 'Diamond' | 'Platinum' | 'Standard' | 'Free';

// 写真家タイプ
export type PhotographerType = 'Studio' | 'Freelance';

// 承認ステータス
export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';

// SNSリンク
export interface SnsLinks {
  line?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

// 写真家情報
export interface Photographer {
  id: string;
  name: string;
  photographerType: PhotographerType;
  membershipRank: MembershipRank;

  // ダイヤモンド会員の指定席（1-5位）
  diamondPosition?: number;

  // 100日記念の固定順位（1=マカロニ、2=ミルミル）
  fixedRanking100Days?: number;

  areas: string[]; // 沖縄31市町村
  options: string[];
  handprintOption: boolean;
  description: string;
  profileImage: string;
  coverImage: string;
  gallery: string[];
  maxGalleryImages: number; // ランク別制限

  email: string;
  phone: string;
  website?: string;
  snsLinks?: SnsLinks; // ランク制限あり

  // 料金情報
  priceRange?: string; // 例: "¥30,000〜¥50,000"
  priceNote?: string; // 料金に関する補足説明

  // 承認・公開管理
  approvalStatus: ApprovalStatus;
  isPublished: boolean;

  // Square連携（将来対応）
  squareCustomerId?: string;
  squareSubscriptionId?: string;

  createdAt: Date;
  updatedAt: Date;
}

// 会員ランク定義
export interface MembershipTier {
  rank: MembershipRank;
  monthlyFee: number;
  displayPriority: number;
  maxGalleryImages: number;
  allowSnsLinks: boolean;
  description: string;
}

// プラン情報
export interface Plan {
  id: string;
  photographerId: string;
  title: string;
  price: number;
  content: string;
  features: string[];
}

// ブログ情報
export interface Blog {
  id: string;
  photographerId: string;
  title: string;
  body: string;
  excerpt: string;
  coverImage: string;
  publishedAt: Date;
  tags: string[];
}

// 問い合わせ情報
export interface Inquiry {
  id: string;
  photographerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  sentAt: Date;
  status: 'Sent' | 'Read';
}

// レビュー・口コミ情報
export interface Review {
  id: string;
  photographerId: string;
  customerName: string;
  rating: number; // 1-5の星評価
  comment: string;
  createdAt: Date;
  isApproved: boolean; // 管理者承認済みかどうか
}

// 沖縄市町村情報
export interface OkinawaMunicipality {
  id: string;
  name: string;
  region: 'North' | 'Central' | 'South';
  displayOrder: number;
}

// 検索フィルター
export interface SearchFilters {
  area?: string;
  options?: string[];
  photographerType?: PhotographerType;
  section?: 'newborn' | '100days'; // セクション指定
}

// 旧型との互換性（段階的移行用）
/** @deprecated Use MembershipRank instead */
export type SubscriptionStatus = 'Free' | 'Standard' | 'Premium';
