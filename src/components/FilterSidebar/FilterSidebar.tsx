import React from 'react';
import { Filters, Manufacturer, CategoriesResponse } from '../../types';
import VehicleTypeSwitcher from '../Switcher/VehicleTypeSwitcher';
import { SidebarContainer, FiltersContainer, SearchButton } from './styles';
import { useFilterSidebar } from './useFilterSidebar';
import { ForRentToggle } from './ForRentToggle';
import { PriceFilter } from './PriceFilter';
import Manufacturers from './Manufacturers';
import Models from './Models';
import Category from './Category';



interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onSearch: () => void;
  resultCount: number;
  manufacturers: Manufacturer[];
  categories: CategoriesResponse | null;
  vehicleType: string;
  onVehicleTypeChange: (type: string) => void;
}

const FilterSidebar = ({
  filters,
  onFilterChange,
  onSearch,
  resultCount,
  manufacturers,
  categories,
  vehicleType,
  onVehicleTypeChange,
}: FilterSidebarProps) => {
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

  return (
    <SidebarContainer>
      <VehicleTypeSwitcher 
        selectedType={vehicleType}
        onTypeChange={onVehicleTypeChange}
      />
       <FiltersContainer>
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

      <SearchButton onClick={onSearch}>
        ძებნა {resultCount ? `(${resultCount.toLocaleString('ka-GE')})` : ''}
      </SearchButton>
    </FiltersContainer>
    </SidebarContainer>
  );
};

export default FilterSidebar;

