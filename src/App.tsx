import React, { useState } from 'react';
import Header from './components/Header/Header';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import MobileFilterSidebar from './components/FilterSidebar/MobileFilterSidebar';
import FilterButton from './components/FilterSidebar/FilterButton';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import CustomDropdown from './components/CustomDropdown/CustomDropdown';
import Pagination from './components/Pagination/Pagination';
import { AppContainer, ContentWrapper, MainContent, ProductsContainer, ErrorText, StatsBar, StatsText, DropdownWrapper } from './styles';
import { useMainLogic } from './hooks/useMainLogic';
import { renderProductsContent } from './utils/renderUtils';
import { periodOptions, sortOptions } from './utils/dropdownOptions';
import { countActiveFilters, removeFilter } from './utils/filterUtils';
import FilterChips from './components/FilterChips';

const App = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const {
    loading,
    error,
    displayProducts,
    filters,
    sortOrder,
    totalCount,
    filterCount,
    currentPage,
    vehicleType,
    manufacturers,
    categories,
    modelsMap,
    totalPages,
    handleFilterChange,
    handleSearch,
    handleSortChange,
    handlePageChange,
    setVehicleType,
  } = useMainLogic();

  return (
    <AppContainer>
      <div>
        <Header />
        <ContentWrapper>
        <Breadcrumb />
        <MainContent>
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            resultCount={filterCount ?? totalCount}
            manufacturers={manufacturers}
            categories={categories}
            vehicleType={vehicleType}
            onVehicleTypeChange={setVehicleType}
          />
          
          <ProductsContainer>
            {error && <ErrorText>{error}</ErrorText>}
            <FilterChips
              filters={filters}
              manufacturers={manufacturers}
              categories={categories}
              modelsMap={modelsMap}
              onRemoveFilter={(type, value) => {
                handleFilterChange(removeFilter(filters, type, value));
              }}
            />
             <StatsBar>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <FilterButton 
                  onClick={() => setIsMobileFilterOpen(true)}
                  activeFiltersCount={countActiveFilters(filters)}
                />
                <StatsText>{filterCount?.toLocaleString('ka-GE') ?? totalCount.toLocaleString('ka-GE')} განცხადება</StatsText>
              </div>
              <DropdownWrapper>
                <CustomDropdown
                  options={periodOptions}
                  value={filters.period || ''}
                  onChange={(value) => {
                    handleFilterChange({ ...filters, period: value });
                  }}
                  placeholder="პერიოდი"
                  hideSelected={true}
                />
                <CustomDropdown
                  minWidth="180px"
                  options={sortOptions}
                  value={sortOrder || '1'}
                  onChange={handleSortChange}
                  placeholder="თარიღი კლებადი"
                  hideSelected={true}
                />
              </DropdownWrapper>
            </StatsBar>
            {renderProductsContent({
              displayProducts,
              loading,
              error,
              manufacturers,
              modelsMap,
              currency: filters.currency || 'GEL',
            })}
            {displayProducts.length > 0 && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </ProductsContainer>
        </MainContent>
        </ContentWrapper>
      </div>
      <MobileFilterSidebar
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        resultCount={filterCount ?? totalCount}
        manufacturers={manufacturers}
        categories={categories}
      />
    </AppContainer>
  );
}

export default App;
