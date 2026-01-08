import styled from 'styled-components';
export const FiltersContainer = styled.div`
  background: white;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
`;
export const SidebarContainer = styled.div`
  width: 250px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  border: 1px solid #E2E5EB;
  height: fit-content;
  z-index: 99999;
`;

export const FilterGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #272A37;
  margin-bottom: 8px;
`;
export const PriceInputs = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #C2C9D8;
  border-radius: 8px;
  font-size: 14px;
  max-width: 94px;

  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #fd4100;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.2s;

  &:hover {
    background: #e55a00;
  }
`;

export const CurrencySwitcher = styled.div`
  display: flex;
  gap: 0;
  align-items: center;
  margin-bottom: 8px;
  background: white;
  border-radius: 1000px;
  border: 1px solid #E2E5EB;
  width: fit-content;
`;

export const CurrencyButton = styled.button<{ isActive: boolean }>`
  // min-width: 24px;
  min-width: ${props => props.isActive ? '32px' : '24px'};
  // height: 24px;
  height: ${props => props.isActive ? '32px' : '24px'};
  border-radius: 50%;
  border: none;
  background: ${props => props.isActive ? '#272A37' : 'transparent'};
  color: ${props => props.isActive ? 'white' : '#8C929B'};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
`;

export const PriceLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  min-height: 48px;

`;

export const MultiSelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

export    const MultiSelectInput = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid #C2C9D8;
  font-size: 14px;
  background: #FFF;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 42px;
  border-radius: 8px;

  &:focus-within {
    border-color: #C2C9D8;
  }
`;

export const MultiSelectInputText = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 12px;
  background: transparent;
  cursor: pointer;
  color: #272A37;
  font-weight: 500;

  &::placeholder {
    color: #999;
  }
`;

export const ChevronIcon = styled.img<{ isOpen: boolean }>`
  width: 8px;
  height: 5px;
  transition: transform 0.2s;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  flex-shrink: 0;
`;

export const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 4px;
  max-height: 385px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
  padding: 8px 0;
  min-width: 320px;
  z-index: 1000;
`;

export const DropdownItem = styled.label`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 13px;
  color: #1B1D25;
  width: 100%;

  &:hover {
    background: #f5f5f5;
  }
  
  span {
    flex: 1;
  }
`;



export const Checkbox = styled.input`
  margin-right: 12px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #1aba6b;
  flex-shrink: 0;
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid #e9eaeb;
  border-radius: 3px;
  position: relative;

  &:hover {
    accent-color: #1aba6b;

  }

  &:checked {
    background-color: #1aba6b;
    border-color: #1aba6b;
  }

  &:checked::after {
    content: '';
    position: absolute;
    left: 5px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

export const SelectButton = styled.button`
  width: calc(100% - 100px);
  padding: 12px;
  background: #272a37;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  margin: 8px;
  transition: background 0.2s;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #333;
  }
`;

export const DropdownContent = styled.div`
  max-height: 270px;
  overflow-y: auto;
`;

export const ToggleSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ToggleLabel = styled.span<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: ${props => props.isActive ? '500' : '400'};
  color: ${props => props.isActive ? '#272A37' : '#93959B'};
  cursor: pointer;
  transition: color 0.2s;
  user-select: none;
`;

export  const ToggleSwitch = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 30px;
  height: 18px;
  background: #272A37;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${props => props.isActive ? '2px' : '15px'};
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    transition: left 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;