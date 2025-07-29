import { useState } from 'react';

export default function usePagination(items = [], itemsPerPage = 10) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const start = page * itemsPerPage;
  const end = start + itemsPerPage;

  const currentPageItems = items.slice(start, end);

  const handlePrev = () => {
    setPage(p => (p > 0 ? p - 1 : p));
  };

  const handleNext = () => {
    setPage(p => (p < totalPages - 1 ? p + 1 : p));
  };

  const setPageNumber = (num) => {
    if (num >= 0 && num < totalPages) {
      setPage(num);
    }
  };

  return {
    page,
    totalPages,
    currentPageItems,
    handlePrev,
    handleNext,
    setPageNumber,
  };
}
