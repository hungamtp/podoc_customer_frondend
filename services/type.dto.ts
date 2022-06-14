import { ISuccessHttpResponse } from "@/models/success_http_response.interface";
import { User } from "@/models/user";


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
  firstName : string;
  lastName : string;
  phone : string; 
}

export interface SignUpResponse extends ISuccessHttpResponse {
  data: User;
}

export interface ProductHomePage{
  id : number;
  name : string;
  image : string;
  designedPrice : number;
  rate : number;
  tags : Array<string>;
}

export interface Best4DesignedProduct{
  data : Array<ProductHomePage>
}

export interface LoginDto {
  email: string;
  password: string;
}


export interface LoginResponse extends ISuccessHttpResponse {
  data: User;
}

export interface PageDTO { 
  data : {
    data :Array<ProductHomePageDTO> ,
    page : number,
    elements : number;
  }
}

export interface ProductHomePageDTO{
  id : number;
  name: string;
  productImages : {image : string}[],
  categoryName : string;
  tags : {tag :Tag}[];
  numberOfSize : number;
  numberOfColor : number;
  numberOfFactory : number;
  priceFrom : number; 
}

interface Tag{
  name : string;
}

export interface ProductImagesDto {
  image : string;
}

export interface ProductTagDto {
  tag : string;
}

export interface PriceByFactoryDto{
  price : number;
}

export interface ProductDetailDTO {
  id : number ,
  name : string,
  description : string,
  lowestPrice: number,
  highestPrice: number,
  images : string[],
  categoryName : string,
  tags : string[],
  factories : FactoryDTO[]
}
export interface FactoryDTO{
  id : number ,
  name : string,
  location : string,
  price : number ,
  sizes : string[],
  area : string[],
  colors : string[]
}

export interface CategoryDTO{
  id : number;
  name : string;
  image : string;
}

export enum TAG{
  HOT = "Hot",
  NEW = "New",
  BEST_SELLER = "Best Seller",
  Bán_chạy = "Bán chạy",

}

