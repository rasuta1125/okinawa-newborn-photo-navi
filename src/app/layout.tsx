import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "./accessibility.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { StructuredData } from "@/components/StructuredData";
import { SkipToContent } from "@/components/SkipToContent";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "沖縄ニューボーンフォト・ナビ | 沖縄県の新生児写真撮影マッチングポータル",
    template: "%s | 沖縄ニューボーンフォト・ナビ",
  },
  description: "沖縄県内の信頼できるニューボーンフォト・新生児写真の専門家を見つけられるマッチングサイト。スタジオ・フリーランスカメラマンの比較、料金プラン、口コミ評価から最適な写真家を選べます。",
  keywords: ["沖縄", "ニューボーンフォト", "新生児写真", "赤ちゃん写真", "写真スタジオ", "フリーランスカメラマン", "出張撮影", "100日祝い", "バースデーフォト", "753"],
  authors: [{ name: "沖縄ニューボーンフォト・ナビ" }],
  creator: "沖縄ニューボーンフォト・ナビ",
  publisher: "沖縄ニューボーンフォト・ナビ",
  verification: {
    google: "Zcp9NWs5QJ248tUqn8bIWeLMMl8Xs2-h5plfCnjnF1E",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "沖縄ニューボーンフォト・ナビ | 沖縄県の新生児写真撮影マッチングポータル",
    description: "沖縄県内の新生児写真撮影の専門家とご家族をつなぐマッチングポータルサイト",
    type: "website",
    locale: "ja_JP",
    siteName: "沖縄ニューボーンフォト・ナビ",
  },
  twitter: {
    card: "summary_large_image",
    title: "沖縄ニューボーンフォト・ナビ",
    description: "沖縄県内の信頼できるニューボーンフォト・新生児写真の専門家を見つけられるマッチングサイト",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ja">
      <head>
        <StructuredData type="website" />
        <StructuredData type="organization" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <SkipToContent />
          {gaId && <GoogleAnalytics gaId={gaId} />}
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
