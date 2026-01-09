import React from 'react';
import { Filters } from '../../types';
import { FilterGroup, ToggleSwitchContainer, ToggleLabel, ToggleSwitch } from './styles';

interface ForRentToggleProps {
  filters: Filters;
  onToggle: () => void;
}

export const ForRentToggle: React.FC<ForRentToggleProps> = ({ filters, onToggle }) => {
  const isSellActive = filters.forRent === '0' || !filters.forRent;
  const isRentActive = filters.forRent === '1';

  return (
    <FilterGroup>
      <ToggleSwitchContainer>
        <ToggleLabel isActive={isSellActive} onClick={onToggle}>
          იყიდება
        </ToggleLabel>
        <ToggleSwitch isActive={isSellActive} onClick={onToggle} />
        <ToggleLabel isActive={isRentActive} onClick={onToggle}>
          ქირავდება
        </ToggleLabel>
      </ToggleSwitchContainer>
    </FilterGroup>
  );
};


