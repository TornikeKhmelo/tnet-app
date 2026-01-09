import { Product, Model, Manufacturer } from '../types';

export const getProductModels = (
  product: Product,
  modelsMap: Map<string, Model[]>
): Model[] => {
  if (!product.man_id) {
    return [];
  }
  const productManId = String(product.man_id);
  return modelsMap.get(productManId) || [];
};

export const getProductKey = (product: Product): string | number => {
  return product.product_id || product.id || '';
};

export const resolveModelName = (
  product: Product,
  manufacturers: Manufacturer[],
  models: Model[]
): string => {
  const matchedManufacturer = product.man_id
    ? manufacturers.find((m) => String(m.man_id) === String(product.man_id))
    : null;

  const matchedModel = product.model_id
    ? models.find((m) => String(m.model_id) === String(product.model_id))
    : null;

  if (matchedModel?.model_name) {
    return `${matchedManufacturer?.man_name || ''} ${matchedModel.model_name}`.trim();
  }

  return `${matchedManufacturer?.man_name || ''} ${product.car_model || ''}`.trim();
};
