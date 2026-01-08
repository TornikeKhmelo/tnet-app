import styled from 'styled-components';

export const SpecIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const CardContainer = styled.div`
background: white;
border-radius: 8px;
margin-bottom: 16px;
padding: 16px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
transition: box-shadow 0.2s;
display: flex;
gap: 16px;

&:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  flex-direction: column;
  padding: 12px;
  gap: 12px;
}
`;

export const ImageContainer = styled.div`
position: relative;
width: 182px;
height: 144px;
border-radius: 8px;
overflow: hidden;
background: #f0f0f0;
flex-shrink: 0;

@media (max-width: 768px) {
  width: 100%;
  height: 200px;
}
`;

export const CarImage = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;



export const ContentWrapper = styled.div`
flex: 1;
display: flex;
flex-direction: column;
min-width: 0;
`;

export const VIPBadge = styled.div`
background: #4A6CFA;
color: white;
padding: 4px 8px;
font-size: 10px;
font-weight: 700;
font-family: 'Helvetica Neue LT GEO', sans-serif;
border-radius:100px
`;

export const Title = styled.h3`
font-size: 14px;
font-weight: 500;
color:#272A37;
font-family: 'TBC Sailec', sans-serif;
`;

export const InfoRow = styled.div`
display: flex;
align-items: center;
gap: 16px;
flex-wrap: wrap;
`;

export const InfoItem = styled.span`
color: #666;
`;

export const CustomsText = styled.span<{ isPassed: boolean }>`
color: ${props => props.isPassed ? '#26B753' : '#FF3B30'};
font-weight: 500;
font-size: 11px;
font-family: 'TBC Sailec', sans-serif;
`;

export const Specs = styled.div`
display: flex;
gap: 16px;
margin-bottom: 12px;
font-size: 12px;
color: #1B1D25;
flex-wrap: wrap;
max-width:400px
`;

export const SpecItem = styled.div`
display: flex;
align-items: center;
gap: 4px;
min-width: 180px
`;


export const Price = styled.div`
font-size: 20px;
font-weight: 500;
color: #272A37;

@media (max-width: 768px) {
  display: none;
}
`;

export const StatusTags = styled.div`
display: flex;
gap: 12px;
margin-top: auto;
padding-top: 12px;
flex-wrap: wrap;
`;

export const StatusTag = styled.div`
display: flex;
align-items: center;
gap: 4px;
font-size: 12px;
color: #666;
`;

export const StatusIcon = styled.img`
width: 16px;
height: 16px;
`;

export const BottomRow = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 12px;
`;

export const Meta = styled.div`
font-size: 12px;
color: #999;
`;

export const Actions = styled.div`
display: flex;
gap: 12px;
align-items: center;
`;

export const ActionButton = styled.button`
background: none;
border: none;
cursor: pointer;
padding: 4px;
display: flex;
align-items: center;
justify-content: center;
transition: opacity 0.2s;

&:hover {
  opacity: 0.7;
}
`;

export const ActionIcon = styled.img`
width: 16px;
height: 16px;
`;