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
