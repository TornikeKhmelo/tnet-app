import React from 'react';
import { FilterButtonStyled } from './mobileStyles';

interface FilterButtonProps {
  onClick: () => void;
  activeFiltersCount?: number;
}

const FilterButton = ({ onClick, activeFiltersCount }: FilterButtonProps) => {
  return (
    <FilterButtonStyled onClick={onClick}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.5 5H17.5M5 10H15M7.5 15H12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span>ფილტრი</span>
      {activeFiltersCount && activeFiltersCount > 0 && (
        <span className="badge">{activeFiltersCount}</span>
      )}
    </FilterButtonStyled>
  );
};

export default FilterButton;

