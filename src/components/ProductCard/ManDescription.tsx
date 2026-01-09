import React from 'react'
import { DesktopActions, Price, SpecIcon, SpecItem, Specs, CurrencyBadge } from './styles'
import { Product } from '../../types'
import { formatPrice, fuelTypes, gearTypes } from './constants'

const ManDescription = ({product, currency}: {product: Product, currency: string}) => {
  return (
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
      <DesktopActions>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Price>
            {formatPrice(
              currency === 'USD' 
              ? (product.price_usd || product.price || product.price_value || 0)
              : (product.price_value || product.price || product.price_usd || 0),
              currency
            )}
          </Price>
          <CurrencyBadge>{currency === 'USD' ? '$' : '₾'}</CurrencyBadge>
        </div>
      </DesktopActions>
    </div>
  )
}

export default ManDescription
