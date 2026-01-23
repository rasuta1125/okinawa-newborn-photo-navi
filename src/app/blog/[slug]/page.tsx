import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogPosts } from '@/data/blogPosts';
import { Breadcrumb } from '@/components/Breadcrumb';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = getBlogPost(params.slug);

    if (!post) {
        return {
            title: '記事が見つかりません',
        };
    }

    return {
        title: post.seo.title,
        description: post.seo.description,
        keywords: post.seo.keywords.join(', '),
        openGraph: {
            title: post.seo.title,
            description: post.seo.description,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author],
            tags: post.tags,
        },
    };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getBlogPost(params.slug);

    if (!post) {
        notFound();
    }

    const categoryLabels = {
        guide: 'ガイド',
        tips: 'ヒント・コツ',
        area: 'エリア情報',
        news: 'お知らせ',
    };

    // Get related posts (same category, excluding current post)
    const allPosts = getAllBlogPosts();
    const relatedPosts = allPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <Breadcrumb
                    items={[
                        { label: 'ホーム', href: '/' },
                        { label: 'ブログ', href: '/blog' },
                        { label: post.title },
                    ]}
                />
            </div>

            {/* Article Header */}
            <article className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Category Badge */}
                    <div className="mb-4">
                        <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                            {categoryLabels[post.category]}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 pb-8 border-b">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{new Date(post.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
                        />
                    </div>

                    {/* Tags */}
                    <div className="mt-12 pt-8 border-t">
                        <h3 className="text-lg font-bold mb-4">タグ</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-600 transition-colors cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8">関連記事</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.id}
                                        href={`/blog/${relatedPost.slug}`}
                                        className="group bg-gray-50 rounded-xl p-6 hover:bg-orange-50 transition-colors"
                                    >
                                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium mb-3">
                                            {categoryLabels[relatedPost.category]}
                                        </span>
                                        <h3 className="font-bold mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {relatedPost.excerpt}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

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
