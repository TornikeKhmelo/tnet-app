import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  margin-top: 20px;
`;

export const PaginationButton = styled.button<{ isActive?: boolean; disabled?: boolean }>`
  min-width: 32px;
  height: 32px;
  padding: 0 12px;
  border: none;
  background: ${props => props.isActive ? '#4A4A4A' : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.disabled ? '#ccc' : '#333'};
  font-size: 14px;
  font-weight: ${props => props.isActive ? '600' : '400'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${props => props.isActive ? '#333' : '#f5f5f5'};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const PageNumber = styled(PaginationButton)`
  font-family: 'Helvetica Neue LT GEO', sans-serif;
`;