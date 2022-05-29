import { ISuccessHttpResponse } from "@/models/success_http_response.interface";
import { User } from "@/models/user";
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
