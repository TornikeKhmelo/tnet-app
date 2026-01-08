import styled from 'styled-components';

export const BreadcrumbContainer = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  font-weight: 400;
  font-family: 'Helvetica Neue LT GEO', sans-serif;
`;

export const BreadcrumbLink = styled.span<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#FD4100' : '#6F7383')};
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};


  &::after {
    content: ' > ';
    margin: 0 8px;
    color: #999;
  }

  &:last-child::after {
    content: '';
  }
`;