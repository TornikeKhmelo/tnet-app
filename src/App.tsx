import React from 'react';
import Header from './components/Header/Header';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import CustomDropdown from './components/CustomDropdown/CustomDropdown';
import Pagination from './components/Pagination/Pagination';
import { AppContainer, ContentWrapper, MainContent, ProductsContainer, ErrorText, StatsBar, StatsText, DropdownWrapper } from './styles';
import { useMainLogic } from './hooks/useMainLogic';
import { renderProductsContent } from './utils/renderUtils';
import { periodOptions, sortOptions } from './utils/dropdownOptions';

const App = () => {
  const {
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
            resultCount={totalCount}
            manufacturers={manufacturers}
            categories={categories}
            vehicleType={vehicleType}
            onVehicleTypeChange={setVehicleType}
          />
          
          <ProductsContainer>
            {error && <ErrorText>{error}</ErrorText>}
             <StatsBar>
              <StatsText>{totalCount.toLocaleString('ka-GE')} განცხადება</StatsText>
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
    </AppContainer>
  );
}

export default App;
