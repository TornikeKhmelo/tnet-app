import React, { useEffect } from 'react';
import { Filters, Manufacturer, CategoriesResponse } from '../../types';
import { useFilterSidebar } from './useFilterSidebar';
import Manufacturers from './Manufacturers';
import Models from './Models';
import Category from './Category';
import { PriceFilter } from './PriceFilter';
import { ForRentToggle } from './ForRentToggle';
import {
  MobileDrawer,
  MobileDrawerOverlay,
  MobileDrawerHeader,
  MobileDrawerContent,
  MobileCloseButton,
  MobileFiltersContainer,
  MobileSearchButton,
} from './mobileStyles';

interface MobileFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onSearch: () => void;
  resultCount: number;
  manufacturers: Manufacturer[];
  categories: CategoriesResponse | null;
}

const MobileFilterSidebar = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onSearch,
  resultCount,
  manufacturers,
  categories,
}: MobileFilterSidebarProps) => {
  const {
    isManufacturerOpen,
    selectedManufacturers,
    searchTerm,
    dropdownRef,
    modelsByManufacturer,
    isModelOpen,
    selectedModels,
    modelSearchTerm,
    modelDropdownRef,
    isCategoryOpen,
    selectedCategories,
    categorySearchTerm,
    categoryDropdownRef,
    filteredManufacturers,
    filteredModelsByManufacturer,
    filteredCategories,
    setIsManufacturerOpen,
    setSearchTerm,
    setIsModelOpen,
    setModelSearchTerm,
    setIsCategoryOpen,
    setCategorySearchTerm,
    handleChange,
    handleManufacturerToggle,
    handleSelectManufacturers,
    handleModelToggle,
    handleSelectModels,
    handleCategoryToggle,
    handleSelectCategories,
    handleToggleForRent,
  } = useFilterSidebar({
    filters,
    manufacturers,
    categories,
    onFilterChange,
  });

  const handleSearch = () => {
    onSearch();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <MobileDrawerOverlay isOpen={isOpen} onClick={onClose} />
      <MobileDrawer isOpen={isOpen}>
        <MobileDrawerHeader>
          <h2>დეტალური ფილტრი</h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <MobileCloseButton 
              onClick={() => {
                onFilterChange({
                  forRent: '0',
                  manufacturer: '',
                  model: '',
                  category: '',
                  priceFrom: '',
                  priceTo: '',
                  period: '',
                  currency: 'GEL',
                });
              }}
              style={{ fontSize: '18px', color: '#fd4100' }}
            >
              🗑️
            </MobileCloseButton>
            <MobileCloseButton onClick={onClose}>✕</MobileCloseButton>
          </div>
        </MobileDrawerHeader>
        <MobileDrawerContent>
          <MobileFiltersContainer>
            <ForRentToggle filters={filters} onToggle={handleToggleForRent} />
            
            <Manufacturers
              manufacturers={manufacturers}
              manufacturerHook={{
                selectedManufacturers,
                searchTerm,
                isManufacturerOpen,
                dropdownRef,
                filteredManufacturers,
                setIsManufacturerOpen,
                setSearchTerm,
                handleManufacturerToggle,
                handleSelectManufacturers,
              }}
            />

            {selectedManufacturers.length > 0 && (
              <Models
                modelsHook={{
                  selectedModels,
                  modelSearchTerm,
                  isModelOpen,
                  modelDropdownRef,
                  modelsByManufacturer,
                  filteredModelsByManufacturer,
                  setIsModelOpen,
                  setModelSearchTerm,
                  handleModelToggle,
                  handleSelectModels,
                }}
              />
            )}

            <Category
              categories={categories}
              categoryHook={{
                selectedCategories,
                categorySearchTerm,
                isCategoryOpen,
                categoryDropdownRef,
                filteredCategories,
                setIsCategoryOpen,
                setCategorySearchTerm,
                handleCategoryToggle,
                handleSelectCategories,
              }}
            />

            <PriceFilter filters={filters} onChange={handleChange} />

            <MobileSearchButton onClick={handleSearch}>
              ძებნა {resultCount ? `(${resultCount.toLocaleString('ka-GE')})` : ''}
            </MobileSearchButton>
          </MobileFiltersContainer>
        </MobileDrawerContent>
      </MobileDrawer>
    </>
  );
};

export default MobileFilterSidebar;

