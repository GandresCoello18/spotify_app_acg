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
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-primary text-white text-xs rounded-lg disabled:bg-gray-400"
      >
        {'<'}
      </button>

      {pageNumbers.slice(0, 3).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 mx-1 text-xs rounded-lg ${currentPage === page ? 'bg-secondary text-black' : 'bg-transparent text-white hover:bg-gray-600'}`}
        >
          {page}
        </button>
      ))}

      {totalPages > 5 && <span className="text-white mx-1">...</span>}

      {pageNumbers.slice(-2).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 mx-1 text-xs rounded-lg ${currentPage === page ? 'bg-secondary text-white' : 'bg-transparent text-white hover:bg-gray-600'}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-primary text-white text-xs rounded-lg disabled:bg-gray-400"
      >
        {'>'}
      </button>
    </div>
  );
};
