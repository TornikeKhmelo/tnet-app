export interface Filters {
  forRent: string;
  manufacturer: string | string[];
  model: string | string[];
  category: string | string[];
  priceFrom: string;
  priceTo: string;
  period: string;
  currency?: string;
}

export interface Product {
  product_id?: number;
  id?: number;
  [key: string]: any;
}

export interface ApiParams {
  ForRent?: string;
  Mans?: string;
  Cats?: string;
  PriceFrom?: string;
  PriceTo?: string;
  Period?: string;
  SortOrder?: string;
  Page?: number;
  TypeID?: number;
  CurrencyID?: number;
}

export interface Manufacturer {
  man_id: string | number;
  man_name: string;
  man_title?: string;
}

export interface Model {
  model_id: string | number;
  model_name: string;
  man_id?: string | number;
}

export interface Category {
  category_id: string | number;
  title: string;
}

export interface CategoriesResponse {
  data?: Category[];
}

interface DropdownOption {
  value: string;
  label: string;
}

export interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hideSelected?: boolean;
  minWidth?: string;
}