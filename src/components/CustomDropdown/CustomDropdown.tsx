import React, { useState, useRef, useEffect } from 'react';
import { DropdownContainer, DropdownButton, DropdownText, ChevronIcon, DropdownMenu, DropdownItem } from './styles';
import { CustomDropdownProps } from '../../types';



const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'აირჩიეთ',
  hideSelected = false,
  minWidth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);
  const displayOptions = hideSelected 
    ? options.filter(opt => opt.value !== value)
    : options;

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton
        type="button"
        isOpen={isOpen}
        minWidth={minWidth}
        onClick={() => setIsOpen(!isOpen)}
      >
        <DropdownText>
          {selectedOption ? selectedOption.label : placeholder}
        </DropdownText>
        <ChevronIcon 
          src="/chevron.svg" 
          alt="Dropdown" 
          isOpen={isOpen}
        />
      </DropdownButton>
      <DropdownMenu isOpen={isOpen}>
        {displayOptions.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            isSelected={option.value === value}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default CustomDropdown;

