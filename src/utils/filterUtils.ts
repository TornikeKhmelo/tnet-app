import { Filters } from '../types';

export const countActiveFilters = (filters: Filters): number => {
  let count = 0;

  if (filters.manufacturer) {
    if (Array.isArray(filters.manufacturer) && filters.manufacturer.length > 0) {
      count += filters.manufacturer.length;
    } else if (typeof filters.manufacturer === 'string' && filters.manufacturer) {
      count += 1;
    }
  }

  if (filters.model) {
    if (Array.isArray(filters.model) && filters.model.length > 0) {
      count += filters.model.length;
    } else if (typeof filters.model === 'string' && filters.model) {
      count += 1;
    }
  }

  if (filters.category) {
    if (Array.isArray(filters.category) && filters.category.length > 0) {
      count += filters.category.length;
    } else if (typeof filters.category === 'string' && filters.category) {
      count += 1;
    }
  }

  if (filters.priceFrom || filters.priceTo) {
    count += 1;
  }

  return count;
};

export const removeFilter = (
  filters: Filters,
  type: string,
  value?: string
): Filters => {
  const newFilters = { ...filters };

  if (type === 'forRent') {
    newFilters.forRent = value || (filters.forRent === '1' ? '0' : '1');
  } else if (type === 'manufacturer') {
    if (value) {
      if (Array.isArray(newFilters.manufacturer)) {
        const filtered = newFilters.manufacturer.filter((id) => String(id) !== value);
        newFilters.manufacturer = filtered.length > 0 ? filtered : '';
      } else if (String(newFilters.manufacturer) === value) {
        newFilters.manufacturer = '';
      }
    } else {
      newFilters.manufacturer = '';
    }
  } else if (type === 'model') {
    if (value) {
      if (Array.isArray(newFilters.model)) {
        const filtered = newFilters.model.filter((id) => String(id) !== value);
        newFilters.model = filtered.length > 0 ? filtered : '';
      } else if (String(newFilters.model) === value) {
        newFilters.model = '';
      }
    } else {
      newFilters.model = '';
    }
  } else if (type === 'category') {
    if (value) {
      if (Array.isArray(newFilters.category)) {
        const filtered = newFilters.category.filter((id) => String(id) !== value);
        newFilters.category = filtered.length > 0 ? filtered : '';
      } else if (String(newFilters.category) === value) {
        newFilters.category = '';
      }
    } else {
      newFilters.category = '';
    }
  } else if (type === 'price') {
    newFilters.priceFrom = '';
    newFilters.priceTo = '';
  }

  return newFilters;
};
