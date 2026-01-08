import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownButton = styled.button<{ isOpen: boolean, minWidth?: string }>`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  color: #333;
  transition: border-color 0.2s;
  box-sizing: border-box;
  min-width: ${props => props.minWidth ? props.minWidth : '140px'};
  &:hover {
    border-color: ${props => props.isOpen ? '#4A90E2' : '#999'};
  }
`;

export const DropdownText = styled.span`
  flex: 1;
`;

export const ChevronIcon = styled.img<{ isOpen: boolean }>`
  width: 8px;
  height: 5px;
  transition: transform 0.2s;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  margin-left: 8px;
  flex-shrink: 0;
`;

export const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E2E5EB;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

export const DropdownItem = styled.button<{ isSelected?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: ${props => props.isSelected ? '#f5f5f5' : 'white'};
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
