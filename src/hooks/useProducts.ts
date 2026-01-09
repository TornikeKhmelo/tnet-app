import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { Filters, Product, ApiParams, Model } from '../types';
import { vehicleTypeToId } from '../components/ProductCard/constants';

interface UseProductsParams {
  filters: Filters;
  sortOrder: string;
  currentPage: number;
  vehicleType: string;
  onPageReset: () => void;
}

export const useProducts = ({
  filters,
  sortOrder,
  currentPage,
  vehicleType,
  onPageReset,
}: UseProductsParams) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [modelsMap, setModelsMap] = useState<Map<string, Model[]>>(new Map());
  const fetchInProgressRef = useRef(false);

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
            manModelPairs.push(`${manId}.${modelId}`);
          });
        });
        params.Mans = manModelPairs.join('-');
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

    // Sort order
    if (sortOrder) {
      params.SortOrder = sortOrder;
    }

    // Page
    if (currentPage) {
      params.Page = currentPage;
    }

    return params;
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiParams = buildApiParams();
      const response = await api.getProducts(apiParams);
      
      const newProducts: Product[] = (response as any)?.data?.items || [];
      const newTotalCount = (response as any)?.data?.meta?.total || newProducts.length;
      
      setTotalCount(newTotalCount);
      
      // Fetch models
      const uniqueManIds = new Set<string>();
      newProducts.forEach(product => {
        if (product.man_id) {
          uniqueManIds.add(String(product.man_id));
        }
      });
      
      if (filters.manufacturer) {
        if (Array.isArray(filters.manufacturer) && filters.manufacturer.length > 0) {
          filters.manufacturer.forEach(id => uniqueManIds.add(String(id)));
        } else if (typeof filters.manufacturer === 'string' && filters.manufacturer) {
          uniqueManIds.add(filters.manufacturer);
        }
      }
      
      if (uniqueManIds.size > 0) {
        const fetchModelsForManufacturers = async () => {
          const newModelsMap = new Map(modelsMap);
          const promises = Array.from(uniqueManIds).map(async (manId) => {
            if (!newModelsMap.has(manId)) {
              try {
                const modelsData = await api.getModels(manId);
                const models: Model[] = (modelsData as any)?.data || [];
                newModelsMap.set(manId, models);
              } catch (error) {
                console.error(`Error loading models for manufacturer ${manId}:`, error);
                newModelsMap.set(manId, []);
              }
            }
          });
          
          await Promise.all(promises);
          setModelsMap(newModelsMap);
        };
        
        fetchModelsForManufacturers();
      }
      
      setTimeout(() => {
        setDisplayProducts(newProducts);
      }, 100);
      
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('დაფიქსირდა შეცდომა მონაცემების ჩატვირთვისას');
      setDisplayProducts([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchInProgressRef.current) return;
    
    fetchInProgressRef.current = true;
    
    const loadProducts = async () => {
      await fetchProducts();
      fetchInProgressRef.current = false;
    };
    
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder, currentPage, filters.period, filters.forRent, vehicleType]);

  const handleSearch = () => {
    onPageReset();
    fetchProducts();
  };

  return {
    loading,
    error,
    displayProducts,
    totalCount,
    modelsMap,
    fetchProducts,
    handleSearch,
  };
};

