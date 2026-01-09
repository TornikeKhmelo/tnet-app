import React from 'react'
import { BottomRow, Meta, VIPBadge } from './styles'
import { formatDate } from './constants'
import ActionButtons from './ActionButtons'
import { Product } from '../../types'

interface BottomInfoProps {
  product: Product
}

const BottomInfo = ({ product }: BottomInfoProps) => {
  return (
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
   <ActionButtons />
  </BottomRow>
  )
}

export default BottomInfo
