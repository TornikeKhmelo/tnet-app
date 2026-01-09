import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { Filters, ApiParams } from '../types';
import { vehicleTypeToId } from '../components/ProductCard/constants';

interface UseFilterCountParams {
  filters: Filters;
  vehicleType: string;
  sortOrder?: string;
}

export const useFilterCount = ({
  filters,
  vehicleType,
  sortOrder,
}: UseFilterCountParams) => {
  const [filterCount, setFilterCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const buildApiParams = (): ApiParams => {
    const params: ApiParams = {};
    
    if (vehicleType && vehicleTypeToId[vehicleType] !== undefined) {
      params.TypeID = vehicleTypeToId[vehicleType];
    }

    if (filters.forRent !== undefined && filters.forRent !== '') {
      params.ForRent = filters.forRent;
    }

    if (filters.manufacturer) {
      const manufacturers = Array.isArray(filters.manufacturer) 
        ? filters.manufacturer 
        : [filters.manufacturer];
      const models = filters.model 
        ? (Array.isArray(filters.model) ? filters.model : [filters.model])
        : [];

      if (models.length > 0) {
        const manModelPairs: string[] = [];
        manufacturers.forEach(manId => {
          models.forEach((modelId: string) => {
            if (manId && modelId) {
              manModelPairs.push(`${manId}.${modelId}`);
            }
          });
        });
        if (manModelPairs.length > 0) {
          params.Mans = manModelPairs.join('-');
        }
      } else {
        // Use dashes for manufacturer IDs when no models are selected
        params.Mans = manufacturers.filter(m => m !== '').join('-');
      }
    }

    if (filters.category) {
      if (Array.isArray(filters.category) && filters.category.length > 0) {
        params.Cats = filters.category.join('.');
      } else if (typeof filters.category === 'string' && filters.category) {
        params.Cats = filters.category;
      }
    }

    // Price filters
    if (filters.priceFrom) {
      params.PriceFrom = filters.priceFrom;
    }
    if (filters.priceTo) {
      params.PriceTo = filters.priceTo;
    }

    // CurrencyID: lari=3, dolari=1
    const currency = filters.currency || 'GEL';
    if (currency === 'GEL') {
      params.CurrencyID = 3;
    } else if (currency === 'USD') {
      params.CurrencyID = 1;
    }

    // Period filter
    if (filters.period) {
      params.Period = filters.period;
    }

    // Sort order (optional for count)
    if (sortOrder) {
      params.SortOrder = sortOrder;
    }

    return params;
  };

  const fetchCount = async () => {
    setLoading(true);
    try {
      const apiParams = buildApiParams();
      const response = await api.getProductsCount(apiParams);
      
      // Response format: { data: [{count: 453}] }
      const count = (response as any)?.data?.[0]?.count || 0;
      
      setFilterCount(count);
    } catch (error) {
      console.error('Error fetching filter count:', error);
      setFilterCount(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce the count fetch to avoid too many requests
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    fetchTimeoutRef.current = setTimeout(() => {
      fetchCount();
    }, 300);

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.manufacturer,
    filters.model,
    filters.category,
    filters.priceFrom,
    filters.priceTo,
    filters.currency,
    filters.forRent,
    filters.period,
    vehicleType,
    sortOrder,
  ]);

  return {
    filterCount,
    loading,
    refetch: fetchCount,
  };
};

