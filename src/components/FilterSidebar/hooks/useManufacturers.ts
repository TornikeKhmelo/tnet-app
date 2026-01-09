import { useEffect, useRef, useState } from 'react';
import { Filters, Manufacturer } from '../../../types';

interface UseManufacturersParams {
  filters: Filters;
  manufacturers: Manufacturer[];
  onFilterChange: (filters: Filters) => void;
}

export const useManufacturers = ({
  filters,
  manufacturers,
  onFilterChange,
}: UseManufacturersParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (filters.manufacturer) {
      if (Array.isArray(filters.manufacturer)) {
        setSelectedManufacturers(filters.manufacturer);
      } else {
        setSelectedManufacturers([filters.manufacturer]);
      }
    } else {
      setSelectedManufacturers([]);
    }
  }, [filters.manufacturer]);

  const handleToggle = (manId: string) => {
    setSelectedManufacturers((prev) =>
      prev.includes(manId) ? prev.filter((id) => id !== manId) : [...prev, manId],
    );
  };

  const handleSelect = () => {
    onFilterChange({ ...filters, manufacturer: selectedManufacturers });
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredManufacturers = manufacturers.filter((man) =>
    man.man_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return {
    isOpen,
    selectedManufacturers,
    searchTerm,
    dropdownRef,
    filteredManufacturers,
    setIsOpen,
    setSearchTerm,
    handleToggle,
    handleSelect,
  };
};

