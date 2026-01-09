import { useState } from 'react';
import { Filters } from '../types';

export const useFilters = () => {
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
  const [vehicleType, setVehicleType] = useState('car');

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return {
    filters,
    vehicleType,
    setVehicleType,
    handleFilterChange,
  };
};

