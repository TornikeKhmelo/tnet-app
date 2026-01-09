import { useEffect, useRef, useState } from 'react';
import { CategoriesResponse, Filters } from '../../../types';

interface UseCategoriesParams {
  filters: Filters;
  categories: CategoriesResponse | null;
  onFilterChange: (filters: Filters) => void;
}

export const useCategories = ({
  filters,
  categories,
  onFilterChange,
}: UseCategoriesParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (filters.category) {
      if (Array.isArray(filters.category)) {
        setSelectedCategories(filters.category);
      } else {
        setSelectedCategories([filters.category]);
      }
    } else {
      setSelectedCategories([]);
    }
  }, [filters.category]);

  const handleToggle = (categoryId: string) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newSelectedCategories);
    onFilterChange({
      ...filters,
      category: newSelectedCategories.length > 0 ? newSelectedCategories : '',
    });
  };

  const handleSelect = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredCategories =
    categories?.data?.filter((cat) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  return {
    isOpen,
    selectedCategories,
    searchTerm,
    dropdownRef,
    filteredCategories,
    setIsOpen,
    setSearchTerm,
    handleToggle,
    handleSelect,
  };
};

