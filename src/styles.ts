import styled from 'styled-components';
 export const AppContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
`;



 export const StatsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    max-width: 400px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
`;

 export const StatsText = styled.span`
  font-size: 16px;
  color: #272A37;
  font-weight: 400;
  font-family: 'Helvetica Neue LT GEO', sans-serif;
`;

 export const DropdownWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;




 export const MainContent = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 0;
  }
`;
 export const ContentWrapper = styled.div`
max-width: 1080px;
margin: 0 auto;
`;

 export const ProductsContainer = styled.div`
  flex: 1;
`;

 export const ProductsGrid = styled.div<{ isLoading?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: ${props => props.isLoading ? 0.5 : 1};
  transition: opacity 0.3s ease;
  pointer-events: ${props => props.isLoading ? 'none' : 'auto'};
  @media (max-width: 768px) {
  padding: 0 16px
  }
`;

 export const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
`;

 export const ErrorText = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #ff0000;
`;

 export const EmptyText = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
`;