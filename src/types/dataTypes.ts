export interface CustomizationVariant {
  name: string;
  price: number | null;
  image?: string;
}

export interface CustomizationOption {
  primaryText: string;
  secondaryText: string;
  isRequired: boolean;
  image?: string;
  variants: CustomizationVariant[];
}

export interface Item {
  itemId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  customizations?: CustomizationOption[];
}

export interface Category {
  categoryId: string;
  categoryName: string;
  items: Item[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  deliveryTime: string;
  costRange: number;
  rating: number;
  categories: Category[];
}
