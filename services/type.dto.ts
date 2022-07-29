import { ISuccessHttpResponse } from "@/models/success_http_response.interface";
import { User } from "@/models/user";
import { number, string } from "yup";

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse extends ISuccessHttpResponse {
  data: User;
}
export interface SignUpDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface SignUpResponse extends ISuccessHttpResponse {
  data: User;
}

export interface ProductHomePage {
  id: string;
  name: string;
  image: string;
  designedPrice: number;
  rate: number;
  tags: Array<string>;
  userId: string;
  username: string;
  soldCount: number;
}

export interface Best4DesignedProduct {
  data: Array<ProductHomePage>;
}
export interface BestSeller {
  data: Array<ProductHomePage>;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse extends ISuccessHttpResponse {
  data: User;
}

export interface PageDTO {
  data: {
    data: Array<ProductHomePageDTO>;
    page: number;
    elements: number;
  };
}

export interface ProductHomePageDTO {
  id: string;
  name: string;
  productImages: { image: string }[];
  categoryName: string;
  tags: { tag: Tag }[];
  numberOfSize: number;
  numberOfColor: number;
  numberOfFactory: number;
  priceFrom: number;
}

interface Tag {
  name: string;
}

export interface ProductImagesDto {
  image: string;
}

export interface ProductTagDto {
  tag: string;
}

export interface PriceByFactoryDto {
  price: number;
}

export interface ProductDetailDTO {
  id: string;
  name: string;
  description: string;
  lowestPrice: number;
  highestPrice: number;
  images: string[];
  categoryName: string;
  tags: string[];
  factories: FactoryDTO[];
  rate: number;
  rateCount: number;
  sold: number;
}
export interface FactoryDTO {
  id: string;
  name: string;
  location: string;
  price: number;
  material: string;
  sizes: string[];
  area: string[];
  colors: string[];
}

export interface CategoryDTO {
  id: string;
  name: string;
  image: string;
}

export interface CartDetailDTO {
  id: string;
  cartId: string;
  designedProductId: string;
  designedProductName: string;
  designedImage: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  publish: boolean;
}

export interface CartNotEnoughQuantity {
  id: string;
  quantityAvailable: number;
}
export interface UpdateCartResponseDTO {
  data: CartNotEnoughQuantity[];
  errorMessage: string;
}

export interface AddToCartDTO {
  designId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface PaymentResponse {
  requestId: string;
  amount: number;
  payUrl: string;
  shortLink: string;
  deeplink: string;
  qrCodeUrl: string;
  deeplinkWebInApp: string;
  transId: string;
  applink: string;
  partnerClientId: string;
  bindingUrl: string;
  deeplinkMiniApp: string;
}
export interface AddToCartResponseDTO {
  data: CartDetailDTO;
  errorMessage: string;
}
export enum TAG {
  HOT = "Hot",
  NEW = "New",
  BEST_SELLER = "Best Seller",
  BÁN_CHẠY = "Bán chạy",
  MỚI = "Mới",
  ƯU_ĐÃI = "Ưu Đãi",
}
