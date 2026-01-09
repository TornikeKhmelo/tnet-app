import React from 'react';
import { Manufacturer } from '../../types';
import {
  FilterGroup,
  Label,
  MultiSelectContainer,
  MultiSelectInput,
  MultiSelectInputText,
  ChevronIcon,
  Dropdown,
  DropdownContent,
  DropdownItem,
  Checkbox,
  SelectButton,
} from './styles';

interface ManufacturersHookResult {
  selectedManufacturers: string[];
  searchTerm: string;
  isManufacturerOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  filteredManufacturers: Manufacturer[];
  setIsManufacturerOpen: (open: boolean) => void;
  setSearchTerm: (term: string) => void;
  handleManufacturerToggle: (manId: string) => void;
  handleSelectManufacturers: () => void;
}

interface ManufacturersProps {
  manufacturers: Manufacturer[];
  manufacturerHook: ManufacturersHookResult;
}

const Manufacturers = ({ manufacturers, manufacturerHook }: ManufacturersProps) => {
  const {
    selectedManufacturers,
    searchTerm,
    isManufacturerOpen,
    dropdownRef,
    filteredManufacturers,
    setIsManufacturerOpen,
    setSearchTerm,
    handleManufacturerToggle,
    handleSelectManufacturers,
  } = manufacturerHook;

  const displayValue =
    searchTerm ||
    (selectedManufacturers.length > 0
      ? selectedManufacturers
          .map((id) => {
            const man = manufacturers.find((m) => String(m.man_id) === id);
            return man?.man_name || '';
          })
          .filter(Boolean)
          .join(', ')
      : '');

  return (
    <FilterGroup>
      <Label>მწარმოებელი</Label>
      <MultiSelectContainer ref={dropdownRef}>
        <MultiSelectInput onClick={() => setIsManufacturerOpen(!isManufacturerOpen)}>
          <MultiSelectInputText
            type="text"
            placeholder="მწარმოებელი"
            value={displayValue}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsManufacturerOpen(true);
            }}
            onFocus={() => {
              setIsManufacturerOpen(true);
              setSearchTerm('');
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsManufacturerOpen(true);
            }}
          />
          <ChevronIcon src="/chevron.svg" alt="Dropdown" isOpen={isManufacturerOpen} />
        </MultiSelectInput>
        <Dropdown isOpen={isManufacturerOpen}>
          <DropdownContent>
            {filteredManufacturers.length > 0 ? (
              filteredManufacturers.map((man) => (
                <DropdownItem key={man.man_id}>
                  <Checkbox
                    type="checkbox"
                    checked={selectedManufacturers.includes(String(man.man_id))}
                    onChange={() => handleManufacturerToggle(String(man.man_id))}
                  />
                  <span>{man.man_name}</span>
                </DropdownItem>
              ))
            ) : (
              <div style={{ padding: '12px', textAlign: 'center', color: '#999' }}>
                მწარმოებელი არ მოიძებნა
              </div>
            )}
          </DropdownContent>
          <SelectButton onClick={handleSelectManufacturers}>არჩევა</SelectButton>
        </Dropdown>
      </MultiSelectContainer>
    </FilterGroup>
  );
};

export default Manufacturers;
