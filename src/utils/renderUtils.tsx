import React from 'react';
import { Product, Manufacturer } from '../types';
import { ProductsGrid, EmptyText, LoadingText } from '../styles';
import ProductCard from '../components/ProductCard';
import { getProductModels, getProductKey } from './productUtils';

interface RenderProductsParams {
  displayProducts: Product[];
  loading: boolean;
  error: string | null;
  manufacturers: Manufacturer[];
  modelsMap: Map<string, any[]>;
  currency: string;
}

export const renderProductsContent = ({
  displayProducts,
  loading,
  error,
  manufacturers,
  modelsMap,
  currency,
}: RenderProductsParams) => {
  if (displayProducts.length > 0) {
    return (
      <ProductsGrid isLoading={loading}>
        {displayProducts.map((product) => {
          const models = getProductModels(product, modelsMap);
          return (
            <ProductCard
              key={getProductKey(product)}
              product={product}
              manufacturers={manufacturers}
              models={models}
              currency={currency}
            />
          );
        })}
      </ProductsGrid>
    );
  }

  if (loading) {
    return <LoadingText>იტვირთება...</LoadingText>;
  }

  if (!error) {
    return <EmptyText>განცხადებები არ მოიძებნა</EmptyText>;
  }

  return null;
};

