import styled from 'styled-components';

export const MobileDrawerOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileDrawer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  z-index: 9999;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileDrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #E2E5EB;
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #272A37;
    margin: 0;
    padding-left: 4px;
  }
`;

export const MobileCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #272A37;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

export const MobileDrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`;

export const MobileFiltersContainer = styled.div`
  padding: 20px 16px;
`;

export const MobileSearchButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #fd4100;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.2s;
  position: sticky;
  bottom: 0;

  &:hover {
    background: #e55a00;
  }

  &:active {
    background: #cc4a00;
  }
`;

export const FilterButtonStyled = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  border: 1px solid #E2E5EB;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #272A37;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    background: #f5f5f5;
  }

  svg {
    flex-shrink: 0;
  }

  .badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #fd4100;
    color: white;
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 10px;
    font-weight: 600;
    min-width: 18px;
    text-align: center;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

