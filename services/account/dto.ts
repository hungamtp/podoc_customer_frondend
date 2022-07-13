import { ISuccessHttpResponse } from "@/models/success_http_response.interface";

export interface AccountByIdDtos {
    id: string;
	userFirstName: string;
    userLastName: string;
    name: string,
    email: string;
    roleName: string;
    phone: number;
    address: string;
    image: string;
    userStatus: string;
}
export interface UpdateAccountDto {
    id:string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    name: string;
}

export interface UpdateAccountResponse extends ISuccessHttpResponse {
	data: UpdateAccountDto[];
}


export interface getAccountByIdResponse extends ISuccessHttpResponse {
	data: AccountByIdDtos;
}