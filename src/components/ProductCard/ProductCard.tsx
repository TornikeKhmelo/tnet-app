import { Product, Manufacturer, Model } from '../../types';
import { resolveModelName } from '../../utils/productUtils';
import BottomInfo from './BottomInfo';
import { formatPrice } from './constants';
import ManDescription from './ManDescription';
import MobileCard from './MobileCard';
import { CardContainer,ImageContainer,CarImage,ContentWrapper, MobileActions, Title, InfoRow, CustomsText, Price, } from './styles';
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
    const resolvedModelName = resolveModelName(product, manufacturers, models);
  return (
    <CardContainer>
      <MobileCard product={product} resolvedModelName={resolvedModelName} currency={currency} />
      <ImageContainer>
        {imageUrl && <CarImage src={imageUrl} alt={product.title || 'Car'} />}
      </ImageContainer>
      <ContentWrapper>
        <TopInfo product={product}  resolvedModelName={resolvedModelName} />
        <ManDescription product={product} currency={currency} />
        <BottomInfo product={product} />
      </ContentWrapper>
    </CardContainer>
  );
};

export default ProductCard;
