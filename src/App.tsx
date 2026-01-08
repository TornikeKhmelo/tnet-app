import React from 'react';
import Header from './components/Header/Header';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import CustomDropdown from './components/CustomDropdown/CustomDropdown';
import ProductCard from './components/ProductCard';
import Pagination from './components/Pagination/Pagination';
import { AppContainer, ContentWrapper, MainContent, ProductsContainer, ProductsGrid, ErrorText, StatsBar, StatsText, DropdownWrapper,EmptyText,LoadingText } from './styles';
import { useMainLogic } from './hooks/useMainLogic';

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
                  options={[
                    { value: '1h', label: '1 საათი' },
                    { value: '3h', label: '3 საათი' },
                    { value: '6h', label: '6 საათი' },
                    { value: '12h', label: '12 საათი' },
                    { value: '24h', label: '24 საათი' },
                  ]}
                  value={filters.period || ''}
                  onChange={(value) => {
                    handleFilterChange({ ...filters, period: value });
                  }}
                  placeholder="პერიოდი"
                  hideSelected={true}
                />
                <CustomDropdown
                minWidth="180px"
                  options={[
                    { value: '1', label: 'თარიღი კლებადი' },
                    { value: '2', label: 'თარიღი ზრდადი' },
                    { value: '3', label: 'ფასი კლებადი' },
                    { value: '4', label: 'ფასი ზრდადი' },
                    { value: '5', label: 'გარბენი კლებადი' },
                    { value: '6', label: 'გარბენი ზრდადი' },
                  ]}
                  value={sortOrder || '1'}
                  onChange={handleSortChange}
                  placeholder="თარიღი კლებადი"
                  hideSelected={true}
                />
              </DropdownWrapper>
            </StatsBar>
            {displayProducts.length > 0 ? (
              <ProductsGrid isLoading={loading}>
                {displayProducts.map((product) => {
                  const productManId = product.man_id ? String(product.man_id) : null;
                  const models = productManId ? (modelsMap.get(productManId) || []) : [];
                  return (
                    <ProductCard
                      key={product.product_id || product.id}
                      product={product}
                      manufacturers={manufacturers}
                      models={models}
                      currency={filters.currency || 'GEL'}
                    />
                  );
                })}
              </ProductsGrid>
            ) : !loading && !error ? (
              <EmptyText>განცხადებები არ მოიძებნა</EmptyText>
            ) : loading ? (
              <LoadingText>იტვირთება...</LoadingText>
            ) : null}
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
