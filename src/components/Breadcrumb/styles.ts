import styled from 'styled-components';

export const BreadcrumbContainer = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  font-weight: 400;
  font-family: 'Helvetica Neue LT GEO', sans-serif;
    @media (max-width: 768px) {
   max-width: 400px;
   margin: 0 auto;
   margin-bottom: 20px;
   padding: 0 16px
  }
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