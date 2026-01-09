interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // ページ番号の配列を生成（最大9ページまで表示）
    const getPageNumbers = () => {
        const pages: number[] = [];
        const maxVisible = 9;
        
        if (totalPages <= maxVisible) {
            // 全ページを表示
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // 現在のページを中心に表示
            let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
            let end = Math.min(totalPages, start + maxVisible - 1);
            
            // 終端調整
            if (end - start < maxVisible - 1) {
                start = Math.max(1, end - maxVisible + 1);
            }
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex justify-center items-center gap-1 mt-8">
            {/* ページ番号ボタン */}
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`
                        w-10 h-10 flex items-center justify-center text-sm font-medium
                        transition-colors duration-200
                        ${currentPage === page
                            ? 'bg-[#F5C518] text-white'
                            : 'bg-[#D1D5DB] text-gray-600 hover:bg-[#B8BCC4]'
                        }
                    `}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            {/* 次へボタン */}
            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-4 h-10 flex items-center justify-center text-sm font-medium bg-[#D1D5DB] text-gray-600 hover:bg-[#B8BCC4] transition-colors duration-200"
                >
                    次へ ›
                </button>
            )}

            {/* 最後へボタン */}
            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(totalPages)}
                    className="px-4 h-10 flex items-center justify-center text-sm font-medium bg-[#D1D5DB] text-gray-600 hover:bg-[#B8BCC4] transition-colors duration-200"
                >
                    最後へ ››
                </button>
            )}
        </div>
    );
}
