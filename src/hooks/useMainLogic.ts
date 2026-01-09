import { useState } from 'react';
import { useStaticData } from './useStaticData';
import { useFilters } from './useFilters';
import { useProducts } from './useProducts';
import { useSorting } from './useSorting';

export const useMainLogic = () => {
  const { manufacturers, categories } = useStaticData();

  const { filters, vehicleType, setVehicleType, handleFilterChange: baseHandleFilterChange } = useFilters();

  const { sortOrder, handleSortChange: baseHandleSortChange } = useSorting();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { loading, error, displayProducts, totalCount, modelsMap, handleSearch } = useProducts({
    filters,
    sortOrder,
    currentPage,
    vehicleType,
    onPageReset: () => setCurrentPage(1),
  });

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    baseHandleFilterChange(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortOrder: string) => {
    baseHandleSortChange(newSortOrder);
    setCurrentPage(1);
  };

  return {
    loading,
    error,
    displayProducts,
    filters,
    sortOrder,
    totalCount,
    currentPage,
    vehicleType,
    manufacturers,
    categories,
    modelsMap,
    totalPages,
    itemsPerPage,
    handleFilterChange,
    handleSearch,
    handleSortChange,
    handlePageChange,
    setVehicleType,
  };
};
