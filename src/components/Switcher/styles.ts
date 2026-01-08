import styled from 'styled-components';

export const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  border-bottom: 1px solid #E2E5EB;
  width: 250px;
`;

export const VehicleIcon = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  height: 48px;
  flex: 1;
  gap: 4px;
  transition: all 0.2s;
  position: relative;
  background: ${props => props.isActive ? '#FFF' : 'transparent'};
  border-bottom: ${props => props.isActive ? '1px solid #FD4100' : 'transparent'};
  font-size: 24px;
  border-right: 1px solid #E2E5EB;
 
  &:first-child {
    border-top-left-radius: 12px;
  }
  &:last-child {
    border-right: none;
   border-top-right-radius: 12px;
  }
`;

export const VehicleIconImage = styled.img`
  width: 28px;
  height: 14px;
  object-fit: contain;
`;