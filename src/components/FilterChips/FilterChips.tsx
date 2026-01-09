import React from 'react';
import { Filters, Manufacturer, CategoriesResponse, Model } from '../../types';
import { FilterChip,FilterChipsContainer } from './styles';





interface FilterChipsProps {
  filters: Filters;
  manufacturers: Manufacturer[];
  categories: CategoriesResponse | null;
  modelsMap: Map<string, Model[]>;
  onRemoveFilter: (type: string, value?: string) => void;
}

const FilterChips = ({
  filters,
  manufacturers,
  categories,
  modelsMap,
  onRemoveFilter,
}: FilterChipsProps) => {
  const chips: Array<{ id: string; label: string; type: string; value?: string; canDelete?: boolean }> = [];

  const forRentLabel = filters.forRent === '1' ? 'ქირავდება' : 'იყიდება';
  chips.push({
    id: 'forRent',
    label: forRentLabel,
    type: 'forRent',
    canDelete: false,
  });

  // Manufacturer chips
  if (filters.manufacturer) {
    const manufacturerIds = Array.isArray(filters.manufacturer)
      ? filters.manufacturer
      : [filters.manufacturer];

    manufacturerIds.forEach((manId) => {
      const manufacturer = manufacturers.find((m) => String(m.man_id) === String(manId));
      if (manufacturer) {
        chips.push({
          id: `manufacturer-${manId}`,
          label: manufacturer.man_name,
          type: 'manufacturer',
          value: String(manId),
        });
      }
    });
  }

  // Model chips
  if (filters.model) {
    const modelIds = Array.isArray(filters.model) ? filters.model : [filters.model];

    modelIds.forEach((modelId) => {
      // Find model across all manufacturers
      let model: Model | undefined;
      modelsMap.forEach((models) => {
        const found = models.find((m) => String(m.model_id) === String(modelId));
        if (found) model = found;
      });

      if (model) {
        chips.push({
          id: `model-${modelId}`,
          label: model.model_name,
          type: 'model',
          value: String(modelId),
        });
      }
    });
  }

  // Category chips
  if (filters.category) {
    const categoryIds = Array.isArray(filters.category)
      ? filters.category
      : [filters.category];

    categoryIds.forEach((catId) => {
      const category = categories?.data?.find((c) => String(c.category_id) === String(catId));
      if (category) {
        chips.push({
          id: `category-${catId}`,
          label: category.title,
          type: 'category',
          value: String(catId),
        });
      }
    });
  }

  // Price chip
  if (filters.priceFrom || filters.priceTo) {
    const priceLabel = filters.priceFrom && filters.priceTo
      ? `${filters.priceFrom} - ${filters.priceTo}`
      : filters.priceFrom
      ? `≥ ${filters.priceFrom}`
      : `≤ ${filters.priceTo}`;
    chips.push({
      id: 'price',
      label: `ფასი: ${priceLabel}`,
      type: 'price',
    });
  }

  if (chips.length === 0) return null;

  const handleRemove = (chip: typeof chips[0]) => {
    onRemoveFilter(chip.type, chip.value);
  };

  const handleToggleForRent = () => {
    const newForRent = filters.forRent === '1' ? '0' : '1';
    onRemoveFilter('forRent', newForRent);
  };

  return (
    <FilterChipsContainer>
      {chips.map((chip) => {
        const isForRentChip = chip.type === 'forRent';
        return (
          <FilterChip key={chip.id}>
            <span 
              onClick={isForRentChip ? handleToggleForRent : undefined}
              style={{ 
                cursor: isForRentChip ? 'pointer' : 'default',
                userSelect: 'none'
              }}
            >
              {chip.label}
            </span>
            {!isForRentChip && (
              <button onClick={() => handleRemove(chip)}>×</button>
            )}
          </FilterChip>
        );
      })}
    </FilterChipsContainer>
  );
  
};

export default FilterChips;

