import React from 'react';
import { PaginationContainer, PaginationButton, PageNumber } from './styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handleFirstPage = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();
  // can't find icons on figma so i'm using text instead
  return (
    <PaginationContainer>
      <PaginationButton
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        title="პირველი გვერდი"
      >
        &lt;&lt;
      </PaginationButton>
      <PaginationButton
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        title="წინა გვერდი"
      >
        &lt;
      </PaginationButton>
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <PageNumber key={`ellipsis-${index}`} disabled>
              ...
            </PageNumber>
          );
        }
        return (
          <PageNumber
            key={page}
            isActive={currentPage === page}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PageNumber>
        );
      })}
      <PaginationButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        title="შემდეგი გვერდი"
      >
        &gt;
      </PaginationButton>
      <PaginationButton
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        title="ბოლო გვერდი"
      >
        &gt;&gt;
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;

