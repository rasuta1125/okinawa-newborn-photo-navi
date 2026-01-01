import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="パンくずリスト" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-2"
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                    >
                        {item.href ? (
                            <>
                                <Link
                                    href={item.href}
                                    className="hover:text-[var(--photorait-orange)] transition-colors"
                                    itemProp="item"
                                >
                                    <span itemProp="name">{item.label}</span>
                                </Link>
                                <meta itemProp="position" content={String(index + 1)} />
                            </>
                        ) : (
                            <>
                                <span className="text-gray-900 font-medium" itemProp="name">
                                    {item.label}
                                </span>
                                <meta itemProp="position" content={String(index + 1)} />
                            </>
                        )}
                        {index < items.length - 1 && (
                            <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
