import { Product, Manufacturer, Model } from '../../types';
import { formatDate, formatPrice, fuelTypes, gearTypes } from './constants';
import { SpecIcon,CardContainer,ImageContainer,CarImage,ContentWrapper,Title,InfoRow,CustomsText,
  Specs,SpecItem,Price,BottomRow,Meta,Actions,ActionButton,ActionIcon,VIPBadge } from './styles';

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
  const matchedManufacturer = product.man_id
    ? manufacturers.find((m) => String(m.man_id) === String(product.man_id))
    : null;
  const matchedModel = product.model_id
    ? models.find((m) => String(m.model_id) === String(product.model_id))
    : null;
  console.log(matchedModel,matchedManufacturer);
  const resolvedModelName = matchedModel?.model_name 
    ? `${matchedManufacturer?.man_name || ''} ${matchedModel.model_name}`.trim()
    : `${matchedManufacturer?.man_name || ''} ${product.car_model || ''}`.trim();
  return (
    <CardContainer>
      <ImageContainer>
        {imageUrl && <CarImage src={imageUrl} alt={product.title || 'Car'} />}
      </ImageContainer>
      
      <ContentWrapper>
        <div className="flex justify-between items-center gap-2 mb-4">
          <div className="flex items-center gap-2">
            {product.for_rent && (
            <div className="p-1 border rounded-lg text-xs" color='#272A37'>
              ქირავდება
            </div>
            )}
            <Title>{resolvedModelName}</Title>
            <span>{product.prod_year} წ</span>
          </div>

          <InfoRow>
            {product.customs_passed ? (
              <CustomsText isPassed={true}>განბაჟებული</CustomsText>
            ) : (
                <CustomsText isPassed={false}>
                  განბაჟება 1000 ₾
                </CustomsText>
            )}
            <img src="/flagGeo.svg" alt="Location" />
            <p className="font-norma text-xs" color='#6F7383'>თბილისი</p>
          </InfoRow>
        </div>
        <div className="flex justify-between items-start gap-2">
        <Specs>
          {(product.fuel_type_id) && (
              <SpecItem>
                <SpecIcon src="/motor.svg" alt="Engine" />
                <span>{product.engine_volume ? `${(product.engine_volume / 1000).toFixed(1)}` : ''}</span>
                <span>
                 {fuelTypes[product.fuel_type_id as keyof typeof fuelTypes]}
                </span>
              </SpecItem>
          )}
          {product.car_run && (
            <SpecItem>
              <SpecIcon src="/speed.svg" alt="Odometer" />
              <span>{product.car_run.toLocaleString('ka-GE')} კმ</span>
            </SpecItem>
          )}
          {(product.gear_type_id) && (
            <SpecItem>
              <SpecIcon src="/avtomatic.svg" alt="Gearbox" />
              <span>
              {gearTypes[product.gear_type_id as keyof typeof gearTypes]}
              </span>
            </SpecItem>
          )}
          {product.right_wheel !== undefined && (
            <SpecItem>
              <SpecIcon src="/sache.svg" alt="Steering" />
              <span>{product.right_wheel ? 'მარჯვენა' : 'მარცხნივ'}</span>
            </SpecItem>
          )}
        </Specs>
        <Price>
          {formatPrice(
            currency === 'USD' 
              ? (product.price_usd || product.price || product.price_value || 0)
              : (product.price_value || product.price || product.price_usd || 0),
            currency
          )}
        </Price>
        </div>
        <BottomRow>
          <div className="flex items-center gap-2">
            {product.alarm && (
            <VIPBadge>
              VIP
            </VIPBadge>
            )}
          <Meta>
            {product.views || 0} ნახვა • {formatDate(
              product?.order_date || product?.daily_views?.insert_Date
            )}
          </Meta>
          </div>
          <Actions>
            <ActionButton title="რედაქტირება">
              <ActionIcon src="/note.svg" alt="Edit" />
            </ActionButton>
            <ActionButton title="შედარება">
              <ActionIcon src="/shedareba.svg" alt="Compare" />
            </ActionButton>
            <ActionButton title="მოწონება">
              <ActionIcon src="/favorite.svg" alt="Favorite" />
            </ActionButton>
          </Actions>
        </BottomRow>
      </ContentWrapper>
    </CardContainer>
  );
};

export default ProductCard;
