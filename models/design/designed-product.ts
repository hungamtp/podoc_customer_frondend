import { Blueprint } from "./blueprint";

export interface DesignedProduct {
  id: string;
  name: string;
  description: string;
  publish: boolean;
  designedPrice: number;
  priceFromFactory: number;
  colorsObj: { id: string; name: string; image: string }[];
  imagePreviews: { position: string; image: string; color: string }[];
  bluePrints: Blueprint[];
  productName: string;
  factoryName: string;
  factoryId: string;
  productId: string;
}

export interface ShownDesignedProduct {
  id: string;
  name: string;
  publish: boolean;
  price: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    credentialImage: string;
  };
  colorAndSizes: any;
  imagePreviews: { position: string; image: string }[];
  rating: number;
  sold: number;
  tagName: string[];
  colors: { name: string; image: string }[];
  sizes: string[];
  description: string;
  factoryName: string;
}
