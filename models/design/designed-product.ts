import { Blueprint } from "./blueprint";

export interface DesignedProduct {
  id: number;
  name: string;
  description: string;
  publish: boolean;
  designedPrice: number;
  priceFromFactory: number;
  colorsObj: { id: number; name: string; image: string }[];
  imagePreviews: { position: string; image: string }[];
  bluePrints: Blueprint[];
}

export interface ShownDesignedProduct {
  id: number;
  name: string;
  publish: boolean;
  price: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    credentialImage: string;
  };
  imagePreviews: { position: string; image: string }[];
  rating: number;
  sold: number;
  tagName: string[];
  colors: { name: string; image: string }[];
  sizes: string[];
  description: string;
  factoryName: string;
}
