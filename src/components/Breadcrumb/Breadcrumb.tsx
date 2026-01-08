import React from 'react'
import { BreadcrumbContainer, BreadcrumbLink } from './styles';

const Breadcrumb = () => {
  return (
    <BreadcrumbContainer>
    <BreadcrumbLink>მთავარი</BreadcrumbLink>
    <BreadcrumbLink>ძიება</BreadcrumbLink>
    <BreadcrumbLink active>იყიდება</BreadcrumbLink>
  </BreadcrumbContainer>
  )
}

export default Breadcrumb
