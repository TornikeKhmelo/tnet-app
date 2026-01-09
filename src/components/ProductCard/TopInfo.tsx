import React from 'react'
import { CustomsText, InfoRow, Title } from './styles'
import { Manufacturer, Model, Product } from '../../types'
import { resolveModelName } from '../../utils/productUtils'

const TopInfo = ({product, manufacturers, models}: {product: Product, manufacturers: Manufacturer[], models: Model[]}) => {
  const resolvedModelName = resolveModelName(product, manufacturers, models);
  return (
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
  )
}

export default TopInfo