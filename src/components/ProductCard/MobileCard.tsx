import React from 'react'
import { CustomsText, InfoRow, CurrencyBadge } from './styles'
import { MobileActions, Price, Title } from './styles'
import { formatPrice } from './constants'
import { Product } from '../../types'

const MobileCard = ({product, resolvedModelName, currency}: {product: Product, resolvedModelName: string, currency: string}) => {
  return (
    <MobileActions>
        <div className="flex items-center gap-2">
            <Title>{resolvedModelName}</Title>
            <span className="text-xs" color='#6F7383'>{product.prod_year} წ</span>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Price>
              {formatPrice(
                currency === 'USD' 
                ? (product.price_usd || product.price || product.price_value || 0)
                : (product.price_value || product.price || product.price_usd || 0),
              )}
            </Price>
            <CurrencyBadge>{currency === 'USD' ? '$' : '₾'}</CurrencyBadge>
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
      </MobileActions>
  )
}

export default MobileCard
