import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/data/blogPosts';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
    title: 'ブログ - ニューボーンフォト・育児の情報',
    description: 'ニューボーンフォトの撮影ガイド、育児のコラム、沖縄の写真スタジオ情報など、赤ちゃんの写真撮影に役立つ情報をお届けします。',
    keywords: ['ニューボーンフォト', 'ブログ', '育児', '沖縄', '撮影ガイド', '赤ちゃん写真'],
    canonical: '/blog',
});

export default function BlogPage() {
    const posts = getAllBlogPosts();

    const categoryLabels = {
        guide: 'ガイド',
        tips: 'ヒント・コツ',
        area: 'エリア情報',
        news: 'お知らせ',
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-400 to-pink-400 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        ブログ
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90">
                        ニューボーンフォト・育児に役立つ情報をお届け
                    </p>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Category Badge */}
                                <div className="p-4 pb-0">
                                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                                        {categoryLabels[post.category]}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h2 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</span>
                                        <span className="text-orange-500 font-medium group-hover:underline">
                                            続きを読む →
                                        </span>
                                    </div>

                                    {/* Tags */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-orange-400 to-pink-400 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        写真家を探す
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        沖縄県内の信頼できるニューボーンフォトの専門家を見つけましょう
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/photographers/freelance"
                            className="px-8 py-4 bg-white text-orange-500 rounded-full font-bold hover:bg-orange-50 transition-colors"
                        >
                            フリーランスカメラマン
                        </Link>
                        <Link
                            href="/photographers/studios"
                            className="px-8 py-4 bg-white text-orange-500 rounded-full font-bold hover:bg-orange-50 transition-colors"
                        >
                            スタジオを探す
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
