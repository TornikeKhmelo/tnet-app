import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { Manufacturer, CategoriesResponse } from '../types';

export const useStaticData = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [categories, setCategories] = useState<CategoriesResponse | null>(null);
  const dataLoadedRef = useRef(false);

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

  return {
    manufacturers,
    categories,
  };
};

