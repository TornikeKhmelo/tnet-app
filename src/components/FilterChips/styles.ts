import styled from 'styled-components';

export const FilterChipsContainer = styled.div`
  display: flex;
  gap: 8px;
  max-width:400px;
  overflow-x: auto;
  padding: 8px 12px;

  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none;
  }
     @media (min-width: 769px) {
    display: none;
  }
`;
export const FilterChip = styled.div`
  flex-shrink: 0; 
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 9999px;
  background: #FFF;
  color: #1c1c1c;
  font-size: 13px;

  button {
    border: none;
    width: 16px;
    height: 16px;
    background: #F2F2F6;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

