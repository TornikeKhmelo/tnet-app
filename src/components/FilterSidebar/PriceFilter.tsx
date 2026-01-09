import React from 'react';
import { Filters } from '../../types';
import { FilterGroup, Label, PriceInputs, Input, PriceLabelRow, CurrencySwitcher, CurrencyButton } from './styles';

interface PriceFilterProps {
  filters: Filters;
  onChange: (field: string, value: string) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({ filters, onChange }) => {
  return (
    <FilterGroup>
      <PriceLabelRow>
        <Label>ფასი</Label>
        <CurrencySwitcher>
          <CurrencyButton
            isActive={filters.currency === 'GEL' || !filters.currency}
            onClick={() => onChange('currency', 'GEL')}
            title="ლარი"
          >
            ₾
          </CurrencyButton>
          <CurrencyButton
            isActive={filters.currency === 'USD'}
            onClick={() => onChange('currency', 'USD')}
            title="დოლარი"
          >
            $
          </CurrencyButton>
        </CurrencySwitcher>
      </PriceLabelRow>
      <PriceInputs>
        <Input
          type="number"
          placeholder="დან"
          value={filters.priceFrom || ''}
          onChange={(e) => onChange('priceFrom', e.target.value)}
        />
        <span>-</span>
        <Input
          type="number"
          placeholder="მდე"
          value={filters.priceTo || ''}
          onChange={(e) => onChange('priceTo', e.target.value)}
        />
      </PriceInputs>
    </FilterGroup>
  );
};


