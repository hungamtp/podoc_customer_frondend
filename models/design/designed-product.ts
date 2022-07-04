import { Blueprint } from "./blueprint";

export interface DesignedProduct {
  id: string;
  name: string;
  description: string;
  publish: boolean;
  designedPrice: number;
  priceFromFactory: number;
  colorsObj: { id: string; name: string; image: string }[];
  imagePreviews: { position: string; image: string }[];
  bluePrints: Blueprint[];
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
  imagePreviews: { position: string; image: string }[];
  rating: number;
  sold: number;
  tagName: string[];
  colors: { name: string; image: string }[];
  sizes: string[];
  description: string;
  factoryName: string;
}
