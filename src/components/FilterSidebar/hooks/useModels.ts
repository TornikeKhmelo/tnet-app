import { useEffect, useRef, useState } from 'react';
import { api } from '../../../services/api';
import { Filters, Manufacturer, Model } from '../../../types';

interface UseModelsParams {
  filters: Filters;
  manufacturers: Manufacturer[];
  selectedManufacturers: string[];
  onFilterChange: (filters: Filters) => void;
}

export const useModels = ({
  filters,
  manufacturers,
  selectedManufacturers,
  onFilterChange,
}: UseModelsParams) => {
  const [modelsByManufacturer, setModelsByManufacturer] = useState<Map<string, Model[]>>(new Map());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const manufacturerIds = selectedManufacturers.map((id) => String(id));

        if (manufacturerIds.length === 0) {
          setModelsByManufacturer(new Map());
          return;
        }

        const newModelsMap = new Map(modelsByManufacturer);
        const manufacturersToFetch = manufacturerIds.filter((manId) => !newModelsMap.has(manId));

        const promises = manufacturersToFetch.map(async (manId) => {
          try {
            const modelsData = await api.getModels(manId);
            const models: Model[] = (modelsData as any)?.data || [];
            newModelsMap.set(manId, models);
          } catch (error) {
            console.error(`Error loading models for manufacturer ${manId}:`, error);
            newModelsMap.set(manId, []);
          }
        });

        await Promise.all(promises);

        if (manufacturerIds.length > 0 || promises.length > 0) {
          setModelsByManufacturer(newModelsMap);
        }
      } catch (error) {
        console.error('Error loading models:', error);
        setModelsByManufacturer(new Map());
      }
    };

    loadModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedManufacturers]);

  useEffect(() => {
    if (filters.model) {
      if (Array.isArray(filters.model)) {
        setSelectedModels(filters.model);
      } else {
        setSelectedModels([filters.model]);
      }
    } else {
      setSelectedModels([]);
    }
  }, [filters.model]);

  const handleToggle = (modelId: string) => {
    const newSelectedModels = selectedModels.includes(modelId)
      ? selectedModels.filter((id) => id !== modelId)
      : [...selectedModels, modelId];

    setSelectedModels(newSelectedModels);
    onFilterChange({ ...filters, model: newSelectedModels.length > 0 ? newSelectedModels : '' });
  };

  const handleSelect = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  const getAllModels = (): Array<{ manufacturer: Manufacturer; models: Model[] }> => {
    const result: Array<{ manufacturer: Manufacturer; models: Model[] }> = [];
    selectedManufacturers.forEach((manId) => {
      const manufacturer = manufacturers.find((m) => String(m.man_id) === manId);
      const models = modelsByManufacturer.get(manId) || [];
      if (manufacturer && models.length > 0) {
        result.push({ manufacturer, models });
      }
    });
    return result;
  };

  const filteredModelsByManufacturer = getAllModels()
    .map(({ manufacturer, models }) => ({
      manufacturer,
      models: models.filter((model) =>
        model.model_name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter(({ models }) => models.length > 0);

  return {
    modelsByManufacturer,
    isOpen,
    selectedModels,
    searchTerm,
    dropdownRef,
    filteredModelsByManufacturer,
    setIsOpen,
    setSearchTerm,
    handleToggle,
    handleSelect,
  };
};

