type PropsPagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PropsPagination) => {
  if (!totalPages) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    if (currentPage > 3) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 cursor-pointer mx-1 bg-primary text-white text-xs rounded-lg disabled:bg-gray-400"
      >
        {'<'}
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`px-4 cursor-pointer py-2 mx-1 text-xs rounded-lg ${
              currentPage === page
                ? 'bg-secondary text-black'
                : 'bg-transparent text-white hover:bg-gray-600'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="text-white mx-1">
            {page}
          </span>
        ),
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 cursor-pointer mx-1 bg-primary text-white text-xs rounded-lg disabled:bg-gray-400"
      >
        {'>'}
      </button>
    </div>
  );
};
