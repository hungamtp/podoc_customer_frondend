import { ISuccessHttpResponse } from 'models/success_http_response.interface';

export interface LoginDto {
	username: string;
	password: string;
}
export interface LoginResponse extends ISuccessHttpResponse {
	data: { jwt: string; role: string };
}
