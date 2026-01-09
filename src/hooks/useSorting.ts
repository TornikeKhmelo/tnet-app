import { useState } from 'react';

export const useSorting = () => {
  const [sortOrder, setSortOrder] = useState('1');

  const handleSortChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
  };

  return {
    sortOrder,
    handleSortChange,
  };
};

