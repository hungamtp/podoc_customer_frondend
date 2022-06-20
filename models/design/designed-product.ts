import { Blueprint } from "./blueprint";

export interface DesignedProduct {
  id: number;
  name: string;
  description: string;
  publish: boolean;
  designedPrice: number;
  priceFromFactory: number;
  colors: string[];
  imagePreviews: { position: string; imageSrc: string }[];
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
}
