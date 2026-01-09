import { Filters, Manufacturer, CategoriesResponse } from '../../types';
import { useManufacturers } from './hooks/useManufacturers';
import { useModels } from './hooks/useModels';
import { useCategories } from './hooks/useCategories';
import { useClickOutside } from './hooks/useClickOutside';

interface UseFilterSidebarParams {
  filters: Filters;
  manufacturers: Manufacturer[];
  categories: CategoriesResponse | null;
  onFilterChange: (filters: Filters) => void;
}

export const useFilterSidebar = ({
  filters,
  manufacturers,
  categories,
  onFilterChange,
}: UseFilterSidebarParams) => {
  const manufacturersHook = useManufacturers({
    filters,
    manufacturers,
    onFilterChange,
  });

  const modelsHook = useModels({
    filters,
    manufacturers,
    selectedManufacturers: manufacturersHook.selectedManufacturers,
    onFilterChange,
  });

  const categoriesHook = useCategories({
    filters,
    categories,
    onFilterChange,
  });

  useClickOutside({
    refs: [manufacturersHook.dropdownRef, modelsHook.dropdownRef, categoriesHook.dropdownRef],
    isOpenStates: [manufacturersHook.isOpen, modelsHook.isOpen, categoriesHook.isOpen],
    onClose: (index) => {
      if (index === 0) manufacturersHook.setIsOpen(false);
      if (index === 1) modelsHook.setIsOpen(false);
      if (index === 2) categoriesHook.setIsOpen(false);
    },
  });

  const handleChange = (field: string, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleToggleForRent = () => {
    const newValue = filters.forRent === '1' ? '0' : '1';
    onFilterChange({ ...filters, forRent: newValue });
  };

  return {
    // Manufacturers
    isManufacturerOpen: manufacturersHook.isOpen,
    selectedManufacturers: manufacturersHook.selectedManufacturers,
    searchTerm: manufacturersHook.searchTerm,
    dropdownRef: manufacturersHook.dropdownRef,
    filteredManufacturers: manufacturersHook.filteredManufacturers,
    setIsManufacturerOpen: manufacturersHook.setIsOpen,
    setSearchTerm: manufacturersHook.setSearchTerm,
    handleManufacturerToggle: manufacturersHook.handleToggle,
    handleSelectManufacturers: manufacturersHook.handleSelect,

    //Models
    modelsByManufacturer: modelsHook.modelsByManufacturer,
    isModelOpen: modelsHook.isOpen,
    selectedModels: modelsHook.selectedModels,
    modelSearchTerm: modelsHook.searchTerm,
    modelDropdownRef: modelsHook.dropdownRef,
    filteredModelsByManufacturer: modelsHook.filteredModelsByManufacturer,
    setIsModelOpen: modelsHook.setIsOpen,
    setModelSearchTerm: modelsHook.setSearchTerm,
    handleModelToggle: modelsHook.handleToggle,
    handleSelectModels: modelsHook.handleSelect,

    // Categories
    isCategoryOpen: categoriesHook.isOpen,
    selectedCategories: categoriesHook.selectedCategories,
    categorySearchTerm: categoriesHook.searchTerm,
    categoryDropdownRef: categoriesHook.dropdownRef,
    filteredCategories: categoriesHook.filteredCategories,
    setIsCategoryOpen: categoriesHook.setIsOpen,
    setCategorySearchTerm: categoriesHook.setSearchTerm,
    handleCategoryToggle: categoriesHook.handleToggle,
    handleSelectCategories: categoriesHook.handleSelect,

    handleChange,
    handleToggleForRent,
  };
};
