import axios from 'axios';

const API_BASE = 'https://api2.myauto.ge/ka';
const STATIC_BASE = 'https://static.my.ge/myauto';

export const api = {
  //list
  getManufacturers: async () => {
    const response = await axios.get(`${STATIC_BASE}/js/mans.json`);
    return response.data;
  },

  // models by ID
  getModels: async (manId) => {
    const response = await axios.get(`${API_BASE}/getManModels?man_id=${manId}`);
    return response.data;
  },

  //categories
  getCategories: async () => {
    const response = await axios.get(`${API_BASE}/cats/get`);
    return response.data;
  },

  // Build query params helper
  buildQueryParams: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.ForRent !== undefined) {
      queryParams.append('ForRent', params.ForRent);
    }
    if (params.Mans) {
      queryParams.append('Mans', params.Mans);
    }
    if (params.Cats) {
      queryParams.append('Cats', params.Cats);
    }
    if (params.PriceFrom) {
      queryParams.append('PriceFrom', params.PriceFrom);
    }
    if (params.PriceTo) {
      queryParams.append('PriceTo', params.PriceTo);
    }
    if (params.CurrencyID !== undefined) {
      queryParams.append('CurrencyID', params.CurrencyID);
    }
    if (params.Period) {
      queryParams.append('Period', params.Period);
    }
    if (params.SortOrder) {
      queryParams.append('SortOrder', params.SortOrder);
    }
    if (params.Page) {
      queryParams.append('Page', params.Page);
    }
    if (params.TypeID !== undefined) {
      queryParams.append('TypeID', params.TypeID);
    }

    return queryParams;
  },

  // with filters
  getProducts: async (params = {}) => {
    const queryParams = api.buildQueryParams(params);

    try {
      const response = await axios.get(`${API_BASE}/products/?${queryParams.toString()}`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Get products count
  getProductsCount: async (params = {}) => {
    const queryParams = api.buildQueryParams(params);

    try {
      const response = await axios.get(`${API_BASE}/products/count?${queryParams.toString()}`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error('API Count Error:', error);
      throw error;
    }
  },

  // imgs
  getProductImageUrl: (product) => {
    if (!product.photo || !product.product_id) return '';
    return `${STATIC_BASE}/photos/${product.photo}/thumbs/${product.product_id}_1.jpg?v=${product.photo_ver || ''}`;
  }
};

