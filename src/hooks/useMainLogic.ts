import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { Filters, Product, ApiParams, Manufacturer, CategoriesResponse, Model } from '../types';

export const useMainLogic = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    forRent: '0',
    manufacturer: '',
    model: '',
    category: '',
    priceFrom: '',
    priceTo: '',
    period: '',
    currency: 'GEL',
  });
  const [sortOrder, setSortOrder] = useState('1');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehicleType, setVehicleType] = useState('car');
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [categories, setCategories] = useState<CategoriesResponse | null>(null);
  const [modelsMap, setModelsMap] = useState<Map<string, Model[]>>(new Map());
  const dataLoadedRef = useRef(false);
  const fetchInProgressRef = useRef(false);

  useEffect(() => {
    if (dataLoadedRef.current) return;
    
    const loadData = async () => {
      try {
        dataLoadedRef.current = true;
        const [mansData, catsData] = await Promise.all([
          api.getManufacturers(),
          api.getCategories()
        ]);
        setManufacturers(mansData || []);
        setCategories(catsData || null);
      } catch (error) {
        console.error('Error loading data:', error);
        dataLoadedRef.current = false; 
        setManufacturers([]);
        setCategories(null);
      }
    };

    loadData();
  }, []);

  const buildApiParams = (): ApiParams => {
    const params: ApiParams = {};

    const vehicleTypeToId: { [key: string]: number } = {
      'car': 0,
      'tractor': 1,
      'motorcycle': 2
    };
    
    if (vehicleType && vehicleTypeToId[vehicleType] !== undefined) {
      params.TypeID = vehicleTypeToId[vehicleType];
    }

    if (filters.forRent !== undefined && filters.forRent !== '') {
      params.ForRent = filters.forRent;
    }

    if (filters.manufacturer) {
      if (Array.isArray(filters.manufacturer) && filters.manufacturer.length > 0) {
        if (filters.model) {
          if (Array.isArray(filters.model) && filters.model.length > 0) {
            const manModelPairs: string[] = [];
            const modelArray = filters.model; 
            filters.manufacturer.forEach(manId => {
              modelArray.forEach((modelId: string) => {
                manModelPairs.push(`${manId}.${modelId}`);
              });
            });
            params.Mans = manModelPairs.join('-');
          } else if (typeof filters.model === 'string' && filters.model) {
            params.Mans = filters.manufacturer.map(manId => `${manId}.${filters.model}`).join('-');
          }
        } else {
          params.Mans = filters.manufacturer.join(',');
        }
      } else if (typeof filters.manufacturer === 'string' && filters.manufacturer) {
        if (filters.model) {
          if (Array.isArray(filters.model) && filters.model.length > 0) {
            params.Mans = filters.model.map(modelId => `${filters.manufacturer}.${modelId}`).join('-');
          } else if (typeof filters.model === 'string' && filters.model) {
            params.Mans = `${filters.manufacturer}.${filters.model}`;
          }
        } else {
          params.Mans = filters.manufacturer;
        }
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
      
      let newProducts: Product[] = [];
      let newTotalCount = 0;
      
      // Handle  response 
      if (Array.isArray(response)) {
        newProducts = response;
        newTotalCount = response.length;
      } else if (response && typeof response === 'object') {
        if ('data' in response && Array.isArray((response as any).data)) {
          newProducts = (response as any).data;
          newTotalCount = (response as any).total || (response as any).data.length;
        } else if ('items' in response && Array.isArray((response as any).items)) {
          newProducts = (response as any).items;
          newTotalCount = (response as any).total || (response as any).items.length;
        } else if ('data' in response && (response as any).data && 'items' in (response as any).data && Array.isArray((response as any).data.items)) {
          newProducts = (response as any).data.items;
          newTotalCount = (response as any).data.meta?.total || (response as any).data.items.length;
        }
      }
      
      setTotalCount(newTotalCount);
      
      // Fetch models 
      if (filters.manufacturer) {
        const selectedManIds: string[] = [];
        if (Array.isArray(filters.manufacturer) && filters.manufacturer.length > 0) {
          selectedManIds.push(...filters.manufacturer.map(id => String(id)));
        } else if (typeof filters.manufacturer === 'string' && filters.manufacturer) {
          selectedManIds.push(filters.manufacturer);
        }
        
        if (selectedManIds.length > 0) {
          const fetchModelsForManufacturers = async () => {
            const newModelsMap = new Map(modelsMap);
            const promises = selectedManIds.map(async (manId) => {
              if (!newModelsMap.has(manId)) {
                try {
                  const modelsData = await api.getModels(manId);
                  let models: Model[] = [];
                  if (Array.isArray(modelsData)) {
                    models = modelsData;
                  } else if (modelsData && Array.isArray(modelsData.data)) {
                    models = modelsData.data;
                  }
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
        } else {
          setModelsMap(new Map());
        }
      } else {
        setModelsMap(new Map());
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

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProducts();
  };

  const handleSortChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return {
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
    itemsPerPage,
    handleFilterChange,
    handleSearch,
    handleSortChange,
    handlePageChange,
    setVehicleType,
  };
};

