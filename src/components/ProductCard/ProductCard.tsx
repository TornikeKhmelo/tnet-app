import { Product, Manufacturer, Model } from '../../types';
import BottomInfo from './BottomInfo';
import ManDescription from './ManDescription';
import { CardContainer,ImageContainer,CarImage,ContentWrapper, } from './styles';
import TopInfo from './TopInfo';

interface ProductCardProps {
  product: Product;
  manufacturers?: Manufacturer[];
  models?: Model[];
  currency?: string;
}
const ProductCard = ({ product, manufacturers = [], models = [], currency = 'GEL' }: ProductCardProps) => {
  const imageUrl = product.photo 
    ? `https://static.my.ge/myauto/photos/${product.photo}/thumbs/${product?.daily_views?.product_id}_1.jpg?v=${product.photo_ver || ''}`
    : '';
 
  return (
    <CardContainer>
      <ImageContainer>
        {imageUrl && <CarImage src={imageUrl} alt={product.title || 'Car'} />}
      </ImageContainer>
      <ContentWrapper>
        <TopInfo product={product} manufacturers={manufacturers} models={models} />
        <ManDescription product={product} currency={currency} />
        <BottomInfo product={product} />
      </ContentWrapper>
    </CardContainer>
  );
};

export default ProductCard;
